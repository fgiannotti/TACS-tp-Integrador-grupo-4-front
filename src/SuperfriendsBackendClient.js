import axios from "axios";

class SuperfriendsBackendClient {
    backendUrl = "http://localhost:9000"

    postLogin = (userInfoDTO) => {
        return axios.post(this.backendUrl +"/login", userInfoDTO)
            .then((response) => response.data)
            .catch((e) => console.log("Error fetching user information to backend in login" + e.toString()))
    }


}

export default SuperfriendsBackendClient;
