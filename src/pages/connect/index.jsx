import React from 'react';
import { Navigate, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import './style.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ConnectPage = () => {
    return (
        <div className='connect-page'>
            <section>
                <nav>
                    <NavLink to={"signup"} >S'inscrire</NavLink>
                    <NavLink to={"login"} >Se connecter</NavLink>
                </nav>
                <Routes>
                    <Route path='login' element={<LoginForm navigate={useNavigate()} />} />
                    <Route path='signup' element={<SignupForm navigate={useNavigate()} />} />
                    <Route path='*' element={<Navigate to={'login'} />} />
                </Routes>
            </section>
        </div>
    )
}


class LoginForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            userid: '',
            psw: '',
            persist: true
        };
        this.navigate = props.navigate
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
    /**
     * 
     * @param {React.FormEvent<HTMLFormElement>} event 
     */
    submitHandle(event) {
        event.preventDefault()
        /**
         * @type {HTMLFormElement}
         */
        const form = event.target;
        const errorDisplay = form.querySelector('.error-display');
        if (!this.state.userid.trim().length) {
            errorDisplay.innerHTML = "Veuillez entrer un Email ou nom d'utilisateur"
        } else if (!this.state.psw.trim().length) {
            errorDisplay.innerHTML = "Veillez entrez un mot de passe"
        } else {
            this.setState({ ...this.state, isLoad: true });
            fetch(`${BACKEND_URL}/api/v1/connect/login`, {
                mode: 'cors',
                method: 'POST',
                body: new URLSearchParams({
                    userid: this.state.userid,
                    psw: this.state.psw
                })
            })
                .then(res => {
                    this.setState({ ...this.state, isLoad: false });
                    if (res.status === 200) {
                        return res.json();
                    }
                })
                .then(data => {
                    if (data) {
                        localStorage.setItem('token', data.token);
                        this.navigate('/user');
                    }
                })
                .catch(err => {

                })
        }

    }
    render() {
        return (
            <form action="" onSubmit={e => this.submitHandle(e)}>
                <div className='.error-display'></div>
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
                    {
                        this.state.isLoad ?
                            <div className='connexion-loader'></div> :
                            <input type="submit" />
                    }
                </div>
            </form>
        )
    }
}


class SignupForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.navigate = props.navigate;
        this.state = {
            nom: '',
            prenom: '',
            email: '',
            username: '',
            psw: '',
            confirme: '',
            isLoad: false
        }
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
    /**
     * 
     * @param {React.FormEvent<HTMLFormElement>} event 
     */
    submitHandle(event) {
        event.preventDefault()
        /**
         * @type {HTMLFormElement}
         */
        const form = event.target;
        const errorDisplay = form.querySelector('.error-display');
        if (!/^[0-ü][0-ü \-]{1,}[0-ü]$/.test(this.state.nom)) {
            errorDisplay.innerHTML = 'Veuillez entrer un nom valide'
        } else if (!/^[0-ü][0-ü \-]{1,}[0-ü]$/.test(this.state.prenom)) {
            errorDisplay.innerHTML = 'Veuillez entrer un prenom valide'
        } else if (!/^[0-ü][0-ü \-]{1,}[0-ü]$/.test(this.state.username)) {
            errorDisplay.innerHTML = "Le nom d'utilisateur n'est pas acceptable"
        } else if (!/^[A-z][0-z._]{2,}@[0-z]{3,}\.[a-z]{2,}$/.test(this.state.email)) {
            errorDisplay.innerHTML = "L'addresse email n'est pas valide"
        } else if (!/^\S[#-ü \-]{2,}\S$/.test(this.state.psw)) {
            errorDisplay.innerHTML = "Le mot de passe n'est pas securisé"
        } else if (this.state.psw !== this.state.confirme) {
            errorDisplay.innerHTML = "Les mots de passe ne correspondent pas"
        } else {
            this.setState({ ...this.state, isLoad: true });
            fetch(`${BACKEND_URL}/api/v1/connect/signup`, {
                mode: 'cors',
                method: 'POST',
                body: new URLSearchParams({
                    username: this.state.username,
                    nom: this.state.nom,
                    prenom: this.state.prenom,
                    email: this.state.email,
                    psw: this.state.psw
                })
            })
                .then(res => {
                    this.setState({ ...this.state, isLoad: false });
                    if (res.status === 201) {
                        document.getElementById('success_display').classList.toggle('shown');
                        setTimeout(() => this.navigate('login'), 5000)
                    }
                    else {
                        return res.json();
                    }
                })
                .then(data => {
                    if (data.type) {
                        errorDisplay.innerHTML = data.msg;
                        return null
                    }
                    console.log(data)
                })
                .catch(err => {

                })
        }

    }
    render() {
        return (
            <>
                <form action="" onSubmit={e => this.submitHandle(e)}>
                    <div className='error-display'>

                    </div>
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
                        {
                            this.state.isLoad ?
                                <div className='connexion-loader'></div> :
                                <input type="submit" />
                        }

                    </div>
                </form>
                <div id='success_display'>
                    Vous êtes correctement inscrit sur Baechat<br />
                    Redirection dans 5 secondes ...
                </div>
            </>
        )
    }
}



export default ConnectPage