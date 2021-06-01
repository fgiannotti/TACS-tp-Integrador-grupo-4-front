import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import CardSearch from '../card_finder/CardSearch';
import '../../styles/DeckBuilder.css';
import '../../styles/CommonStyles.css';
import SuperfriendsBackendClient from "../../SuperfriendsBackendClient";
import DeckNameAndSave from './DeckNameAndSave';
import CardGrid from '../cards/CardGrid';
import {Redirect} from "react-router-dom";
import Loader from "../utils/Loader";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const deckClient = new SuperfriendsBackendClient();

class DeckBuilder extends React.Component {


    constructor(props) {
        super(props);

        const urlParams = new URLSearchParams(window.location.search);
        const isSaved = !!urlParams.get('isSaved');

        this.state = {
            redirect: false,
            deckNameIsValid: false,
            saveDeckAlert: false,
            deckName: '',
            isSaved: isSaved,
            selectedHeroList: [],
            isLoading: true
        }

        this.changeDeckNameIsValid = this.changeDeckNameIsValid.bind(this);
        this.changeDeckName = this.changeDeckName.bind(this);
        this.showSaveDeckAlert = this.showSaveDeckAlert.bind(this);
        this.setSaveDeckAlert = this.setSaveDeckAlert.bind(this);
        this.handleAlertClose = this.handleAlertClose.bind(this);
        this.saveDeck = this.saveDeck.bind(this);
        this.addSelectedHero = this.addSelectedHero.bind(this);
        this.removeSelectedHero = this.removeSelectedHero.bind(this);
    }

    async componentDidMount() {
        document.body.style.backgroundColor = '#ffcc80';

        const urlParams = new URLSearchParams(window.location.search);
        const deckName = urlParams.get('deckName');
        const deckId = urlParams.get('deckId');
        const cardIds = urlParams.get('cardIds') ? urlParams.get('cardIds').split(",") : [];

        let heroList = []
        if (cardIds.length > 0) {
            heroList = await deckClient.getHeroesByCardIds(cardIds);
            console.log("heroList:")
            console.log(heroList)
        }

        this.setState({deckId: deckId, deckName: deckName, deckNameIsValid: deckName !== '', selectedHeroList: heroList, isLoading:false})
    }

    changeDeckNameIsValid = (booleanValue) => {
        this.setState({
            deckNameIsValid: booleanValue
        })
    }

    changeDeckName = (newName) => {
        this.setState({
            deckName: newName
        })
    }
    showSaveDeckAlert = () => {
        if (this.state.selectedHeroList.length && this.state.deckNameIsValid) {
            this.setSaveDeckAlert(true);
        } else {
            //INDICAR QUE FALTA CARGAR CARTAS (opcional)
        }
    }

    setSaveDeckAlert = (value) => {
        this.setState({
            saveDeckAlert: value
        })
    }

    handleAlertClose = () => {
        this.setSaveDeckAlert(false);
    }

    saveDeck = () => {
        this.setSaveDeckAlert(false);

        const deckId = this.state.deckId
        const deckName = this.state.deckName
        const cardIds = this.state.selectedHeroList.map(hero => hero["id"])
        const updateDeckDTO = {
            "name" : deckName,
            "card_ids" : cardIds
        }

        if (this.state.isSaved) {
            deckClient.updateDeck(deckId, updateDeckDTO)
                .then((response) => {
                    this.setState({
                        redirect: true
                    })
                })
        } else {
            deckClient.createDeck({name: deckName, cardIds: cardIds})
                .then((response) => {
                    this.setState({
                        redirect: true
                    })
                })
        }

    }

    addSelectedHero = (newHero) => {

        if (!this.state.selectedHeroList.length || this.state.selectedHeroList.find(hero => hero["id"] === newHero["id"]) === undefined) {
            this.state.selectedHeroList.push(newHero);
            this.setState({
                selectedHeroList: this.state.selectedHeroList
            })
        }
    }

    removeSelectedHero = (deletedHero) => {
        const heroIndex = this.state.selectedHeroList.findIndex(hero => hero["id"] === deletedHero["id"]);
        this.state.selectedHeroList.splice(heroIndex, 1);

        this.setState({
            selectedHeroList: this.state.selectedHeroList
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/decks"/>
        }
        return (
            <React.Fragment>
                <div className='flex-row-center'>
                    <div className='search-container'>
                        <CardSearch onClickBuilder={this.addSelectedHero}/>
                    </div>
                    <div className='decks-grid m1'>
                        <DeckNameAndSave changeDeckNameIsValid={this.changeDeckNameIsValid}
                                         deckName={this.state.deckName} changeDeckName={this.changeDeckName}
                                         saveDeckAction={this.showSaveDeckAlert}/>
                        <div className='p2' style={{paddingTop: '0'}}>

                            {this.state.isLoading ? 
                                <Loader/> : 
                                <CardGrid cards={this.state.selectedHeroList} onClickBuilder={this.removeSelectedHero}/>
                            }
                        </div>
                    </div>
                </div>
                <Dialog
                    open={this.state.saveDeckAlert}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleAlertClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">Desea guardar el mazo "{this.state.deckName}" en la lista
                        de mazos?</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleAlertClose}>
                            Cancelar
                        </Button>
                        <Button onClick={this.saveDeck}>
                            Aceptar
                        </Button>
                    </DialogActions>
                </Dialog>
        </React.Fragment>
        );
    }

}

export default DeckBuilder;
