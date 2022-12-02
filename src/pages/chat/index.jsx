import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import picture from '../../assets/picture.png'
import logo from '../../assets/react.svg'
import send from '../../assets/send_icon.png'
import ChatBubble from '../../components/chat-bubble'
import { sendMessageText } from '../../redux'
import './style.css'

const ContactItem = ({ nom = '', prenom = '', username = '', image, uuid = '', setToDisplay }) => {
    /**
     * @param {React.MouseEvent<HTMLDivElement>} e 
     */
    const clickHandle = e => {
        setToDisplay(uuid)
    }
    return (
        <div className='contact-item' onClick={clickHandle}>
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

const ChatArea = ({ toDisplay }) => {
    const [chats, account] = useSelector(state => [state.chats, state.account])
    const currentChat = chats.find(elm => elm.chatter.indexOf(toDisplay) != -1);
    const [inputText, setInputText] = useState('')
    const dispatch = useDispatch();
    /**
     * @param {React.MouseEvent<HTMLImageElement>} e 
     */
    const sendHandle = e => {
        if (!toDisplay || !account.token) return;
        dispatch(sendMessageText(account.token, { to: toDisplay, content: inputText }));
    }
    /**
     * @param {React.ChangeEvent<HTMLInputElement>} e 
     */
    const inputTextHandle = e => {
        setInputText(e.target.value)
    }
    return (
        <>
            <div className='chatter-profile'>
                <img src={logo} alt="" />
            </div>
            <div className=''>
                {
                    currentChat ?
                        currentChat.messages.map(elm => (
                            <ChatBubble genre='text' right={elm.sender == account.id} key={elm.id}>
                                {elm.type == 'image' ?
                                    <img src={elm.content} alt='Image' /> :
                                    elm.content
                                }
                            </ChatBubble>
                        )) :
                        <></>
                }
            </div>
            <div className='input-zone'>
                <div className='send-group'>
                    <input
                        type="text"
                        placeholder='Type here your message ...'
                        value={inputText}
                        onChange={inputTextHandle}
                    />
                    <button>
                        <img src={picture} alt="" />
                    </button>
                </div>
                <button>
                    <img src={send} alt="" onClick={sendHandle} />
                </button>
            </div>
        </>
    )
}

const ChatPage = () => {
    const contacts = useSelector(state => state.contacts);
    const [toDisplay, setToDisplay] = useState(null)
    return (
        <div className='chat-page'>
            <div>
                {
                    contacts.map((person, i) => {
                        return <ContactItem
                            nom={person.nom}
                            prenom={person.prenom}
                            username={person.username}
                            image={person.image}
                            uuid={person.id}
                            key={i}
                            setToDisplay={setToDisplay}
                        />
                    })
                }
            </div>
            <div className='chat-area'>
                <ChatArea toDisplay={toDisplay} />
            </div>
        </div>
    )
}

export default ChatPage