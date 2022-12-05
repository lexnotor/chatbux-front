import { configureStore } from "@reduxjs/toolkit";
import { accountSlice, contactSlice, chatSlice } from "./slices";

export const { setAccount, updateAccount, updateChats, updateGroups, setToken } = accountSlice.actions;
export const { addContact, deleteAllUsers, setUserList } = contactSlice.actions;
export const { addChat, addMessage, deleteAllChat, setChatList } = chatSlice.actions;

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const deconnect = (token) => {
    if (!token) return;
    fetch(`${BACKEND_URL}/api/v1/connect/logout`, {
        mode: 'cors',
        method: 'post',
        headers: {
            authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            localStorage.removeItem('token');
            window.location.pathname = '/connect';
        })
        .catch(err => {
            localStorage.removeItem('token');
            window.location.pathname = '/connect';
        })
}

export const getUsers = (token) => {
    if (!token) return;
    return dispatch => {
        fetch(`${BACKEND_URL}/api/v1/user/all`, {
            mode: 'cors',
            method: 'post',
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.status !== 200) throw 'Impossible de recuperer';
                return res.json()
            })
            .then(data => {
                dispatch(setUserList(data.data))
            })
            .catch(err => {
                deconnect(token)
            });
    }
}

export const getMyInfo = (token) => {
    if (!token) return;
    return dispatch => {
        fetch(`${BACKEND_URL}/api/v1/user/me`, {
            mode: 'cors',
            method: 'post',
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.status !== 200) throw 'Recupération impossible';
                return res.json()
            })
            .then(data => {
                dispatch(setAccount(data.data[0]))
            })
            .catch(err => {
                deconnect(token)
            })
    }
}

export const getAllChat = (token) => {
    if (!token) return;
    return dispatch => {
        fetch(`${BACKEND_URL}/api/v1/chat/getchats`, {
            mode: 'cors',
            method: 'get',
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.status != 200) return null;
                return res.json();
            })
            .then(data => {
                if (!data) return deconnect(token);
                dispatch(setChatList(data.data))
            })
            .catch(err => {

            })
    }
}

export const sendMessageText = (token, data) => {
    if (!token) return;
    return dispatch => {
        fetch(`${BACKEND_URL}/api/v1/chat/sendtext`, {
            mode: 'cors',
            method: 'post',
            body: new URLSearchParams({ to: data.to, content: data.content }),
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.status == 200 || res.status == 201) return res.json()
                if (res.status == 401) {
                    deconnect(token)
                }
                return null
            })
            .then(data => {
                if (data) {
                    dispatch(addChat(data.data))
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const sendMessageImage = (token, formData) => {
    if (!token) return;
    return dispatch => {
        fetch(`${BACKEND_URL}/api/v1/chat/sendimage`, {
            mode: 'cors',
            method: 'post',
            body: formData,
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.status == 200 || res.status == 201) return res.json()
                if (res.status == 401) {
                    deconnect(token)
                }
                return null
            })
            .then(data => {
                if (data) {
                    dispatch(addChat(data.data))
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const sendProfileImage = (token, formData) => {
    if (!token) return;
    return dispatch => {
        fetch(`${BACKEND_URL}/api/v1/user/upladphoto`, {
            mode: 'cors',
            method: 'post',
            body: formData,
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.status == 200) return res.json()
                if (res.status == 401) {
                    deconnect(token)
                }
                return null
            })
            .then(data => {
                if (data && data.data) {
                    dispatch(updateAccount(data.data))
                } else {
                    window.location.reload()
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const store = configureStore({
    reducer: {
        account: accountSlice.reducer,
        contacts: contactSlice.reducer,
        chats: chatSlice.reducer
    }
})