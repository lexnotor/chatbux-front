import React from 'react'
import './style.css'
import logo from '../../assets/react.svg'

const ContactItem = ({ nom = '', prenom = '', username = '', image }) => {
    return (
        <div className='contact-item' onClick={e => { }}>
            <div className='contact-pic'>
                {
                    image ?
                        <img src={image} alt={'Profile'} /> :
                        <span>{username?.charAt(0)}</span>
                }
            </div>
            <div className='contact-identity'>
                <span>{`${nom} ${prenom}`}</span>
                <span>{`@${username}`}</span>
            </div>
            <div className='constact-status'>

            </div>
        </div>
    )
}

const ChatArea = () => {
    return (
        <div>chat area</div>
    )
}

const ChatPage = () => {
    const fakeData = [];
    for (let i = 0; i < 10; i++) {
        fakeData.push(
            <ContactItem nom='Some' prenom='one' username='name' image={logo} key={i} />
        )
    }
    return (
        <div className='chat-page'>
            <div>
                {fakeData}
            </div>
            <div>
                {ChatArea}
            </div>
        </div>
    )
}

export default ChatPage