import react from 'react'
import SearchBar from "material-ui-search-bar";


export default class CardSearchBar extends react.Component{
    constructor(props) {
        super(props);
        this.state =
        {
            value : ""
        }
    }

    render() {
    return (
        <SearchBar
            style={{color:'gray !important'}}
            value={this.state.value}
            onChange={(newValue) => this.setState({ value: newValue })}
            onRequestSearch={() => this.props.onRequestSearch(this.state.value)}
        />
        );
}



}
