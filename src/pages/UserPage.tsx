import React from 'react'
import Navbar from '../layout/Navbar'
import Title from '../layout/Title'
import FilterUsers from '../features/filterUsers/model/FilterUsers'
import UsersTable from '../entites/users/model/UsersTable'
import { useGetUsersQuery } from '../features/editUser/api/usersApi'
import Loader from '../shared/ui/Loader'
import { useSelector } from 'react-redux'
import { RootState } from '../app/providers/store'
import AddUserModal from '../features/addUser/model/AddUserModal'

const UserPage: React.FC = () => {
    const isModalOpen = useSelector((state: RootState) => state.addUserModal.isModalOpen)

    const {
        data: users,
        isLoading: usersLoading,
        error: usersErrors,
    } = useGetUsersQuery();

    if (usersLoading) return <Loader />
    if(usersErrors) console.error(usersErrors)
    if (users) return (
        <main className='w-full h-full'>
            <Navbar usersPage />
            <main className='flex items-center justify-center mt-[88px] '>
                <section className='flex flex-col mx-[100px] my-[80px] border border-solid border-black w-[1240px] min-h-[808px] max-w-[1400px] px-[80px] pt-[60px] pb-[80px]'>
                    <Title title='USERS' />

                    <FilterUsers />

                    <UsersTable users={users} />
                </section>

                {isModalOpen && <AddUserModal />}
            </main>
        </main>
    )
}
    
    
export default UserPage