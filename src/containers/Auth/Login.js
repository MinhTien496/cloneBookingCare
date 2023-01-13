import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { divide } from 'lodash';
import { handleLoginApi } from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errMessage: '',
            isShowPassword: false
        }
    }

    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value,
            errMessage: ''
        })
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value,
            errMessage: ''
        })
    }

    handleShowPassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.email, this.state.password)
            if(data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            } if(data && data.errCode == 0) {
                //Login successfully!
                this.props.userLoginSuccess(data.user)
                console.log('login successfully!')
            }
        } catch(e) {
            if(e.response) {
                if(e.response.data) {
                    this.setState({
                        errMessage: e.response.data.message
                    })
                }
            }
        }
    }


    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Email</label>
                            <input type='text' className='form-control' value={this.state.email} onChange={(event) => this.handleOnChangeEmail(event)}></input>
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password</label>
                            <input type={this.state.isShowPassword ? 'text' : 'password'} className='form-control' value={this.state.password} onChange={(event) => this.handleOnChangePassword(event)}></input>
                            <span onClick={() => {this.handleShowPassword()}}>
                                <i class={this.state.isShowPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                            </span>
                        </div>
                        <div className='errorMessage'>
                            <span>{this.state.errMessage}</span>
                        </div>
                        <div className='forgot-password'>
                            <span>Forgot Password?</span>
                        </div>
                        <div className='btn-login'>
                            <button onClick={() => { this.handleLogin() }}>LOGIN</button>
                        </div>
                        <div>
                            <span>Other login:</span>
                        </div>
                        <div className='iconOtherLogin'>
                            <i class="fab fa-google"></i>
                            <i class="fab fa-facebook"></i>
                            <i class="fab fa-twitter"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
