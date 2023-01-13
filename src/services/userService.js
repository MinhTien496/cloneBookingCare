import { stringify } from 'react-auth-wrapper/helpers';
import axios from '../axios'

const handleLoginApi = (userEmailInput, userPasswordInput) => {
    return axios.post('/api/login', {
        email: userEmailInput,
        password: userPasswordInput
    });
}

export { handleLoginApi }