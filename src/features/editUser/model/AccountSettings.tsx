import React, { useEffect, useState } from 'react'
import { Country, Department, Status, User } from '../../../app/types/UsersDataTypes'
import EditUsersBtns from './EditUsersBtns'
import { useUpdateUserMutation } from '../api/usersApi'

interface AccountSettingsProps {
    users: User[]
    countries: Country[],
    departments: Department[],
    statuses: Status[],
}

const AccountSettings: React.FC<AccountSettingsProps> = ({ users, countries, departments, statuses }) => {
    const [updateUser] = useUpdateUserMutation()
    
    const [selectedUserName, setSelectedUserName] = useState<string>('')
    
    const [userData, setUserData] = useState<User | null>(null)

    const [selectedCountry, setSelectedCountry] = useState<string | undefined>(undefined)
    const [selectedDepartment, setSelectedDepartment] = useState<string | undefined>(undefined)
    const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined)
    const [isUndoBtn, setIsUndoBtn] = useState<boolean>(false)

    const [updatedUser, setUpdatedUser] = useState<User>({
        name: selectedUserName,
        country: {
            name: userData?.country.name || '',
            value: userData?.country.value || ''
        },
        department: {
            name: userData?.department.name || '',
            value: userData?.department.value || ''
        },
        status: {
            name: userData?.status.name || '',
            value: userData?.status.value || ''
        },
        id: userData?.id
    })

    const filterUsersByName = (name: string) => {
        const user = users.find((user: User) => user.name === name)
        if (user) {
            setUserData(user)
        } else {
            console.error('User not found!')
        }
    }

    const editUser = async (selectedUserID: string | undefined, updatedUser: User) => {
        try {
            if (selectedUserID) {
                await updateUser({ id: selectedUserID, updatedUser })
                setIsUndoBtn(false)
            } else console.error('user id not found');
        } catch (error) {
            console.error(error);
        }
    }

    const toggleUndo = () => {
        setSelectedCountry(userData?.country.name)
        setSelectedDepartment(userData?.department.name)
        setSelectedStatus(userData?.status.name)

        setIsUndoBtn(false)
    }

    useEffect(() => {
        if (selectedUserName) {
            console.log(selectedUserName);

            filterUsersByName(selectedUserName)
        }
    }, [selectedUserName, users])

    useEffect(() => {
        if (userData) {
            setSelectedCountry(userData.country.name)
            setSelectedDepartment(userData.department.name)
            setSelectedStatus(userData.status.name)

        } else {
            setSelectedCountry('')
            setSelectedDepartment('')
            setSelectedStatus('')
        }   
    }, [userData])
        
    useEffect(() => {
        console.log(updatedUser);
    }, [updatedUser])

    useEffect(() => {
        if (selectedCountry && selectedDepartment && selectedStatus && userData) {
            const updatedCountry = countries.find(country => country.name === selectedCountry);
            const updatedDepartment = departments.find(department => department.name === selectedDepartment);
            const updatedStatus = statuses.find(status => status.name === selectedStatus);
    
            setUpdatedUser({
                name: selectedUserName,
                country: {
                    name: selectedCountry,
                    value: updatedCountry ? updatedCountry.value : userData.country.value
                },
                department: {
                    name: selectedDepartment,
                    value: updatedDepartment ? updatedDepartment.value : userData.department.value
                },
                status: {
                    name: selectedStatus,
                    value: updatedStatus ? updatedStatus.value : userData.status.value
                },
                id: userData.id
            });
        }
    }, [selectedUserName, selectedCountry, selectedDepartment, selectedStatus, countries, departments, statuses, userData]);
    

    return (
        <section className='w-[1080px] h-[516px] flex flex-col justify-between'>
            <article className='font-rubik text-[14px]'>
                <p>User</p>

                <select
                    className='w-[500px] h-[48px] border border-solid border-[#e3e8ee] py-[8px] pr-[24px] pl-[12px]'
                    onChange={(e) => {
                        setSelectedUserName(e.target.value)
                        setUpdatedUser({
                            ...updatedUser, name: e.target.value
                        })
                    }}
                >
                    <option value="">{ selectedUserName || 'Select a user' }</option>
                    {users.map((user: User) => (
                        user.name !== selectedUserName &&
                            <option value={user.name} key={user.name}>{user.name}</option>
                    ))}
                </select>
            </article>

            <article className='w-[1080px] h-[256px] flex flex-col justify-between'>
                <h3 className='font-rubik text-[20px] font-semibold'>User Information</h3>

                <article className='flex justify-between font-rubik text-[14px]'>
                    <article>
                        <p>Full name</p>
                        <select className='w-[500px] h-[48px] appearance-none border border-solid border-[#e3e8ee] py-[8px] pr-[24px] pl-[12px]' disabled>
                            <option value="">{selectedUserName}</option>
                        </select>
                    </article>

                    <article>
                        <p>Department</p>
                        <select
                            value={selectedDepartment || ''}
                            disabled={selectedUserName ? false : true}
                            onChange={(e) => {
                                const selectedValue = e.target.value;
                                const department = departments.find(dept => dept.name === selectedValue);
                                
                                setSelectedDepartment(selectedValue);
                                selectedValue !== userData?.department.name ? setIsUndoBtn(true) : setIsUndoBtn(false)
                                setUpdatedUser({
                                    ...updatedUser,
                                    department: {
                                        name: selectedValue,
                                        value: department ? department.value : ''
                                    }
                                });
                            }}
                            className='w-[500px] h-[48px] border border-solid border-[#e3e8ee] py-[8px] pr-[24px] pl-[12px]'
                        >
                            <option>{selectedDepartment}</option>
                            {departments.map((department: Department) => (
                                department.name !== selectedDepartment &&
                                    <option value={department.name} key={department.name}>{ department.name }</option>
                            ))}
                        </select>
                    </article>
                </article>

                <article className='flex justify-between font-rubik text-[14px]'>
                    <article>
                        <p>Country</p>
                        <select
                            value={selectedCountry || ''}
                            disabled={selectedUserName ? false : true}
                            onChange={(e) => {
                                const selectedValue = e.target.value;
                                const country = countries.find(country => country.name === selectedValue);
                                
                                setSelectedCountry(selectedValue);
                                selectedValue !== userData?.country.name ? setIsUndoBtn(true) : setIsUndoBtn(false)
                                setUpdatedUser({
                                    ...updatedUser,
                                    country: {
                                        name: selectedValue,
                                        value: country ? country.value : ''
                                    }
                                });
                            }}
                            className='w-[500px] h-[48px] border border-solid border-[#e3e8ee] py-[8px] pr-[24px] pl-[12px]'
                        >
                            <option value="">{selectedCountry}</option>
                            {countries.map((country: Country) => (
                                country.name !== selectedCountry &&
                                    <option value={country.name} key={country.name}>{country.name}</option>   
                            ))}
                        </select>
                    </article>

                    <article>
                        <p>Status</p>
                        <select
                            value={selectedStatus || ''}
                            disabled={selectedUserName ? false : true}
                            onChange={(e) => {
                                const selectedValue = e.target.value;
                                const status = statuses.find(status => status.name === selectedValue);
                                
                                setSelectedStatus(selectedValue);
                                selectedValue !== userData?.status.name ? setIsUndoBtn(true) : setIsUndoBtn(false)
                                setUpdatedUser({
                                    ...updatedUser,
                                    status: {
                                        name: selectedValue,
                                        value: status ? status.value : ''
                                    }
                                });
                            }}
                            className='w-[500px] h-[48px] border border-solid border-[#e3e8ee] py-[8px] pr-[24px] pl-[12px]'
                        >
                            <option value="">{selectedStatus}</option>
                            {statuses.map((status: Status) => (
                                status.name !== selectedStatus &&
                                    <option value={status.name} key={status.name}>{ status.name }</option>
                            ))}
                        </select>
                    </article>
                </article>
            </article>

            <EditUsersBtns onClick={()=> editUser(userData?.id, updatedUser)} onClickUndo={toggleUndo} isUndoBtn={isUndoBtn} />
        </section>
    )
}

export default AccountSettings
