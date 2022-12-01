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
}

export const authReducer = (state = initial, action) => {
    const { payload, type } = action;
    if (type === types.REGISTER_ERR) {
        return {
            ...initial,
            loading: true,
            authenticate: false,
            myInfo: '',
            error: payload.error
        }
    }
    if (type === types.REGISTER_SUCCESS) {
        return {
            ...initial,
            loading: false,
            authenticate: true,
            success: payload.success,
            myInfo: decodeToken(payload.token),
            error: ''
        }
    }
    return state;
}