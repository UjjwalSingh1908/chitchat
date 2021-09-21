import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../UserContext'
const Home = () => {
    const { user, setUser } = useContext(UserContext)

    const setasJohn = () => {
        const john = {
            name: "john",
            email: "john@email.com",
            password: "123",
            id: "1"
        }
        setUser(john)
    }

    const setasTom = () => {
        const tom = {
            name: "tom",
            email: "tom@email.com",
            password: "456",
            id: "2"
        }
        setUser(tom)
    }
    return (
        <div>
            Home {JSON.stringify(user)}
            <button onClick={setasJohn} >set as john</button>
            <button onClick={setasTom} >set as Tom</button>
            <Link to={'/chat'}>
                <button>go to Chat</button>
            </Link>
        </div>
    )
}

export default Home
