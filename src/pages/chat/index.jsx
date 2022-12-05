import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import picture from '../../assets/picture.png'
import send from '../../assets/send_icon.png'
import detective from '../../assets/detective.svg'
import ChatBubble from '../../components/chat-bubble'
import { sendMessageImage, sendMessageText } from '../../redux'
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
    const [chats, account, contacts] = useSelector(state => [state.chats, state.account, state.contacts])
    const currentChat = chats.find(elm => elm.chatter.indexOf(toDisplay) != -1);
    const receiver = contacts.find(elm => elm.id == toDisplay);
    const [inputText, setInputText] = useState('')
    const dispatch = useDispatch();
    /**
     * @param {React.MouseEvent<HTMLImageElement>} e 
     */
    const sendHandle = e => {
        if (!toDisplay || !account.token) return;
        if (!inputText.trim().length) return;
        dispatch(sendMessageText(account.token, { to: toDisplay, content: (inputText.trim()) }));
    }
    /**
     * @param {React.ChangeEvent<HTMLInputElement>} e 
     */
    const sendImageHandle = e => {
        if (!toDisplay || !account.token) return;
        const files = e.target.files
        const formData = new FormData();
        if (0 in files) {
            formData.append('myfile', files[0]);
            formData.append('to', toDisplay.contact)
            dispatch(sendMessageImage(account.token, formData))
        }
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
                <img src={receiver.image == '' ? receiver.username : receiver.image} alt="" />
                <span>{receiver.username}</span>
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
                        <img
                            src={picture}
                            alt=""
                            onChange={e => sendImageHandle(e)}
                        />
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
    const [contacts, account] = useSelector(state => [state.contacts, state.account]);
    const [toDisplay, setToDisplay] = useState(null)
    return (
        <div className='chat-page'>
            <div>
                {
                    contacts.map((person, i) => {
                        if (person.id == account.id) return (<></>)
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
            {
                toDisplay ?
                    <div className='chat-area'>
                        <ChatArea toDisplay={toDisplay} />
                    </div> :
                    <div className='chat-waiting'>
                        <img src={detective} alt="" />
                    </div>
            }
        </div>
    )
}

export default ChatPage