import axios from "axios";

class SuperfriendsBackendClient {
    backendUrl = "http://localhost:9000"

    postLogin = (userInfoDTO) => {
        return axios.post(this.backendUrl + "/login", userInfoDTO)
            .then((response) => response.data)
            .catch((e) => console.log("Error fetching user information in login: " + e))
    }

    getCardsByName = (name) => {
        return axios.get(this.backendUrl + "/cards?name=" + name)
            .then((response) => response.data)
            .catch((e) => console.log("Error fetching cards by name: " + e))
    }

    getDecks = () => {
        return axios.get(this.backendUrl + "/decks")
            .then((response) => response.data)
            .catch((e) => console.log("Error fetching decks: " + e))
    }

    createDeck = (createDeckDTO) => {
        return axios.post(this.backendUrl + "/decks", createDeckDTO)
            .then((response) => console.log(response))
            .catch((e) => console.log("Error creating deck with info :" + createDeckDTO + "   " + e))
    }

    updateDeck = (deckId, updateDeckDTO) => {
        return axios.put(this.backendUrl + "/decks/" + deckId, updateDeckDTO)
            .then((response) => console.log(response))
            .catch((e) => console.log("Error updating deck with id :" + deckId + "   " + e))
    }

    deleteDeck = (deckId) => {
        return axios.delete(this.backendUrl + "/decks/" + deckId)
            .then((response) => console.log(response))
            .catch((e) => console.log("Error deleting deck with id :" + deckId + "   " + e))
    }

}

export default SuperfriendsBackendClient;
