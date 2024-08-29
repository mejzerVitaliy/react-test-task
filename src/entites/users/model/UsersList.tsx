import React, { useEffect, useState } from 'react'
import { User } from '../../../app/types/UsersDataTypes'
import { deleteUserByID } from '../api/usersService'
import Title from '../../../layout/Title'

interface UserListProps{
    users: User[] | undefined
}

const UsersList: React.FC<UserListProps> = ({ users }) => {
    const [usersArr, setUsersArr] = useState<User[]>([])

    const deleteUser = async (id:string | undefined) => {
        if (!id) {
            console.error('User not found')
            return
        }
        
        try {
            await deleteUserByID(id)
            setUsersArr(prevUsers => prevUsers.filter(user => user.id !== id))
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (users) {
            setUsersArr(users)
        } else setUsersArr([])
    }, [users])

    return (
            <tbody className='w-full h-[400px] font-karla font-light text-[14px]'>
                {usersArr.length > 0 
                    ? usersArr.map((user) => (
                        <tr key={user.id} className="w-[1080px] h-[80px]  px-[36px] flex justify-between items-center text-left">
                            <td className="w-[200px] h-[20px] font-normal">{user.name}</td>
                            <td className="w-[404px] h-[20px]">{user.department.name}</td>
                            <td className="w-[200px] h-[20px]">{user.country.name}</td>
                            <td className="w-[100px] h-[20px]">{user.status.name}</td>
                            <td>
                                <button className='w-[24px] h-[24px] grid place-content-center   ' onClick={() => deleteUser(user.id)}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 5V18C18 18.5304 17.7893 19.0391 17.4142 19.4142C17.0391 19.7893 16.5304 20 16 20H4C3.46957 20 2.96086 19.7893 2.58579 19.4142C2.21071 19.0391 2 18.5304 2 18V5H0V3H20V5H18ZM4 5V18H16V5H4ZM5 0H15V2H5V0Z" fill="#5E626B" />
                                    </svg>
                                </button>
                            </td>
                    </tr>
                    ))
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