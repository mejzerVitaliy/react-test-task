import React, { useEffect, useState } from 'react'
import { User } from '../../../app/types/UsersDataTypes'
import { deleteUserByID } from '../api/usersService'
import Title from '../../../layout/Title'
import UsersArray from './UsersArray'

interface UserListProps{
    users: User[] | undefined
}

const UsersList: React.FC<UserListProps> = ({ users }) => {
    const [usersArr, setUsersArr] = useState<User[]>([])

    const deleteUser = async (id:string | undefined) => {
        if (!id) {
            console.error('User not found')
        } else {
            try {
                await deleteUserByID(id)
                setUsersArr(prevUsers => prevUsers.filter(user => user.id !== id))
            } catch (error) {
                console.error(error)
            }
        }
    }

    useEffect(() => {
        setUsersArr(users || [])
    }, [users])

    return (
            <tbody className='w-full h-[400px] font-karla font-light text-[14px]'>
                {usersArr.length > 0 
                    ? <UsersArray users={usersArr} deleteUser={deleteUser} />
                    : <tr className='w-full h-full flex items-center justify-center'>
                        <th>
                            <Title title='USER NOT FOUND' />
                        </th>
                    </tr>
                }
            </tbody>
        
    )
}

export default UsersList