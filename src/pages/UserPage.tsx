import React, { useEffect, useState } from 'react'
import Navbar from '../layout/Navbar'
import Title from '../layout/Title'
import FilterUsers from '../features/filterUsers/model/FilterUsers'
import UsersTable from '../entites/users/model/UsersTable'
import { useGetUsersQuery } from '../features/editUser/api/usersApi'
import Loader from '../shared/ui/Loader'
import { useSelector } from 'react-redux'
import { RootState } from '../app/providers/store'
import AddUserModal from '../features/addUser/model/AddUserModal'
import { useGetStatusesQuery } from '../features/editUser/api/statusesApi'
import { useGetDepartmentsQuery } from '../features/editUser/api/departmentsApi'
import { useGetCountriesQuery } from '../features/editUser/api/countriesApi'
import { Department, User } from '../app/types/UsersDataTypes'

const UserPage: React.FC = () => {
    const isModalOpen = useSelector((state: RootState) => state.addUserModal.isModalOpen)
    const filtersDepartments = useSelector((state: RootState) => state.filterUsers.selectedDepartments)
    const filterCountry = useSelector((state: RootState) => state.filterUsers.selectedCountry)
    const filterStatus = useSelector((state: RootState) => state.filterUsers.selectedStatus)
    
    const [filteredUsers, setFilteredUsers] = useState<User[] | undefined>()

    const { data: users, isLoading: usersLoading, error: usersErrors } = useGetUsersQuery();
    const { data: countries, isLoading: countriesLoading, error: countriesErrors } = useGetCountriesQuery();
    const { data: departments, isLoading: departmentsLoading, error: departmentsErrors } = useGetDepartmentsQuery();
    const { data: statuses, isLoading: statusesLoading, error: statusesErrors } = useGetStatusesQuery();

    useEffect(() => {
        let filteredUsers: User[] | undefined = []
        if (users) {
            filteredUsers = users
            if (filtersDepartments) {
                const departmentNames = filtersDepartments.map((dep: Department) => dep.name);
                filteredUsers = filteredUsers.filter((user: User) => departmentNames.includes(user.department.name)) || []
                if (filterCountry) {
                    filteredUsers = filteredUsers.filter((user: User) => filterCountry.name.includes(user.country.name)) || []
                } 
                if (filterStatus) {
                    filteredUsers = filteredUsers.filter((user: User) => filterStatus.name.includes(user.status.name)) || []
                }
            } 
        } 
        setFilteredUsers(filteredUsers)
    }, [users, filtersDepartments, filterCountry, filterStatus])

    if (usersLoading || countriesLoading || departmentsLoading || statusesLoading) return <Loader />;
    if (usersErrors || countriesErrors || departmentsErrors || statusesErrors) console.error(usersErrors || countriesErrors || departmentsErrors || statusesErrors);

    if (users && countries && departments && statuses) return (
        <main className='w-full h-full'>
            <Navbar usersPage />
            <main className='flex items-center justify-center mt-[88px] '>
                <section className='flex flex-col mx-[100px] my-[80px] border border-solid border-black w-[1240px] min-h-[808px] max-w-[1400px] px-[80px] pt-[60px] pb-[80px]'>
                    <Title title='USERS' />

                    <FilterUsers departments={departments} countries={countries} statuses={statuses} />

                    <UsersTable users={filteredUsers} />
                </section>

                {isModalOpen && <AddUserModal />}
            </main>
        </main>
    )
}
    
export default UserPage