import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getDataUser } from '../../services/userService'
import ModalAddUser from './ModalAddUser';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDataUser: [],
            isModalOpen: false
        }
    }

    async componentDidMount() {
        let response = await getDataUser('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrDataUser: response.userData
            }, () => {
                console.log('arrData', response.userData)
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isModalOpen: true
        })
    }

    toggleFromParent = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }


    render() {
        return (
            <div className="users-container">
                <ModalAddUser
                    isOpen = {this.state.isModalOpen}
                    toggleFromParent = {this.toggleFromParent}
                />
                <div className="title text-center">Manage users</div>
                <div className="mx-1">
                    <button className="btn btn-primary px-3 mx-1" onClick={() => this.handleAddNewUser()}>
                        Add user
                        <i class="fas fa-user-plus mx-2"></i>
                    </button>
                </div>
                <div className="table-data mt-3 mx-2">
                    <table id="customers">
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
                                            <i class="fas fa-user-edit"></i>
                                            <i class="fas fa-user-times"></i>
                                        </td>
                                    </tr>
                                )
                            })
                        }
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
