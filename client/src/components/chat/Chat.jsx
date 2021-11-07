import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../../UserContext'
import Messages from './messages/Messages';
import io from 'socket.io-client';
let socket;
const Chat = () => {
    const { user, setUser } = useContext(UserContext)
    const { room_id, room_name } = useParams()
    const ENDPT = 'localhost:5000'
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(() => {
        socket = io(ENDPT)
        socket.emit('join', { name: user.name, room_id, room_name, user_id: user.id })
    }, [])

    useEffect(() => {
        socket.on('message', message => {
            setMessages([...messages, message])
        })
    }, [messages])

    const sendMessage = (e) => {
        e.preventDefault();
        if (message) {
            console.log(message);
            socket.emit('sendMessage', message, room_id, () => setMessage(''))
        }
    }

    return (
        <div>
            <h4>{room_id},{room_name} </h4>
            <h3>Chat <br /> {JSON.stringify(user)}</h3>

            <Messages messages={messages} user_id={user.id} />

            <form onSubmit={sendMessage} >
                <input type="text" value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyPress={e => e.key === "Enter" ? sendMessage(e) : null}
                />
                <button>Send Message</button>
            </form>

        </div>

    )
}

export default Chat
