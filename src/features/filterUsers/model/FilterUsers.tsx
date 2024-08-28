import React from 'react'
import { toggleAddUserModal } from '../../addUser/slices/AddUserModalSlice'
import { useDispatch } from 'react-redux'

const FilterUsers: React.FC = () => {
    const dispatch = useDispatch()

    return (
        <section className='w-[1080px] h-[80px] flex flex-col justify-between my-[40px]'>
            <p className='font-rubik text-[14px] text-[#1b2438]'>
                Please add at least 3 departmetns to be able to proceed next steps.
            </p>

            <section className='flex justify-between w-full h-[48px]'>
                <section className='flex justify-between w-[752px] h-full'>
                    <article className='flex justify-between w-[684px]'>
                        <select className=' w-[220px] h-full border border-solid border-black'>

                        </select>

                        <select className=' w-[220px] h-full border border-solid border-black'>

                        </select>

                        <select className=' w-[220px] h-full border border-solid border-black'>

                        </select>
                    </article>

                    <button className='w-[48px] h-[48px] flex justify-center items-center border border-solid border-[#c4c4c4]'>
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