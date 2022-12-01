import axios from 'axios';
import * as types from '../types/authTypes';
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
            localStorage.setItem('authToken', response.data.token);
            dispatch({
                type: types.REGISTER_SUCCESS,
                payload: {
                    success: response.data.success,
                    token: response.data.token
                }
            })
        } catch (error) {
            dispatch({
                type: types.REGISTER_ERR,
                payload: {
                    error: error.response.data.error
                }
            })
        }
    }
}