import axios from "axios";

const base_url = 'https://react-test-task.onrender.com/'

export const deleteUserByID = async (id: string) => {
    try {
        await axios.delete(`${base_url}users/${id}`)
    } catch (error) {
        console.error(error)
    }
}