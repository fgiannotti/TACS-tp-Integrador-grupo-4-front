class ManagementSocketClass {
    user = ""
    socket = null
    observer = null
    matchId = null

    keepAlive = (socket) => {
        socket.send(new Uint8Array([1]))
        setTimeout(() => this.keepAlive(socket), 50000)
    }
    setUser = (newUser) => {
        this.user = newUser
    }

    createConnection(playSolo) {
        this.socket = new WebSocket("ws://ec2-13-53-201-45.eu-north-1.compute.amazonaws.com:9000/join-match/" + this.matchId + (playSolo ? "/automated" : "") + "?userId=" + this.user)
        this.socket.onopen = () => {
            //send keep alive binary message
            this.keepAlive(this.socket)
        }
        this.socket.onmessage = (event) => {
            console.log(event)
            console.log(this.observer)
            if (this.observer) {
                this.observer.receiveMessage(event)
            }
        }
    }

    subscribeObserver(newObserver) {
        this.observer = newObserver

    }

    unsubscribeObserver() {
        this.observer = null
    }

    sendMessage(message) {
        this.socket.send(message)
    }

}

const ManagementSocket = new ManagementSocketClass();
export default ManagementSocket