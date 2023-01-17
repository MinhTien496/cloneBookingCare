import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getUsersDataApi, createNewUserApi, editUserDataApi, deleteUserApi } from '../../services/userService'
//import cái modal từ bên modalAddUser (đỡ phải code, xài của reactstrap)
import ModalAddUser from './ModalAddUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter'

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUserData: [],
            isOpenModalAddUser: false,
            isOpenModalEditUser: false,
            userDataWillBeEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUsersDataFromReact();
    }

    getAllUsersDataFromReact = async () => {
        let response = await getUsersDataApi('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUserData: response.userData
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalAddUser: true
        })
    }
    // function này tí truyền cho thằng con ModalAddUser.js
    toggleFromParentAddUser = () => {
        this.setState({
            isOpenModalAddUser: !this.state.isOpenModalAddUser
        })
    }

    toggleFromParentEditUser = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }

    editUserFromParent = async (data) => {
        try {
            let response = await editUserDataApi(data)
            if(response && response.errCode !== 0) {
                alert(response.message)
            } else {
                await this.getAllUsersDataFromReact();
                this.setState({
                    isOpenModalEditUser: false
                })
            }
        } catch(e) {
            console.log(e)
        }
    }

    addNewUserFromParent = async (data) => {
        try {
            let response = await createNewUserApi(data)
            if (response && response.errCode !== 0) {
                alert(response.message)
            } else {
                await this.getAllUsersDataFromReact();
                this.setState({
                    isOpenModalAddUser: false
                })
                emitter.emit('EVENT_CLEAR_INPUT_PARAMETER_MODAL_ADD_NEW_USER')
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleEditUser = (userData) => {
        this.setState({
            isOpenModalEditUser: true,
            userDataWillBeEdit: userData
        })
    }

    handleDeleteUser = async (userData) => {
        try {
            let response = await deleteUserApi(userData.id)
            if (response && response.errCode !== 0) {
                console.log(response.errMessage)
            } else {
                await this.getAllUsersDataFromReact();
            }
        } catch (e) {
            console.log(e)
        }
    }


    render() {
        return (
            <div className="users-container">
                <ModalAddUser
                    //import rồi thì xài ở đây, 2 cái dưới là truyền qua cho thằng con bên ModalAddUser.js
                    isOpen={this.state.isOpenModalAddUser}
                    toggleFromParent={this.toggleFromParentAddUser}
                    addNewUserFromParent={this.addNewUserFromParent}
                />
                <ModalEditUser
                    isOpen={this.state.isOpenModalEditUser}
                    toggleFromParent={this.toggleFromParentEditUser}
                    userDataWillBeEdit={this.state.userDataWillBeEdit}
                    editUserFromParent={this.editUserFromParent}
                />
                <div className="title text-center">Manage users</div>
                <div className="mx-1">
                    <button className="btn btn-primary px-3 mx-1" onClick={() => this.handleAddNewUser()}>
                        Add user
                        <i className="fas fa-user-plus mx-2"></i>
                    </button>
                </div>
                <div className="table-data mt-3 mx-2">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Active</th>
                            </tr>
                            {//check arrUserData and use map to loop - render
                                this.state.arrUserData && this.state.arrUserData.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td className="active-User">
                                                <button onClick={() => this.handleEditUser(item)}>
                                                    <i className="fas fa-user-edit"></i>
                                                </button>
                                                <button onClick={() => this.handleDeleteUser(item)}>
                                                    <i className="fas fa-user-times"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
