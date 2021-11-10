import React from 'react';
import './Input.css';
import InputEmoji from "react-input-emoji";

const Input = ({ message, setMessage, sendMessage }) => {
    return (
        <form action="" onSubmit={sendMessage} className="form">
            {/* <input type="text" className="input"
                placeholder="Type a message"
                value={message}
                onChange={event => setMessage(event.target.value)}
                onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
            /> */}
            <InputEmoji
                value={message}
                onChange={msg => setMessage(msg)}
                cleanOnEnter
                onEnter={() => sendMessage({ enter: "yes" })}
                placeholder="Type a message"
            />
            <button className="sendButton">Send Message</button>
        </form>
    )
}

export default Input
