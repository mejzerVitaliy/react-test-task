import axios from "axios";

const urlToApi = 'http://localhost:5000'

export const updateUserData = async (id: string, updatedUser: any) => {
    try {
        const response = await axios.put(`${urlToApi}/users/${id}`, updatedUser)
        console.log(response.data);
        
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}