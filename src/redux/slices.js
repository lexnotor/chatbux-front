import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        nom: '', prenom: '', email: '', image: '', uri: '', chats: [], groupes: [], token: ''
    },
    reducers: {
        setAccount: (state, action) => {
            return { ...state, ...action.payload }
        },
        updateAccount: (state, action) => {
            const PL = action.payload;
            PL.nom && (state.nom = [...state.nom, PL.nom]);
            PL.prenom && (state.prenom = [...state.prenom, PL.prenom]);
            PL.email && (state.email = [...state.email, PL.email]);
            PL.image && (state.image = [...state.image, PL.image]);
            PL.uri && (state.uri = [...state.uri, PL.uri]);
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
})