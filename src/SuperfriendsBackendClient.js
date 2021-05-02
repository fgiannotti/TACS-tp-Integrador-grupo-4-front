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

}

export default SuperfriendsBackendClient;
