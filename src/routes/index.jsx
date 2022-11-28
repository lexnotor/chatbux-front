import React from 'react'
import { Route, Routes } from 'react-router-dom'

const ChatRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path='/connect' element={<div></div>}>
                    <Route path='login' element={<div></div>} />
                    <Route path='signup' element={<div></div>} />
                </Route>
                <Route path='/chats' element={<div></div>}>
                    <Route path='/:user' element={<div></div>} />
                </Route>
            </Routes>
        </div>
    )
}

export default ChatRoutes