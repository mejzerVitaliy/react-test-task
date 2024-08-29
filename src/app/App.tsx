import React, { useEffect } from 'react'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import AppRouter from './router/AppRouter'

const App: React.FC = () => {
    const navigate = useNavigate()

    useEffect(() => {
        navigate('https://my-react-test-task.onrender.com')
    }, [navigate])

    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    )
}

export default App
