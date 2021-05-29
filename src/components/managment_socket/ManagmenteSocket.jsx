import React from "react";

class ManagementSocketClass {
    user = ""
    socket = null
    observer = null
    matchId = null

     keepAlive = (socket) => {
        socket.send(new Uint8Array([1]))
        setTimeout(() => this.keepAlive(socket), 50000)
    }
    setUser= (newUser) =>{
        this.user = newUser

    }
    createConection() {

        this.socket = new WebSocket("ws://localhost:9000/join-match/" + this.matchId + "?userId=" + this.user)
        this.socket.onopen = () => {
                //send keep alive binary message
                this.keepAlive(this.socket)
            }
        this.socket.onmessage = (event) => {
            console.log(event)
            console.log(this.observer)
                if (this.observer !== null){
                    this.observer.receiveMessage(event)
                }
        }
    }
    subscribeObserver(newObserver){
        this.observer = newObserver

    }
    unsubscribeObserver(){
        this.observer = null
    }
    sendMessage(message){
        this.socket.send(message)
    }

}
const ManagementSocket =  new ManagementSocketClass();
export default ManagementSocket