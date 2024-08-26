import React from 'react'
import Navbar from '../layout/Navbar'

const UserPage:React.FC = () => {
    return (
        <main>
            <Navbar usersPage />
            <h1>users</h1>
        </main>
    )
}

export default UserPage