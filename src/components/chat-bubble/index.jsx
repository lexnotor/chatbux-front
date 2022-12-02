import React from 'react'
import './style.css'

const ChatBubble = ({ children, right = false, genre = 'text' }) => {
    let content = children;
    if (genre == 'image') content = <img src={children} alt="Image" />;
    return (
        <div className={'chat-bubble ' + (right ? 'right' : 'left')}>
            <div className={'dialogue' + (genre == 'image' ? 'trans' : '')}>{content}</div>
            <div className='dialogue-queue'></div>
        </div>
    )
}

export default ChatBubble