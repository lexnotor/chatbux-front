import React from 'react'
import './style.css'
import profil from '../../assets/logo.png'
import edit from '../../assets/edit.svg'
import { useSelector } from 'react-redux'
import { sendProfileImage } from '../../redux'
import { useDispatch } from 'react-redux'

const AccountPage = () => {
    const account = useSelector(state => state.account);
    const dispatch = useDispatch()
    const sendPicture = e => {
        const formdata = new FormData();
        const files = e.target.files
        if (0 in files) {
            formdata.append('myfile', files[0]);
            dispatch(sendProfileImage(account.token, formdata))
        }
    }
    return (
        <div className='account-page'>
            <div className='user-image'>
                <img src={account.image != '' ? account.image : profil} alt="Profile" />
                <input
                    type="file"
                    accept='image/png, image/jpeg'
                    id='profilesend'
                    hidden
                    onChange={e => sendPicture(e)}
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