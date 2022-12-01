import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import WrapperApp from './components/wrapper-app'
import ChatPage from './pages/chat'
import ConnectPage from './pages/connect'


function App() {

    return (
        <div className="App">
            <Routes>
                <Route path='/connect/*' element={<ConnectPage />} />
                <Route path='/*' element={<WrapperApp />} >
                    <Route path='chats' element={<ChatPage />} >
                        <Route path=':user' element={<div></div>} />
                    </Route>
                    <Route path='*' element={<Navigate to={'/connect'} />} />
                </Route>

            </Routes>

        </div >
    )
}

export default App
