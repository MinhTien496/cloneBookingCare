import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getDataUserApi, createNewUserApi, deleteUserApi } from '../../services/userService'
//import cái modal từ bên modalAddUser (đỡ phải code, xài của reactstrap)
import ModalAddUser from './ModalAddUser';
import { emitter } from '../../utils/emitter'

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDataUser: [],
            isOpenModalAddUser: false
        }
    }

    async componentDidMount() {
        await this.getAllDataUsersFromReact();
    }

    getAllDataUsersFromReact = async () => {
        let response = await getDataUserApi('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrDataUser: response.userData
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalAddUser: true
        })
    }
    // function này tí truyền cho thằng con ModalAddUser.js
    toggleFromParent = () => {
        this.setState({
            isOpenModalAddUser: !this.state.isOpenModalAddUser
        })
    }

    addNewUserFromParent = async (data) => {
        try {
            let response = await createNewUserApi(data)
            if (response && response.errCode !== 0) {
                alert(response.message)
            } else {
                await this.getAllDataUsersFromReact();
                this.setState({
                    isOpenModalAddUser: false
                })
                emitter.emit('EVENT_CLEAR_INPUT_PARAMETER_MODAL_ADD_NEW_USER')
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleDeleteUser = async (userData) => {
        try {
            let response = await deleteUserApi(userData.id)
            if (response && response.errCode !== 0) {
                console.log(response.errMessage)
            } else {
                await this.getAllDataUsersFromReact();
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
                    toggleFromParent={this.toggleFromParent}
                    addNewUserFromParent={this.addNewUserFromParent}
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
                            {//check arrDataUser and use map to loop - render
                                this.state.arrDataUser && this.state.arrDataUser.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td className="active-User">
                                                <button>
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
