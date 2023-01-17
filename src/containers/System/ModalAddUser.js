import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter'

class ProductManage extends Component {
    //Khai báo constructor có thằng props - thằng này có data từ th cha (UserManage.js)
    //tao state luon de luu data
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: ""
        }

        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_INPUT_PARAMETER_MODAL_ADD_NEW_USER', () => {
            this.setState({
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                address: ""  
            })
        })
    }

    componentDidMount() {
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



    handleAddNewUser = () => {
        let checkValidate = this.validateInputData()
        if (checkValidate === true) {
            this.props.addNewUserFromParent(this.state)
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
                <ModalHeader>Add new user</ModalHeader>
                <ModalBody>
                    <div className="body-addUser">
                        <div className="container-input">
                            <lable>Email</lable>
                            <input
                                type="email"
                                onChange={(event) => this.handleOnChangeInput(event, "email")}
                                value={this.state.email}
                            />
                        </div>
                        <div className="container-input">
                            <lable>Password</lable>
                            <input
                                type="text"
                                onChange={(event) => this.handleOnChangeInput(event, "password")}
                                value={this.state.password}
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
                        onClick={() => this.handleAddNewUser()}>
                        Add
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);

