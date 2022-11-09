import axios from 'axios';
export const registerNewUser = (data) => {
    return async (dispatch) => {
        console.log(data);
        const url = '/api/chat/register-user';
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            const response = await axios.post(url, data, config)
        } catch (error) {
            console.log(error);
        }
    }
}