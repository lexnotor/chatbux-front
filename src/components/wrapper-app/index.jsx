import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import logo from '../../assets/react.svg'
import { getAllChat, getMyInfo, getUsers, setToken } from '../../redux'
import './style.css'

const WrapperApp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

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
                    <img src={logo} alt="" />
                </nav>
                <div className='menu'>
                    <img src={logo} alt="" />
                </div>
            </header>
            <Outlet />
        </div>
    )
}

export default WrapperApp