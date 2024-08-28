import { createSlice} from "@reduxjs/toolkit";

interface ModalAddState{
    isModalOpen: boolean
}

const initialState:ModalAddState = {isModalOpen: false}

const addUserModalSlice = createSlice({
    name: 'addUserModal',
    initialState,
    reducers: {
        toggleAddUserModal: (state) => {
            state.isModalOpen = !state.isModalOpen
        }
    }
})

export const { toggleAddUserModal } = addUserModalSlice.actions
export default addUserModalSlice.reducer