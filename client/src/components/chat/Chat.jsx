import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../UserContext'

const Chat = () => {
    const { user, setUser } = useContext(UserContext)


    return (
        <div>
            Chat {JSON.stringify(user)}
            <Link to={'/'}>
                <button>go to Home</button>
            </Link>
        </div>

    )
}

export default Chat
