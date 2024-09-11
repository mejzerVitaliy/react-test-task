import React, { useCallback, useEffect, useState } from 'react'
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
    const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(undefined)
    const [selectedDepartment, setSelectedDepartment] = useState<Department | undefined>(undefined)
    const [selectedStatus, setSelectedStatus] = useState<Status | undefined>(undefined)

    const [isOpenSelectorUsers, setIsOpenSelectorUsers] = useState<boolean>(false)
    const [isOpenSelectorDepartments, setIsOpenSelectorDepartments] = useState<boolean>(false)
    const [isOpenSelectorCountry, setIsOpenSelectorCountry] = useState<boolean>(false)
    const [isOpenSelectorStatus, setIsOpenSelectorStatus] = useState<boolean>(false)

    const [isUndoBtn, setIsUndoBtn] = useState<boolean>(false)

    const [userData, setUserData] = useState<User | null>(null)
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

    const filterUsersByName = useCallback((name: string) => {
        const user = users.find((user: User) => user.name === name)
        user ? setUserData(user) : console.error('User not found!')
    }, [users])

    const editUser = async (selectedUserID: string | undefined, updatedUser: User) => {
        try {
            if (selectedUserID) {
                await updateUser({ id: selectedUserID, updatedUser })
                console.log('succesfull');
                
                setIsUndoBtn(false)
            } else console.error('user id not found');
        } catch (error) {
            console.error(error);
        }
    }

    const toggleUndo = () => {
        setSelectedCountry(userData?.country)
        setSelectedDepartment(userData?.department)
        setSelectedStatus(userData?.status)
        setIsUndoBtn(false)
    }

    const toggleOpenSelectorUsers = () => {
        setIsOpenSelectorCountry(false)
        setIsOpenSelectorDepartments(false)
        setIsOpenSelectorStatus(false)
                                                
        setIsOpenSelectorUsers(!isOpenSelectorUsers)
    }
    const toggleOpenSelectorDep = () => {
        setIsOpenSelectorCountry(false)
        setIsOpenSelectorCountry(false)
        setIsOpenSelectorUsers(false)
        
        setIsOpenSelectorDepartments(!isOpenSelectorDepartments)
    }
    const toggleOpenSelectorCountry = () => {
        setIsOpenSelectorStatus(false)
        setIsOpenSelectorDepartments(false)
        setIsOpenSelectorUsers(false)

        setIsOpenSelectorCountry(!isOpenSelectorCountry)
    }
    const toggleOpenSelectorStatus = () => {
        setIsOpenSelectorCountry(false)
        setIsOpenSelectorDepartments(false)
        setIsOpenSelectorUsers(false)

        setIsOpenSelectorStatus(!isOpenSelectorStatus)
    }

    useEffect(() => {
        if (selectedUserName) {
            filterUsersByName(selectedUserName)
        }
    }, [selectedUserName])

    useEffect(() => {
        if (userData) {
            setSelectedCountry(userData.country)
            setSelectedDepartment(userData.department)
            setSelectedStatus(userData.status)
        } else {
            setSelectedCountry(undefined)
            setSelectedDepartment(undefined)
            setSelectedStatus(undefined)
        }   
    }, [userData])

    useEffect(() => {
        if (selectedCountry && selectedDepartment && selectedStatus && userData) {
            const updatedCountry = countries.find(country => country.name === selectedCountry.name);
            const updatedDepartment = departments.find(department => department.name === selectedDepartment.name);
            const updatedStatus = statuses.find(status => status.name === selectedStatus.name);
    
            setUpdatedUser({
                name: selectedUserName,
                country: {
                    name: selectedCountry.name,
                    value: updatedCountry?.value || userData.country.value
                },
                department: {
                    name: selectedDepartment.name,
                    value: updatedDepartment?.value || userData.department.value
                },
                status: {
                    name: selectedStatus.name,
                    value: updatedStatus?.value || userData.status.value
                },
                id: userData.id
            });
        }
    }, [selectedUserName, selectedCountry, selectedDepartment, selectedStatus, countries, departments, statuses, userData]);
    

    return (
        <section className='w-[1080px] h-[516px] flex flex-col justify-between font-rubik font-normal text-[14px] leading-[20px] text-[#5e626b]'>
            <article>
                <p>User</p>

                <section className='relative w-[500px] h-[48px]  bg-white z-30  border border-solid border-[#e3e8ee] '> 
                    <article onClick={toggleOpenSelectorUsers} className='relative cursor-pointer flex items-center py-[8px] px-[24px] w-full h-full '>
                        <p className='font-rubik font-normal text-[14px] leading-[20px] text-[#5e626b]'>{selectedUserName || `Select a user`}</p>
                        <button  className='absolute right-[16px] border-none'> 
                            {isOpenSelectorUsers
                                ?<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.2649 10.265C13.1946 10.3352 13.0993 10.3747 12.9999 10.3747C12.9005 10.3747 12.8052 10.3352 12.7349 10.265L7.99992 5.53062L3.26492 10.265C3.19384 10.3312 3.09981 10.3673 3.00266 10.3656C2.90551 10.3639 2.81282 10.3245 2.74411 10.2558C2.67541 10.1871 2.63605 10.0944 2.63434 9.99726C2.63262 9.90011 2.66868 9.80609 2.73492 9.735L7.73492 4.735C7.80524 4.66477 7.90055 4.62533 7.99992 4.62533C8.0993 4.62533 8.19461 4.66477 8.26492 4.735L13.2649 9.735C13.3351 9.80531 13.3746 9.90062 13.3746 10C13.3746 10.0994 13.3351 10.1947 13.2649 10.265Z" fill="#1B2438"  />
                                </svg>
                                :<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.265 6.26498L8.26499 11.265C8.19467 11.3352 8.09936 11.3747 7.99998 11.3747C7.90061 11.3747 7.8053 11.3352 7.73498 11.265L2.73498 6.26498C2.66874 6.1939 2.63268 6.09987 2.6344 6.00272C2.63611 5.90557 2.67547 5.81288 2.74417 5.74417C2.81288 5.67547 2.90557 5.63611 3.00272 5.6344C3.09987 5.63268 3.1939 5.66874 3.26498 5.73498L7.99998 10.4694L12.735 5.73498C12.8061 5.66874 12.9001 5.63268 12.9972 5.6344C13.0944 5.63611 13.1871 5.67547 13.2558 5.74417C13.3245 5.81288 13.3639 5.90557 13.3656 6.00272C13.3673 6.09987 13.3312 6.1939 13.265 6.26498Z" fill="#1B2438" />
                                </svg>
                            }
                        </button>
                    </article>
                    
                    <article className={!isOpenSelectorUsers? 'hidden' : 'flex flex-col w-full overflow-y-auto overflow-x-hidden max-h-[160px] scrollbar border border-solid border-[#e3e8ee] bg-white '}>
                        {selectedUserName && <label className=' w-[500px] h-[40px] py-[8px] px-[25px] font-rubik  hover:bg-[#00000017] flex items-center'>{ selectedUserName }</label>}
                        {users.map((user: User) => (
                            user.name !== selectedUserName && (
                                <label
                                    onClick={() => {
                                        setSelectedUserName(user.name)
                                        setUpdatedUser({
                                            ...updatedUser,
                                            name: userData?.name || ''
                                        });
                                        setIsOpenSelectorUsers(false)
                                    }}
                                    key={user.name}
                                    className=' w-[500px] h-[40px] py-[8px] px-[25px]  font-rubik text-[14px] text-[#5e626b] text-center hover:bg-[#00000017] flex items-center'
                                >
                                    { user.name }
                                </label>
                            )
                        ))}
                    </article>
                </section>

            </article>

            <article className='w-[1080px] h-[256px] flex flex-col justify-between'>
                <h3 className='font-rubik text-[20px] font-semibold '>User Information</h3>

                <article className='flex justify-between'>
                    <article>
                        <p>Full name</p>
                        <input type='text' value={selectedUserName} className='w-[500px] h-[48px] bg-transparent font-rubik font-normal text-[14px] leading-[20px] text-[#5e626b]  border border-solid border-[#e3e8ee] py-[8px] pr-[12px] pl-[24px] group' disabled />
                    </article>

                    <article>
                        <p>Department</p>
                        
                        <button disabled={selectedUserName ? false : true}  className='relative w-[500px] h-[48px]  bg-white z-30  border border-solid border-[#e3e8ee] group'> 
                            <article onClick={toggleOpenSelectorDep} className='relative cursor-pointer flex items-center py-[8px] px-[24px] w-full h-full'>
                                <p className='font-rubik font-normal text-[14px] leading-[20px] text-[#5e626b] group-disabled:text-[#c4c4c4]'>{selectedDepartment?.name || `Select departments`}</p>
                                <button  className='absolute right-[16px] border-none'> 
                                    {isOpenSelectorDepartments
                                        ?<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.2649 10.265C13.1946 10.3352 13.0993 10.3747 12.9999 10.3747C12.9005 10.3747 12.8052 10.3352 12.7349 10.265L7.99992 5.53062L3.26492 10.265C3.19384 10.3312 3.09981 10.3673 3.00266 10.3656C2.90551 10.3639 2.81282 10.3245 2.74411 10.2558C2.67541 10.1871 2.63605 10.0944 2.63434 9.99726C2.63262 9.90011 2.66868 9.80609 2.73492 9.735L7.73492 4.735C7.80524 4.66477 7.90055 4.62533 7.99992 4.62533C8.0993 4.62533 8.19461 4.66477 8.26492 4.735L13.2649 9.735C13.3351 9.80531 13.3746 9.90062 13.3746 10C13.3746 10.0994 13.3351 10.1947 13.2649 10.265Z" fill="#1B2438" />
                                        </svg>
                                        :<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.265 6.26498L8.26499 11.265C8.19467 11.3352 8.09936 11.3747 7.99998 11.3747C7.90061 11.3747 7.8053 11.3352 7.73498 11.265L2.73498 6.26498C2.66874 6.1939 2.63268 6.09987 2.6344 6.00272C2.63611 5.90557 2.67547 5.81288 2.74417 5.74417C2.81288 5.67547 2.90557 5.63611 3.00272 5.6344C3.09987 5.63268 3.1939 5.66874 3.26498 5.73498L7.99998 10.4694L12.735 5.73498C12.8061 5.66874 12.9001 5.63268 12.9972 5.6344C13.0944 5.63611 13.1871 5.67547 13.2558 5.74417C13.3245 5.81288 13.3639 5.90557 13.3656 6.00272C13.3673 6.09987 13.3312 6.1939 13.265 6.26498Z" fill="#1B2438" />
                                        </svg>
                                    }
                                </button>
                            </article>
                            
                            <article className={!isOpenSelectorDepartments? 'hidden' : 'flex flex-col w-full overflow-y-auto overflow-x-hidden max-h-[160px] scrollbar border border-solid border-[#e3e8ee] bg-white '}>
                                {selectedDepartment && <label className=' w-[500px] h-[40px] py-[8px] px-[25px] font-rubik  hover:bg-[#00000017] flex items-center'>{ selectedDepartment.name }</label>}
                                {departments.map((dep: Department) => (
                                    dep.name !== selectedDepartment?.name && (
                                        <button
                                            onClick={() => {
                                                const selectedValue = dep.name;
                                                const department = departments.find(dept => dept.name === selectedValue);
                                                
                                                setSelectedDepartment(department);
                                                selectedValue !== userData?.department.name ? setIsUndoBtn(true) : setIsUndoBtn(false)
                                                setUpdatedUser({
                                                    ...updatedUser,
                                                    department: {
                                                        name: department?.name || '',
                                                        value: department?.value || ''
                                                    }
                                                });
                                                setIsOpenSelectorDepartments(false)
                                            }}
                                            key={dep.name}
                                            className=' w-[500px] h-[40px] py-[8px] px-[25px]  font-rubik text-[14px] text-[#5e626b] text-center hover:bg-[#00000017] flex items-center'
                                        >
                                            <p>{ dep.name }</p>
                                        </button>
                                    )
                                ))}
                            </article>
                        </button>
                    </article>

                </article>

                <article className='flex justify-between font-rubik text-[14px]'>
                    <article>
                        <p>Country</p>
                        <button disabled={selectedUserName ? false : true}  className='relative w-[500px] h-[48px]  bg-white z-20  border border-solid border-[#e3e8ee] group'> 
                            <article onClick={toggleOpenSelectorCountry} className='relative cursor-pointer flex items-center py-[8px] px-[24px] w-full h-full'>
                                <p className='font-rubik font-normal text-[14px] leading-[20px] text-[#5e626b] group-disabled:text-[#c4c4c4]'>{selectedCountry?.name || `Select country`}</p>
                                <button  className='absolute right-[20px] border-none'> 
                                    {isOpenSelectorCountry
                                        ?<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.2649 10.265C13.1946 10.3352 13.0993 10.3747 12.9999 10.3747C12.9005 10.3747 12.8052 10.3352 12.7349 10.265L7.99992 5.53062L3.26492 10.265C3.19384 10.3312 3.09981 10.3673 3.00266 10.3656C2.90551 10.3639 2.81282 10.3245 2.74411 10.2558C2.67541 10.1871 2.63605 10.0944 2.63434 9.99726C2.63262 9.90011 2.66868 9.80609 2.73492 9.735L7.73492 4.735C7.80524 4.66477 7.90055 4.62533 7.99992 4.62533C8.0993 4.62533 8.19461 4.66477 8.26492 4.735L13.2649 9.735C13.3351 9.80531 13.3746 9.90062 13.3746 10C13.3746 10.0994 13.3351 10.1947 13.2649 10.265Z" fill="#1B2438" />
                                        </svg>
                                        :<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.265 6.26498L8.26499 11.265C8.19467 11.3352 8.09936 11.3747 7.99998 11.3747C7.90061 11.3747 7.8053 11.3352 7.73498 11.265L2.73498 6.26498C2.66874 6.1939 2.63268 6.09987 2.6344 6.00272C2.63611 5.90557 2.67547 5.81288 2.74417 5.74417C2.81288 5.67547 2.90557 5.63611 3.00272 5.6344C3.09987 5.63268 3.1939 5.66874 3.26498 5.73498L7.99998 10.4694L12.735 5.73498C12.8061 5.66874 12.9001 5.63268 12.9972 5.6344C13.0944 5.63611 13.1871 5.67547 13.2558 5.74417C13.3245 5.81288 13.3639 5.90557 13.3656 6.00272C13.3673 6.09987 13.3312 6.1939 13.265 6.26498Z" fill="#1B2438" />
                                        </svg>
                                    }
                                </button>
                            </article>
                            
                            <article className={!isOpenSelectorCountry? 'hidden' : 'flex flex-col w-full overflow-y-auto overflow-x-hidden max-h-[160px] scrollbar border border-solid border-[#e3e8ee] bg-white '}>
                                {selectedCountry && <label className=' w-[500px] h-[40px] py-[8px] px-[25px] font-rubik  hover:bg-[#00000017] flex items-center'>{ selectedCountry.name }</label>}
                                {countries.map((country: Country) => (
                                    country.name !== selectedCountry?.name && (
                                        <button
                                            onClick={() => {
                                                const selectedValue = country.name;
                                                const countr = countries.find(country => country.name === selectedValue);
                                                
                                                setSelectedCountry(countr);
                                                selectedValue !== userData?.country.name ? setIsUndoBtn(true) : setIsUndoBtn(false)
                                                setUpdatedUser({
                                                    ...updatedUser,
                                                    country: {
                                                        name: countr?.name || '',
                                                        value: countr?.value || ''
                                                    }
                                                });
                                                setIsOpenSelectorCountry(false)
                                            }}
                                            key={country.name}
                                            className=' w-[500px] h-[40px] py-[8px] px-[25px]  font-rubik text-[14px] text-[#5e626b] text-center hover:bg-[#00000017] flex items-center'
                                        >
                                            <p>{ country.name }</p>
                                        </button>
                                    )
                                ))}
                            </article>
                        </button>
                    </article>

                    <article>
                        <p>Status</p>
                        <button disabled={selectedUserName ? false : true}  className='relative w-[500px] h-[48px]  bg-white z-20  border border-solid border-[#e3e8ee] group'> 
                            <article onClick={toggleOpenSelectorStatus} className='relative cursor-pointer flex items-center py-[8px] px-[24px] w-full h-full '>
                                <p className='font-rubik font-normal text-[14px] leading-[20px] text-[#5e626b] group-disabled:text-[#c4c4c4]'>{selectedStatus?.name || `Select status`}</p>
                                <button  className='absolute right-[20px] border-none'> 
                                    {isOpenSelectorStatus
                                        ?<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.2649 10.265C13.1946 10.3352 13.0993 10.3747 12.9999 10.3747C12.9005 10.3747 12.8052 10.3352 12.7349 10.265L7.99992 5.53062L3.26492 10.265C3.19384 10.3312 3.09981 10.3673 3.00266 10.3656C2.90551 10.3639 2.81282 10.3245 2.74411 10.2558C2.67541 10.1871 2.63605 10.0944 2.63434 9.99726C2.63262 9.90011 2.66868 9.80609 2.73492 9.735L7.73492 4.735C7.80524 4.66477 7.90055 4.62533 7.99992 4.62533C8.0993 4.62533 8.19461 4.66477 8.26492 4.735L13.2649 9.735C13.3351 9.80531 13.3746 9.90062 13.3746 10C13.3746 10.0994 13.3351 10.1947 13.2649 10.265Z" fill="#1B2438" />
                                        </svg>
                                        :<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.265 6.26498L8.26499 11.265C8.19467 11.3352 8.09936 11.3747 7.99998 11.3747C7.90061 11.3747 7.8053 11.3352 7.73498 11.265L2.73498 6.26498C2.66874 6.1939 2.63268 6.09987 2.6344 6.00272C2.63611 5.90557 2.67547 5.81288 2.74417 5.74417C2.81288 5.67547 2.90557 5.63611 3.00272 5.6344C3.09987 5.63268 3.1939 5.66874 3.26498 5.73498L7.99998 10.4694L12.735 5.73498C12.8061 5.66874 12.9001 5.63268 12.9972 5.6344C13.0944 5.63611 13.1871 5.67547 13.2558 5.74417C13.3245 5.81288 13.3639 5.90557 13.3656 6.00272C13.3673 6.09987 13.3312 6.1939 13.265 6.26498Z" fill="#1B2438" />
                                        </svg>
                                    }
                                </button>
                            </article>
                            
                            <article className={!isOpenSelectorStatus? 'hidden' : 'flex flex-col w-full overflow-y-auto overflow-x-hidden max-h-[160px] scrollbar border border-solid border-[#e3e8ee] bg-white'}>
                                {selectedStatus && <label className=' w-[500px] h-[40px] py-[8px] px-[25px] font-rubik  hover:bg-[#00000017] flex items-center'>{ selectedStatus.name }</label>}
                                {statuses.map((status: Status) => (
                                    status.name !== selectedStatus?.name && (
                                        <button
                                            onClick={() => {
                                                const selectedValue = status.name;
                                                const stat = statuses.find(stat => stat.name === selectedValue);
                                                
                                                setSelectedStatus(stat);
                                                selectedValue !== userData?.country.name ? setIsUndoBtn(true) : setIsUndoBtn(false)
                                                setUpdatedUser({
                                                    ...updatedUser,
                                                    status: {
                                                        name: stat?.name || '',
                                                        value: stat?.value || ''
                                                    }
                                                });
                                                setIsOpenSelectorStatus(false)
                                            }}
                                            key={status.name}
                                            className=' w-[500px] h-[40px] py-[8px] px-[25px]  font-rubik text-[14px] text-[#5e626b] text-center hover:bg-[#00000017] flex items-center'
                                        >
                                            <p>{ status.name }</p>
                                        </button>
                                    )
                                ))}
                            </article>
                        </button>
                    </article>
                </article>
            </article>

            <EditUsersBtns onClick={()=> editUser(userData?.id, updatedUser)} onClickUndo={toggleUndo} isUndoBtn={isUndoBtn} />
        </section>
    )
}

export default AccountSettings
