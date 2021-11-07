import React from 'react'
import Message from '../message/Message'

const Messages = ({ messages, user_id }) => {
    // console.log(messages);
    return (
        <div>
            Messages{user_id}
            {/* {JSON.stringify(messages)} */}
            {messages.map((message, i) => {
                return (
                    <Message key={message.id} message={message} current_uid={user_id} />
                )
            }
            )}

        </div>
    )
}

export default Messages
