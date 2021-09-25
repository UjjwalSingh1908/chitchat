import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../../UserContext'
import io from 'socket.io-client';
let socket;
const Chat = () => {
    const { user, setUser } = useContext(UserContext)
    const { room_id, room_name } = useParams()
    const ENDPT = 'localhost:5000'

    useEffect(() => {
        socket = io(ENDPT)
        socket.emit('join', { name: user.name, room_id, room_name, user_id: user.id })
    }, [])

    return (
        <div>
            <h4>{room_id},{room_name} </h4>
            <h3>Chat <br /> {JSON.stringify(user)}</h3>
            <Link to={'/'}>
                <button>go to Home</button>
            </Link>
        </div>

    )
}

export default Chat
