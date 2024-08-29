import React, { useEffect, useState } from 'react'
import { toggleAddUserModal } from '../../addUser/slices/AddUserModalSlice'
import { useDispatch } from 'react-redux'
import { Country, Department, Status} from '../../../app/types/UsersDataTypes'
import { setFilterCountry, setFilterDepartments, setFilterStatus } from '../slices/filterUsersSlice'


interface FilterUsersProps{
    departments: Department[],
    countries: Country[],
    statuses: Status[]
}

const FilterUsers: React.FC<FilterUsersProps> = ({ departments, countries, statuses}) => {
    const dispatch = useDispatch()

    const [isOpenSelectorDepartments, setIsOpenSelectorDepartments] = useState<boolean>(false)
    const [isOpenSelectorCountry, setIsOpenSelectorCountry] = useState<boolean>(false)
    const [isOpenSelectorStatus, setIsOpenSelectorStatus] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState<string>()

    const toggleOpenSelectorDep = () => {
        setIsOpenSelectorDepartments(!isOpenSelectorDepartments)
    }
    const toggleOpenSelectorCountry = () => {
        setIsOpenSelectorCountry(!isOpenSelectorCountry)
    }
    const toggleOpenSelectorStatus = () => {
        setIsOpenSelectorStatus(!isOpenSelectorStatus)
    }

    const [selectedDepartmentsArr, setSelectedDepartmentsArr] = useState<Department[]>([]);

    const toggleCheckDep = (department: Department) => {
        setSelectedDepartmentsArr(prevSelected => {
            const isSelected = prevSelected.find(dep => dep.name === department.name);
            if (isSelected) {
                return prevSelected.filter(dep => dep.name !== department.name);
            } else {
                return [...prevSelected, department];
            }
        });
    }

    const [filteredDepartments, setFilteredDepartments] = useState<Department[]>(departments)
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
    const [selectedStatus, setSelectedStatus] = useState<Status | null>(null)
    
    useEffect(() => {
        if (searchQuery) {
            const filterDep = departments.filter((dep: Department) =>
                dep.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                dep.value.toLowerCase().includes(searchQuery.toLowerCase())
            )
            setFilteredDepartments(filterDep)
        } else setFilteredDepartments(departments)
    }, [searchQuery, departments])


    useEffect(() => {
        if (selectedDepartmentsArr.length < 3) {
            setSelectedCountry(null)
            setSelectedStatus(null)
            setIsOpenSelectorCountry(false)
            setIsOpenSelectorStatus(false)
        } else {
            dispatch(setFilterDepartments(selectedDepartmentsArr))
            dispatch(setFilterCountry(selectedCountry))
            dispatch(setFilterStatus(selectedStatus))
        }
    }, [selectedDepartmentsArr, selectedCountry, selectedStatus])

    return (
        <section className='w-[1080px] h-[80px] flex flex-col justify-between my-[40px]'>
            <p className='font-rubik text-[14px] text-[#1b2438]'>
                Please add at least 3 departmetns to be able to proceed next steps.
            </p>

            <section className='flex justify-between w-full h-[48px]'>
                <section className='flex justify-between w-[752px] h-full'>
                    <article className='flex justify-between w-[684px]'>
                        <article className=' w-[220px] z-20 bg-white  border border-solid border-black'> 
                            <article onClick={toggleOpenSelectorDep} className='relative cursor-pointer flex items-center py-[8px] px-[24px] w-full h-full'>
                                {!isOpenSelectorDepartments
                                    ? <p className='font-rubik font-bold text-[14px]'>{selectedDepartmentsArr.length ? `Selected(${selectedDepartmentsArr.length})` : 'Select departments'}</p>
                                    : <input
                                        onClick={(e) => {
                                            e.stopPropagation()
                                        }}
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value)
                                        }}
                                        type="text"
                                        placeholder='Type to search...'
                                        className='font-rubik font-normal text-[14px] focus:outline-none'
                                    />
                                }
                                <button className='absolute right-[20px] border-none'> 
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
                            
                            {/* <input type="text" placeholder='Type to search...' /> */}
                            <article className={!isOpenSelectorDepartments? 'hidden' : 'flex flex-col w-[220px]  border border-solid border-black bg-white '}>
                                {filteredDepartments.map((department: Department) => (
                                    <label key={department.name} className=' w-[220px] h-[40px] py-[8px] px-[25px] font-rubik text-[14px] text-[#5e626b] hover:bg-[#00000017] flex items-center'> 
                                        <button  onClick={() => toggleCheckDep(department)} className='w-[24px] h-[24px] mr-[12px] flex justify-center items-center border border-solid border-black'>
                                            {selectedDepartmentsArr.some(dep => dep.name == department.name) && (
                                                <svg  onClick={() => toggleCheckDep(department)} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M14.2649 4.765L6.26492 12.765C6.19461 12.8352 6.0993 12.8747 5.99992 12.8747C5.90055 12.8747 5.80524 12.8352 5.73492 12.765L2.23492 9.265C2.16868 9.19391 2.13262 9.09989 2.13434 9.00274C2.13605 8.90559 2.17541 8.8129 2.24411 8.74419C2.31282 8.67548 2.40551 8.63613 2.50266 8.63441C2.59981 8.6327 2.69384 8.66876 2.76492 8.735L5.99992 11.9694L13.7349 4.235C13.806 4.16876 13.9 4.1327 13.9972 4.13441C14.0943 4.13613 14.187 4.17548 14.2557 4.24419C14.3244 4.3129 14.3638 4.40559 14.3655 4.50274C14.3672 4.59989 14.3312 4.69391 14.2649 4.765Z" fill="black" />
                                                </svg>
                                            )}
                                        </button>
                                        <p>{department.name.length > 15 ? department.value : department.name}</p>
                                    </label>
                                ))}
                            </article>
                        </article>

                        <button disabled={selectedDepartmentsArr.length < 3} className=' w-[220px] z-20 bg-white  border border-solid border-black disabled:border-[#c4c4c4] group'> 
                            <article onClick={toggleOpenSelectorCountry} className='relative cursor-pointer flex items-center py-[8px] px-[24px] w-full h-full '>
                                <p className='font-rubik font-bold text-[14px] group-disabled:text-[#c4c4c4]'>{selectedCountry?.name || `Select country`}</p>
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
                            
                            <article className={!isOpenSelectorCountry? 'hidden' : 'flex flex-col w-[220px]  border border-solid border-black bg-white '}>
                                {selectedCountry?.name && <label className=' w-[220px] h-[40px] py-[8px] px-[25px] font-rubik text-[14px] text-[#5e626b] hover:bg-[#00000017] flex items-center'>{ selectedCountry?.name }</label>}
                                {countries.map((country: Country) => (
                                    country.name !== selectedCountry?.name && (
                                        <label
                                            onClick={() => {
                                                setSelectedCountry(country)
                                                setIsOpenSelectorCountry(false)
                                            }}
                                            key={country.name}
                                            className=' w-[220px] h-[40px] py-[8px] px-[25px] font-rubik text-[14px] text-[#5e626b] hover:bg-[#00000017] flex items-center'
                                        >
                                            <p>{country.name?.length > 15 ? country.value : country.name }</p>
                                        </label>
                                    )
                                ))}
                            </article>
                        </button>

                        <button disabled={selectedDepartmentsArr.length < 3} className=' w-[220px] z-20 bg-white  border border-solid border-black disabled:border-[#c4c4c4] group'> 
                            <article onClick={toggleOpenSelectorStatus} className='relative cursor-pointer flex items-center py-[8px] px-[24px] w-full h-full '>
                            <p className='font-rubik font-bold text-[14px] group-disabled:text-[#c4c4c4]'>{selectedStatus?.name || `Select status`}</p>
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

                            <article className={!isOpenSelectorStatus? 'hidden' : 'flex flex-col w-[220px]  border border-solid border-black bg-white '}>
                                {selectedStatus?.name && <label className=' w-[220px] h-[40px] py-[8px] px-[25px] font-rubik text-[14px] text-[#5e626b] hover:bg-[#00000017] flex items-center'>{selectedStatus?.name}</label>}
                                {statuses.map((status: Status) => (
                                    status.name !== selectedStatus?.name && (
                                        <label 
                                            onClick={() => {
                                                setSelectedStatus(status)
                                                setIsOpenSelectorStatus(false)
                                            }}
                                            key={status.name} 
                                            className=' w-[220px] h-[40px] py-[8px] px-[25px] font-rubik text-[14px] text-[#5e626b] hover:bg-[#00000017] flex items-center'
                                        >
                                            <p>{status.name}</p>
                                        </label>
                                    )
                                ))}
                            </article>
                        </button>
                    </article>

                    <button
                        onClick={() => {
                            setSelectedDepartmentsArr([])
                            setSearchQuery('')
                            setSelectedCountry(null)
                            setSelectedStatus(null)
                            dispatch(setFilterCountry(null))
                            dispatch(setFilterDepartments(null))
                            setFilterStatus(null)
                        }}
                        className='w-[48px] h-[48px] flex justify-center items-center border border-solid border-[#c4c4c4]'
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 7V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V7H2V5H22V7H20ZM6 7V20H18V7H6ZM7 2H17V4H7V2Z" fill="#5E626B" />
                        </svg>
                    </button>
                </section>

                <button className='font-rubik text-[14px] w-[150px] border border-solid border-black' onClick={() => dispatch(toggleAddUserModal())}>Add user</button>    
            </section>

        </section>
    )
}

export default FilterUsers