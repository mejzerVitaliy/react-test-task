import React, { useEffect, useState } from 'react'
import { useGetCountriesQuery } from '../../editUser/api/countriesApi';
import { useGetDepartmentsQuery } from '../../editUser/api/departmentsApi';
import { useGetStatusesQuery } from '../../editUser/api/statusesApi';
import Loader from '../../../shared/ui/Loader';
import { useDispatch } from 'react-redux';
import { toggleAddUserModal } from '../slices/AddUserModalSlice';
import { Country, Department, Status, User } from '../../../app/types/UsersDataTypes';
import { useCreateUserMutation } from '../../editUser/api/usersApi';

const AddUserForm: React.FC = () => {
    const dispatch = useDispatch()
    const [createUser, { error }] = useCreateUserMutation()
    
    if (error) console.error(error)

    const [newUserName, setNewUserName] = useState<string | undefined>()

    const [selectedCountry, setSelectedCountry] = useState<string | undefined>(undefined)
    const [selectedDepartment, setSelectedDepartment] = useState<string | undefined>(undefined)
    const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined)

    const [saveBtnDisabled, setSaveBtnDisabled] = useState<boolean>(true)

    const [newUser, setNewUser] = useState<User>({
        name: '',
        country: {
            name: '',
            value: ''
        },
        department: {
            name: '',
            value: ''
        },
        status: {
            name: '',
            value: ''
        },
        id: ''
    })

    useEffect(() => {
        if (selectedCountry && selectedStatus && selectedDepartment && newUserName) {
            setSaveBtnDisabled(false); 
        } else {
            setSaveBtnDisabled(true);
        }
    }, [selectedCountry, selectedStatus, selectedDepartment, newUserName])

    const addNewUser = async (newUserData: User) => {
        try {
            await createUser(newUserData).unwrap()
        } catch (error) {
            console.error(error)
        }
    }

    const {
        data: countries,
        isLoading: countriesLoading,
        error: countriesErrors,
    } = useGetCountriesQuery();
    const {
        data: departments,
        isLoading: departmentsLoading,
        error: departmentsErrors,
    } = useGetDepartmentsQuery();
    const {
        data: statuses,
        isLoading: statusesLoading,
        error: statusesErrors,
    } = useGetStatusesQuery();

    if ( countriesLoading || departmentsLoading || statusesLoading ) return <Loader />;
        
    if ( countriesErrors || departmentsErrors || statusesErrors ) console.error(countriesErrors || departmentsErrors || statusesErrors);

    if (countries && departments && statuses) return (
        <section>
            <article className='w-full h-[164px] flex flex-col justify-between my-[60px] '>
                <article className='w-full h-[72px] flex justify-between font-rubik text-[14px] placeholder:font-rubik placeholder:text-[14px] '>
                    <article>
                        <p>Full name</p>
                        <input 
                            onChange={(e) => {
                                const selectedValue = e.target.value;
                                setNewUserName(selectedValue)
                                setNewUser({
                                    ...newUser, name: selectedValue
                                })
                            }} 
                            type="text" 
                            placeholder='Enter full name' 
                            className='w-[280px] h-[48px] flex items-center p-[0_12px_0_24px] border border-solid border-[#e3e8ee] ' 
                        />
                    </article>

                    <article>
                        <p>Department</p>
                        <select
                            onChange={(e) => {
                                const selectedValue = e.target.value;
                                const department = departments.find(dept => dept.name === selectedValue);
                                
                                setSelectedDepartment(selectedValue);
                                setNewUser({
                                    ...newUser, department: {
                                        name: selectedValue,
                                        value: department ? department.value : ''
                                    }
                                })
                            }}
                            className='w-[280px] h-[48px] flex items-center p-[0_12px_0_24px] border border-solid border-[#e3e8ee] '
                        >
                            <option value="">{selectedDepartment || 'Select department'}</option>

                            {departments.map((department: Department) => (
                                department.name !== selectedDepartment &&
                                    <option value={department.name} key={department.name}>{ department.name }</option>
                            ))}
                        </select>
                    </article>
                    
                </article>

                <article className='w-full h-[72px] flex justify-between font-rubik text-[14px]'>
                    <article>
                        <p>Country</p>
                        <select
                            onChange={(e) => {
                                const selectedValue = e.target.value;
                                const country = countries.find(countr => countr.name === selectedValue);
                                
                                setSelectedCountry(selectedValue);
                                setNewUser({
                                    ...newUser, country: {
                                        name: selectedValue,
                                        value: country ? country.value : ''
                                    }
                                })
                            }}
                            className='w-[280px] h-[48px] flex items-center p-[0_12px_0_24px] border border-solid border-[#e3e8ee] ' 
                        >
                            <option value="">{selectedCountry || 'Select country'}</option>

                            {countries.map((country: Country) => (
                                country.name !== selectedCountry &&
                                    <option value={country.name} key={country.name}>{ country.name }</option>
                            ))}
                        </select>
                    </article>

                    <article>
                        <p>Status</p>
                        <select
                            onChange={(e) => {
                                const selectedValue = e.target.value;
                                const status = statuses.find(status => status.name === selectedValue);
                                
                                setSelectedStatus(selectedValue);
                                setNewUser({
                                    ...newUser, status: {
                                        name: selectedValue,
                                        value: status ? status.value : ''
                                    }
                                })
                            }}
                            className='w-[280px] h-[48px] flex items-center p-[0_12px_0_24px] border border-solid border-[#e3e8ee] '
                        >
                            <option value="">{selectedStatus || 'Select status'}</option>

                            {statuses.map((status: Status) => (
                                status.name !== selectedStatus &&
                                    <option value={status.name} key={status.name}>{ status.name }</option>
                            ))}
                        </select>
                    </article>
                </article>
            </article>

            <article className='w-full h-[48px] flex justify-end'>
                <button onClick={() => dispatch(toggleAddUserModal())} className='w-[100px] h-full font-rubik text-[14px] flex justify-center items-center border border-solid border-[#c4c4c4]'>
                    Cancel
                </button>
                        
                <button
                    onClick={() => {
                        const userWithId = {
                            ...newUser,
                            id: Date.now().toString()
                        };
                        addNewUser(userWithId);
                        dispatch(toggleAddUserModal());
                    }}
                    disabled={saveBtnDisabled}
                    className='ml-[20px] w-[150px] h-full font-rubik text-[14px] disabled:text-[#c4c4c4] flex justify-center items-center border border-solid border-[#c4c4c4]'
                >
                    Add
                </button>
            </article>

        </section>
        
    )
}

export default AddUserForm