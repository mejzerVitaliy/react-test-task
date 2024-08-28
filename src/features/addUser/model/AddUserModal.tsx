import React from 'react'
import Title from '../../../layout/Title'
import AddUserForm from './AddUserForm'
import { useDispatch } from 'react-redux'
import { toggleAddUserModal } from '../slices/AddUserModalSlice'

const AddUserModal: React.FC = () => {
    const dispatch = useDispatch()

    const closeModal: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        if (e.target === e.currentTarget) {
            dispatch(toggleAddUserModal())
        }
    }

    return (
        <main
            className='fixed top-[88px] left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-[#7d7d7d80]'
            onClick={closeModal}
        >
            <section className='w-[720px] max-w-[1400px] h-[444px] flex flex-col bg-white border border-solid border-black py-[40px] px-[60px]'>
                <Title title='ADD USER' />

                <AddUserForm />

            </section>
        </main>
    )
}

export default AddUserModal