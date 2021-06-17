import axios from "axios";
import {instanceOf} from "prop-types";
import {Cookies} from "react-cookie";

class SuperfriendsBackendClient {
    backendUrl = "http://localhost:9000"
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    headers = () =>{
        return {Authorization: `Bearer ${this.props.cookies["JWT"]}` };}


    postLogin = async (userInfoDTO) => {
        let response = await axios.post(this.backendUrl + "/login", userInfoDTO)
        return response.data
    }

    getCardById = async (id) => {
        let response = await axios.get(this.backendUrl + "/cards/" + id + "/id")
            .catch((e) => console.log("Error fetching cards by id: " + e))
        return response.data
    }


    getHeroesByCardIds = async (cardIds) => {
        const promises = cardIds.map(cardId => this.getCardById(cardId));
        const cards = await Promise.all(promises);
        return cards.filter(card => card);
    }

    getCardsByName = async (name) => {
        let response = await axios.get(this.backendUrl + "/cards/" + name + "/name").catch((e) => console.log("Error fetching cards by name: " + e))
        return response.data
    }

    getDecks = async () => {
        let response = await axios.get(this.backendUrl + "/decks").catch((e) => console.log("Error fetching decks: " + e))
        return response.data
    }

    createDeck = (createDeckDTO) => {
        return axios.post(this.backendUrl + "/decks", createDeckDTO, {headers:this.headers()})
            .then((response) => console.log(response))
            .catch((e) => console.log("Error creating deck with info :" + createDeckDTO + "   " + e))
    }

    updateDeck = (deckId, updateDeckDTO) => {
        return axios.put(this.backendUrl + "/decks/" + deckId, updateDeckDTO, {headers:this.headers()})
            .catch((e) => console.log("Error updating deck with id :" + deckId + "   " + e))
    }

    deleteDeck = (deckId) => {
        return axios.delete(this.backendUrl + "/decks/" + deckId, {headers:this.headers()})
            .then((response) => console.log(response))
            .catch((e) => console.log("Error deleting deck with id :" + deckId + "   " + e))
    }

    createMatch = (matchCreationDTO) => {
        return axios.post(this.backendUrl + "/matches", matchCreationDTO)
            .then((response) => response.data)
            .catch((error) => console.log(error))

    }

    getPlayerById = (userId) => {
        return axios.get(this.backendUrl + "/players/" + userId,{headers:this.headers()})
            .then((response) => response.data)
            .catch((error) => console.log(error))
    }

    getMatchesOfUser = (userId) => {
        return axios.get(this.backendUrl + "/matches?user_id=" + userId,{headers:this.headers()})
            .then((response) => response.data)
            .catch((error) => console.log(error))
    }

    getMatchById = (matchId) => {
        return axios.get(this.backendUrl + "/matches/" + matchId, {headers:this.headers()})
            .then((response) => response.data)
            .catch((error) => console.log(error))
    }

    inviteOpponentToContinueMatch = (matchId, opponentId) => {
        return axios.get(this.backendUrl + "/invite/"+ matchId + "/" + opponentId)
            .then((response) => response.data)
            .catch((error) => console.log(error))
    }
}

const SuperfriendsBackendClientInstance =  new SuperfriendsBackendClient();
export default SuperfriendsBackendClientInstance
