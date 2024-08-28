import axios from "axios";

const base_url = 'http://localhost:5000/'

export const deleteUserByID = async (id: string) => {
    try {
        await axios.delete(`${base_url}users/${id}`)
    } catch (error) {
        console.error(error)
    }
}