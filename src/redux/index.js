import { configureStore } from "@reduxjs/toolkit";
import { accountSlice } from "./slices";

export const { setAccount, updateAccount, updateChats, updateGroups } = accountSlice.actions;

export const store = configureStore({
    reducer: {
        account: accountSlice.reducer
    }
})