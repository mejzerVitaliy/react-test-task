import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Country, Department, Status } from "../../../app/types/UsersDataTypes";

interface FilterState {
    selectedDepartments: Department[] | null;
    selectedCountry: Country | null;
    selectedStatus: Status | null;
}

const initialState: FilterState = {
    selectedDepartments: null,
    selectedCountry: null,
    selectedStatus: null
}

const filterUsersSlice = createSlice({
    name: 'filterUsers',
    initialState,
    reducers: {
        setFilterDepartments: (state, action: PayloadAction<Department[] | null>) => {
            state.selectedDepartments = action.payload 
        },
        setFilterCountry: (state, action: PayloadAction<Country | null>) => {
            state.selectedCountry = action.payload 
        },
        setFilterStatus: (state, action: PayloadAction<Status | null>) => {
            state.selectedStatus = action.payload 
        },
    }
})

export const { setFilterDepartments, setFilterStatus, setFilterCountry } = filterUsersSlice.actions
export default filterUsersSlice.reducer