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
const getUsersDataApi = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
}

const createNewUserApi = (inputData) => {
    return axios.post('/api/create-new-user', inputData)
}

const editUserDataApi = (inputData) => {
    return axios.put('/api/edit-user', {
        id: inputData.id,
        firstName: inputData.firstName,
        lastName: inputData.lastName,
        address: inputData.address
    })
}

const deleteUserApi = (inputId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: inputId
        }
    })
}

export {
    handleLoginApi,
    getUsersDataApi,
    createNewUserApi,
    editUserDataApi,
    deleteUserApi
}