import React from 'react'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { NavLink, Route, Routes } from 'react-router-dom'
import './style.css'


const ConnectPage = () => {
    return (
        <div className='connect-page'>
            <section>
                <nav>
                    <NavLink to={"signup"} >S'inscrire</NavLink>
                    <NavLink to={"login"} >Se connecter</NavLink>
                </nav>
                <Routes>
                    <Route path='login' element={<LoginForm />} />
                    <Route path='signup' element={<SignupForm />} />
                    <Route path='*' element={<Navigate to={'login'} />} />
                </Routes>
            </section>
        </div>
    )
}


class LoginForm extends React.Component {
    state = {
        userid: '',
        psw: '',
        persist: true
    }
    /**
     * 
     * @param {React.ChangeEvent} event 
     * @param {String} key 
     */
    inputHandle(event, key) {
        if (!(key in this.state)) return;
        this.setState({
            ...this.state,
            [key]: event.target.value
        });
    }
    render() {
        return (
            <form action="" onSubmit={e => e.preventDefault()}>
                <div className='input-group userid-group'>
                    <label htmlFor="userid">Nom d'utilisateur</label>
                    <input type="text" name="userid" id="userid" value={this.state.userid} onChange={e => this.inputHandle(e, 'userid')} autoComplete={'false'} />
                </div>
                <div className='input-group password-group'>
                    <label htmlFor="psw">Mot de passe</label>
                    <input type="password" name="psw" id="psw" value={this.state.psw} onChange={e => this.inputHandle(e, 'psw')} autoComplete={'false'} />
                </div>
                <div className='checkbox-group persist-group'>
                    <input type="checkbox" name="persist" id="persist" />
                    <label htmlFor="persist">Rester connecté</label>
                </div>
                <div className='submit-group'>
                    <input type="submit" />
                </div>
            </form>
        )
    }
}


class SignupForm extends React.Component {
    state = {
        nom: '',
        prenom: '',
        email: '',
        username: '',
        psw: '',
        confirme: ''
    }
    /**
     * 
     * @param {React.ChangeEvent} event 
     * @param {String} key 
     */
    inputHandle(event, key) {
        if (!(key in this.state)) return;
        this.setState({
            ...this.state,
            [key]: event.target.value
        });
    }
    render() {
        return (
            <form action="" onSubmit={e => e.preventDefault()}>
                <div className='input-group nom-group'>
                    <label htmlFor="nom">Nom</label>
                    <input type="text" name="nom" id="nom" value={this.state.nom} onChange={e => this.inputHandle(e, 'nom')} />
                </div>
                <div className='input-group prenom-group'>
                    <label htmlFor="nom">Prenom</label>
                    <input type="text" name="prenom" id="prenom" value={this.state.prenom} onChange={e => this.inputHandle(e, 'prenom')} />
                </div>
                <div className='input-group email-group'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" value={this.state.email} onChange={e => this.inputHandle(e, 'email')} />
                </div>
                <div className='input-group username-group'>
                    <label htmlFor="username">Nom d'utilisateur</label>
                    <input type="text" name="username" id="username" value={this.state.username} onChange={e => this.inputHandle(e, 'username')} />
                </div>
                <div className='input-group password-group'>
                    <label htmlFor="psw">Mot de passe</label>
                    <input type="password" name="psw" id="psw" value={this.state.psw} onChange={e => this.inputHandle(e, 'psw')} />
                </div>
                <div className='input-group confirme-group'>
                    <label htmlFor="confirme">Confirmé mot de passe</label>
                    <input type="password" name="confirme" id="confirme" value={this.state.confirme} onChange={e => this.inputHandle(e, 'confirme')} />
                </div>
                <div className='submit-group'>
                    <input type="submit" />
                </div>
            </form>
        )
    }
}

export default ConnectPage