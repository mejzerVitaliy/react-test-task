import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { routes } from './routes'

const AppRouter:React.FC = () => {
    return (
        <Routes>
            {routes.map((route) => (
                <Route path={route.path} key={route.path} element={<route.element />} />
            ))}
            <Route path='/*' element={<Navigate to='/users' />} />
        </Routes>
    )
}

export default AppRouter