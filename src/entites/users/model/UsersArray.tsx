import React from 'react'
import { User } from '../../../app/types/UsersDataTypes'

interface UsersArrProps{
    users: User[],
    deleteUser: (id: string | undefined) => void
}

const UsersArray: React.FC<UsersArrProps> = ({ users, deleteUser }) => {
    return (
        <>
            {
                users.map((user: User) => (
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
            }
        </> 
    )
}

export default UsersArray