import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class ProductManage extends Component {
    //Khai báo constructor có thằng props - thằng này có data từ th cha (UserManage.js)
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
    }
    //OFF modal bằng việc gọi tới function bên thằng cha truyền tới cho
    //Nên ở đây chỉ việc render thôi, k xử lý event gì cả
    toggle = () => {
        this.props.toggleFromParent()
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
                            <input type="text"/>
                        </div>
                        <div className="container-input">
                            <lable>Password</lable>
                            <input type="text"/>
                        </div>
                    </div>
                    <div className="body-addUser">
                        <div className="container-input">
                            <lable>First name</lable>
                            <input type="text"/>
                        </div>
                        <div className="container-input">
                            <lable>Last name</lable>
                            <input type="text"/>
                        </div>
                    </div>
                    <div className="body-addUser">
                        <div className="container-input max-width">
                            <lable>Address</lable>
                            <input type="text"/>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className="px-3" onClick={() => this.toggle()}>
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

