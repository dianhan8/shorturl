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
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.state.onSubmit === true) {
            if (nextProps.users.isLoad === false) {
                if (nextProps.users.status === 204) {
                    message.info(<span>{nextProps.users.data.message}</span>)
                    this.props.users.isLoad = true
                    nextProps.users.isLoad = true
                } else if (nextProps.users.status === 200) {
                    message.success(<span>Success, Automatic redirect to Dashboard</span>,3)
                    localStorage.setItem('token', nextProps.users.data.token)
                    this.props.users.isLoad = true
                    nextProps.users.isLoad = true
                    this.props.history.push('/user/dashboard')
                } else if (nextProps.users.status === 404) {
                    message.error(<span>{nextProps.users.data}</span>)
                    this.props.users.isLoad = true
                    nextProps.users.isLoad = true
                } else if (nextProps.users.status === 301) {
                    message.info(nextProps.users.data.message)
                    this.props.users.isLoad = true
                    nextProps.users.isLoad = true
                }
                this.setState({ onSubmit: false })
            } else if(this.props.users.isLoad === true){
                message.loading('Loading')
            }
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