import { stringify } from 'react-auth-wrapper/helpers';
import axios from '../axios'
//Req to backend with email and password from client
const handleLoginApi = (userEmailInput, userPasswordInput) => {
    return axios.post('/api/login', {
        email: userEmailInput,
        password: userPasswordInput
    });
}

const getDataUser = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
}

export { handleLoginApi, getDataUser }