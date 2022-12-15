import * as types from '../types/authTypes';
import jwtDecode from 'jwt-decode';
const initial = {
    loading: true,
    authenticate: false,
    success: '',
    error: '',
    myInfo: ''
}
const decodeToken = token => {
    const decodedToken = jwtDecode(token);
    const expireTime = new Date(decodedToken.exp * 1000);
    if (new Date() > expireTime) {
        return null;
    }
    return decodedToken;
}
const getMyInfo = localStorage.getItem('authToken');
if (getMyInfo) {
    const getInfoWithDecode = decodeToken(getMyInfo);
    if (getInfoWithDecode) {
        initial.myInfo = getInfoWithDecode;
        initial.authenticate = true;
        initial.loading = false

    }
} else if (!getMyInfo) {
    initial.myInfo = '';
    initial.authenticate = false;
    initial.loading = true
}

export const authReducer = (state = initial, action) => {
    const { payload, type } = action;
    if (type === types.REGISTER_ERR || type === types.LOGIN_FAILED) {
        return {
            ...state,
            error: payload.error
        }
    }
    if (type === types.REGISTER_SUCCESS || type === types.LOGIN_SUCCESS) {
        return {
            loading: false,
            authenticate: true,
            success: payload.success,
            myInfo: decodeToken(payload.token),
            error: ''
        }
    }
    if (type === types.SUCCESS_MESSAGE_CLEAR) {
        return {
            ...state,
            success: ''
        }
    }

    return state;
}