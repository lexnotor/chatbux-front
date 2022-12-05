import React from 'react'
import './style.css'
import profil from '../../assets/user.png'
import edit from '../../assets/edit.svg'
import { useSelector } from 'react-redux'

const AccountPage = () => {
    const account = useSelector(state => state.account);
    const sendPicture = e => {

    }
    return (
        <div className='account-page'>
            <div className='user-image'>
                <img src={profil} alt="Profile" />
                <input
                    type="file"
                    accept='image/png, image/jpeg'
                    id='profilesend'
                    hidden
                    onChange={sendPicture}
                />
                <label htmlFor="profilesend">
                    <img src={edit} alt="" className='editprofile' />
                </label>
            </div>
            <table>
                <tbody>
                    <tr>
                        <td>Nom :</td>
                        <td>{account.nom}</td>
                    </tr>
                    <tr>
                        <td>Prenom :</td>
                        <td>{account.prenom}</td>
                    </tr>
                    <tr>
                        <td>Email :</td>
                        <td>{account.email}</td>
                    </tr>
                    <tr>
                        <td>Username :</td>
                        <td>{account.username}</td>
                    </tr>
                </tbody>
            </table>
        </div >
    )
}

export default AccountPage