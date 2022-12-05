import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate, Link } from 'react-router-dom'
import chaticon from '../../assets/chat.png'
import logout from '../../assets/logout.png'
import logo from '../../assets/chatbux.png'
import user from '../../assets/logo.png'
import { deconnect, getAllChat, getMyInfo, getUsers, setToken } from '../../redux'
import './style.css'

const WrapperApp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const account = useSelector(state => state.account)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(setToken(token));
            dispatch(getUsers(token));
            dispatch(getMyInfo(token));
            dispatch(getAllChat(token));

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