import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash'

class ModalEditUser extends Component {
    //Khai báo constructor có thằng props - thằng này có data từ th cha (UserManage.js)
    //tao state luon de luu data
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: ""
        }
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) { 
        //check userDataWillBeEdit có trong props hiện tại và userDataWillBeEdit ở props hiện tại khác userDataWillBeEdit trong props quá khứ:
        if ('userDataWillBeEdit' in this.props && this.props.userDataWillBeEdit !== prevProps.userDataWillBeEdit) {
            const currentDataUser = this.props.userDataWillBeEdit;
            this.setState({
                    id: currentDataUser.id,
                    email: currentDataUser.email,
                    password: '******',
                    firstName: currentDataUser.firstName,
                    lastName: currentDataUser.lastName,
                    address: currentDataUser.address
            });
        }
    }

    //OFF modal bằng việc gọi tới function bên thằng cha truyền tới cho
    //Nên ở đây chỉ việc render thôi, k xử lý event gì cả
    toggle = () => {
        this.props.toggleFromParent()
    }

    handleOnChangeInput = (event, id) => {
        //this.state is obj {email,password,firstName,lastName and address}
        //newCopyState is new variable to save data{} of old this.state be for transform
        let newCopyState = { ...this.state };
        //newCopyState[id] with id = 'email/password/firstName/lastName/address' to update data when onChange()
        //when create event onChange we send id === variable so [id] = ['email'] or ['password'] or ['firstName']...
        newCopyState[id] = event.target.value;
        //re-update data 
        this.setState({
            ...newCopyState
        })
    }

    validateInputData = () => {
        let isValidate = true;
        let arrInputData = ['email', 'password', 'firstName', 'lastName', 'address'];
        let arrInputNull = [];
        let lengthArrInputData = arrInputData.length
        for (let i = 0; i < lengthArrInputData; i++) {
            if (!this.state[arrInputData[i]]) {
                isValidate = false;
                arrInputNull.push(arrInputData[i])
                alert('Missing input parameter!')
                break;
            }
        }
        return isValidate
    }

    handleEditNewUser = () => {
        let checkValidate = this.validateInputData()
        if (checkValidate === true) {
            this.props.editUserFromParent(this.state)
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={"modal-add-user"}
                size={"lg"}
            >
                <ModalHeader>Edit user</ModalHeader>
                <ModalBody>
                    <div className="body-addUser">
                        <div className="container-input">
                            <lable>Email</lable>
                            <input
                                type="email"
                                onChange={(event) => this.handleOnChangeInput(event, "email")}
                                value={this.state.email}
                                disabled
                            />
                        </div>
                        <div className="container-input">
                            <lable>Password</lable>
                            <input
                                type="text"
                                onChange={(event) => this.handleOnChangeInput(event, "password")}
                                value={this.state.password}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="body-addUser">
                        <div className="container-input">
                            <lable>First name</lable>
                            <input
                                type="text"
                                onChange={(event) => this.handleOnChangeInput(event, "firstName")}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className="container-input">
                            <lable>Last name</lable>
                            <input
                                type="text"
                                onChange={(event) => this.handleOnChangeInput(event, "lastName")}
                                value={this.state.lastName}
                            />
                        </div>
                    </div>
                    <div className="body-addUser">
                        <div className="container-input max-width">
                            <lable>Address</lable>
                            <input
                                type="text"
                                onChange={(event) => this.handleOnChangeInput(event, "address")}
                                value={this.state.address}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className="px-3"
                        onClick={() => this.handleEditNewUser()}>
                        Save
                    </Button>{' '}
                    <Button color="secondary" className="px-3" onClick={() => this.toggle()}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);

