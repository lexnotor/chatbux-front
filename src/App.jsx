import { Navigate } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import ConnectPage from './pages/connect'

function App() {

    return (
        <div className="App">
            <Routes>
                <Route path='/connect/*' element={<ConnectPage />} />
                <Route path='/chats' element={<div></div>}>
                    <Route path=':user' element={<div></div>} />
                </Route>
                <Route path='/' element={<Navigate to={'/connect'} />} />
            </Routes>
        </div>
    )
}

export default App
