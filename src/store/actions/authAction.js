import axios from 'axios';
export const registerNewUser = (data) => {
    return async (dispatch) => {
        const url = '/api/chat/register-user';
        const config = {
            headers: {

            }
        }
        try {
            const response = await axios.post(url, data, config);
            console.log("response", response);
        } catch (error) {
            console.log(error.response);
        }
    }
}