import axios from 'axios';
export const registerNewUser = (data) => {
    return async (dispatch) => {
        const url = '/api/chat/register-user';
        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
        try {
            const response = await axios.post(url, data, config);
        } catch (error) {
            console.log(error);
        }
    }
}