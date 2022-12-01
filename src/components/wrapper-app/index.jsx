import React from 'react'
import { Outlet } from 'react-router-dom'
import './style.css'
import logo from '../../assets/react.svg'

const WrapperApp = () => {
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