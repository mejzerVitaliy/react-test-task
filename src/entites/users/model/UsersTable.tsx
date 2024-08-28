import React from 'react'
import UsersList from './UsersList'
import { User } from '../../../app/types/UsersDataTypes'

interface UserTableProps{
    users: User[]
}

const UsersTable: React.FC<UserTableProps> = ({ users }) => {
    return (
        <table className='w-[1080px] h-[476px] border border-solid border-black'>
            <thead className='w-[1080px] h-[76px] font-karla font-bold text-[14px] flex justify-between items-center px-[36px] border-b border-b-solid border-b-[#e3e8ee] '>
                <tr className=' w-full h-[20px] flex justify-between text-left'>
                    <th className='w-[200px] h-[20px]'><h3>Full name</h3></th>
                    <th className='w-[404px] h-[20px]' ><h3>Department</h3></th>
                    <th className='w-[200px] h-[20px]' ><h3>Country</h3></th>
                    <th className='w-[100px] h-[20px]' ><h3>Status</h3></th>
                    <th><button className='w-[24px] h-[20px]'></button></th>
                </tr>
                
            </thead>

            <UsersList users={users} />
        </table>
    )
}

export default UsersTable