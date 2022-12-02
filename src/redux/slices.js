import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        id: '', nom: '', prenom: '', email: '', image: '', uri: '', chats: [], groupes: [], token: ''
    },
    reducers: {
        setAccount: (state, action) => {
            return { ...state, ...action.payload }
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
        updateAccount: (state, action) => {
            const PL = action.payload;
            PL.id && (state.id = PL.id);
            PL.nom && (state.nom = PL.nom);
            PL.prenom && (state.prenom = PL.prenom);
            PL.email && (state.email = PL.email);
            PL.image && (state.image = PL.image);
            PL.uri && (state.uri = PL.uri);
            return { ...state, ...action.payload }
        },
        updateChats: (state, action) => {
            const PL = action.payload;
            PL.chats && (state.chats = [...state.chats, PL.chats]);
        },
        updateGroups: (state, action) => {
            const PL = action.payload;
            PL.groups && (state.groups = [...state.groups, PL.groups]);
        }
    }
});

export const contactSlice = createSlice({
    name: 'contact',
    initialState: [''],
    reducers: {
        setUserList: (_, action) => {
            return (
                [...action.payload]
            )
        },
        addContact: (state, action) => {
            state.push(action.payload)
        },
        deleteAllUsers: () => {
            return []
        }
    }
});

export const chatSlice = createSlice({
    name: 'chats',
    initialState: [],
    reducers: {
        setChatList: (_, action) => {
            return (
                [...action.payload]
            )
        },
        addChat: (state, action) => {
            const i = state.findIndex(chat => chat.id == action.payload.id);
            if (i !== -1) {
                state[i].messages = action.payload.messages;
            } else
                state.push(action.payload);
        },
        addMessage: (state, action) => {
            state.push(action.payload)
        },
        deleteAllChat: () => {
            return []
        }
    }
})