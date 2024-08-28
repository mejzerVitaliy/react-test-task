import axios from "axios";
import { User } from "../../../app/types/UsersDataTypes";

const base_url = 'http://localhost:5000/'

export const deleteUserByID = async (id: string) => {
    try {
        await axios.delete(`${base_url}users/${id}`)
    } catch (error) {
        console.error(error)
    }
}

export const createNewUser = async (newUserData:User) => {
    try {
        await axios.post(`${base_url}users`, newUserData)
        console.log('User created')
    } catch (error) {
        console.error(error)
    }
}