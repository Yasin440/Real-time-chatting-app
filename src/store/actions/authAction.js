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

export const loginUser = (data) => async (dispatch) => {
    const url = '/api/chat/login-user';
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const response = await axios.post(url, data, config);
        localStorage.setItem('authToken', response.data.token);
        dispatch({
            type: types.LOGIN_SUCCESS,
            payload: {
                success: response.data.success,
                token: response.data.token
            }
        })
    } catch (error) {
        dispatch({
            type: types.LOGIN_FAILED,
            payload: {
                error: error.response.data.error
            }
        })
    }
}