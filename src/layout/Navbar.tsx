import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setFilterCountry, setFilterDepartments, setFilterStatus } from '../features/filterUsers/slices/filterUsersSlice'

interface NavbarProps {
    usersPage?: boolean
    editUsersPage?:boolean
}

const Navbar: React.FC<NavbarProps> = ({ usersPage, editUsersPage }) => {
    const nav = useNavigate()
    const dispatch = useDispatch()

    const toUsersPage = () => {
        nav('/users')
    }
    const toEditUsersPage = () => {
        nav('/editUsers')
        dispatch(setFilterCountry(null))
        dispatch(setFilterDepartments(null))
        dispatch(setFilterStatus(null))
    }

    return (
        <nav className='fixed top-0 z-50 bg-white w-full h-[88px] border-b border-b-solid border-black flex items-center justify-center'>
            <button onClick={toEditUsersPage} className={`w-[200px] h-[48px] mx-[10px] font-rubik text-[14px] border border-solid border-[#c4c4c4] text-center ${editUsersPage && 'bg-[#c4c4c4]'} `}>Edit Users</button>
            <button onClick={toUsersPage} className={`w-[200px] h-[48px] mx-[10px] font-rubik text-[14px] border border-solid border-[#c4c4c4] text-center ${usersPage && 'bg-[#c4c4c4]'}`}> Users </button>
        </nav>
    )
}

export default Navbar