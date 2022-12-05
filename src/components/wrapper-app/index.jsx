import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import io from 'socket.io-client'
import chaticon from '../../assets/chat.png'
import logo from '../../assets/chatbux.png'
import user from '../../assets/logo.png'
import logout from '../../assets/logout.png'
import { addChat, deconnect, getAllChat, getMyInfo, getUsers, setToken } from '../../redux'
import './style.css'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const WrapperApp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const account = useSelector(state => state.account);
    const [io_socket, _] = useState(io(`${BACKEND_URL}/`));

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(setToken(token));
            dispatch(getUsers(token));
            dispatch(getMyInfo(token));
            dispatch(getAllChat(token));
            io_socket.emit('register', token);
            io_socket.on('newmsg', (data) => dispatch(addChat(data)))
        } else navigate('/connect')
    }, [])

    return (
        <div className='wrapper-app'>
            <header>
                <div className='app-title-logo'>
                    <img src={logo} alt="" />
                </div>
                <nav className='nav'>
                    <Link to={'/chat'}><img src={chaticon} alt="" /></Link>
                </nav>
                <div className='menu'>
                    <span>{`${account.prenom}`}</span>
                    <Link to={'/account'}>
                        <img
                            src={account.image == '' ? user : account.image}
                            alt=""
                            className='profile-image'
                        />
                    </Link>

                    <img
                        src={logout}
                        alt=""
                        onClick={() => deconnect(account.token)}
                    />
                </div>
            </header>
            <Outlet />
        </div>
    )
}

export default WrapperApp