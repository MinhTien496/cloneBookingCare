import { stringify } from 'react-auth-wrapper/helpers';
import axios from '../axios'
//Req to backend with email and password from client
const handleLoginApi = (userEmailInput, userPasswordInput) => {
    return axios.post('/api/login', {
        email: userEmailInput,
        password: userPasswordInput
    });
}

//inputId == 'ALL' -> API return all data user
const getDataUserApi = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
}

const createNewUserApi = (inputData) => {
    return axios.post('/api/create-new-user', inputData)
}

export {
    handleLoginApi,
    getDataUserApi,
    createNewUserApi
}