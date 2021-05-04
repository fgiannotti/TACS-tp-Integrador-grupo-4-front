import axios from "axios";

class SuperfriendsBackendClient {
    backendUrl = "http://localhost:9000"

    postLogin = (userInfoDTO) => {
        return axios.post(this.backendUrl + "/login", userInfoDTO)
            .then((response) => response.data)
            .catch((e) => console.log("Error fetching user information in login: " + e))
    }

    getCardById = async (id) => {
        let response = await axios.get(this.backendUrl + "/cards/" + id + "/id")
            .catch((e) => console.log("Error fetching cards by id: " + e))
        return response.data
    }


    getHerosByCardIds = async (cardIds) => {
        const promises = cardIds.map( cardId => this.getCardById(cardId));
        const cards = await Promise.all(promises);

        return cards.filter(card => card);
    }

    getCardsByName = async (name) => {
        let response = await axios.get(this.backendUrl + "/cards/" + name + "/name")
            .catch((e) => console.log("Error fetching cards by name: " + e))
        return response.data
    }

    getDecks = async () => {
        let response = await axios.get(this.backendUrl + "/decks").catch((e) => console.log("Error fetching decks: " + e))
        return response.data
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