import React, { Fragment } from 'react'
import { Row, Col, Input, Icon, Form, Checkbox, Button, message } from 'antd'
import { withRouter, Link, Redirect } from 'react-router-dom'
import { Title, Desc, Box } from '../component/Utils'
import './../assets/css/login.less'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import * as actUsers from './../redux/actions/actionsUsers'
import { NotifError, NotifSuccess } from '../component/Notification'

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            onSubmit: false,
            email: '',
            password: ''
        }
    }
    hasSuccess = async()=>{
        const { success } = this.props.users
        if(success === true){
            this.props.history.push('/user/dashboard')
        }
    }
    handleLogin = e => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleLogin({
                    email: values.email,
                    password: values.password
                })
            }
        })
        this.setState({
            onSubmit: true
        })
        setTimeout(()=> this.hasSuccess(), 500)
    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Fragment>
                <Row className='h100'>
                    <Col span={8} className="p-20 center pt-200"
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            flexFlow: 'column wrap',
                        }}>
                        <Title text="Sign in" />
                        <Desc text="Sign in with your account, and short your url." class=".mb-5" />
                        <Form className='form' onSubmit={this.handleLogin}>
                            <Form.Item>
                                {getFieldDecorator('email', {
                                    rules: [
                                        { type: 'email', message: 'The input is not valid E-mail' },
                                        { required: true, message: 'Please input your email!' }
                                    ],
                                })(
                                    <Input
                                        prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder='E-mail'
                                        onChange={(e) => this.setState({ email: e.target.value })}
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [
                                        { required: true, message: 'Please input your password!' },
                                        { min: 5, message: 'The password must 6 character' }
                                    ],
                                })(
                                    <Input.Password
                                        prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder='Password'
                                        onChange={(e) => this.setState({ password: e.target.value })}
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(<Checkbox>Remember me</Checkbox>)}
                                <Link className='login-form' to='/forgot'>Forgot Password</Link>
                                <Button type='primary' htmlType='submit' className='btn-login'
                                    disabled={this.state.email && this.state.password ? false : true}>
                                    Sign In
                                </Button>
                                Or <Link to='/register'>
                                    register now!
                                </Link>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span={16} className='login-page p-20'>
                        <Title text="Some Text" />
                    </Col>
                </Row>
            </Fragment>
        )
    }
}
const LoginForm = Form.create({ name: 'login' })(Login)

const stateToProps = state => {
    return {
        users: state.users
    }
}
const dispatchToProps = dispatch => {
    return {
        handleLogin: (params) => dispatch(actUsers.handleLogin(params)),
        redirect: () => dispatch(push('/user/dashboard'))
    }
}
export default connect(stateToProps, dispatchToProps)(withRouter(LoginForm))