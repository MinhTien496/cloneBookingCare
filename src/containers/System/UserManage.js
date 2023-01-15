import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getDataUser } from '../../services/userService'

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDataUser: []
        }
    }

    async componentDidMount() {
        let response = await getDataUser('ALL');
        console.log('arrdata0', response)
        if (response && response.errCode === 0) {
            this.setState({
                arrDataUser: response.userData
            }, () => {
                console.log('arrdata1', response.userData)
            })
            console.log('arrdata2', this.state.arrDataUser)

        }
    }


    render() {
        let arrDataUser = this.state.arrDataUser
        return (
            <div className="user-container">
                <div className="title text-center">Manage users</div>
                <div className="table-data mt-3 mx-2">
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>Active</th>
                        </tr>
                        {   arrDataUser && arrDataUser.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>Edit me</td>
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
