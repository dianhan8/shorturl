import React, { Fragment } from 'react'
import { Row, Col, Form, Input, Icon, Select, Button, message } from 'antd'
import { withRouter, Link } from 'react-router-dom'
import { Title, Desc } from '../component/Utils'
import { connect } from 'react-redux'
import * as actUsers from './../redux/actions/actionsUsers'
import {push } from 'connected-react-router'

const { Option } = Select;
class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            onSubmit: false,
            confirmDirty: false,
        }
    }
    handleRegister = e => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleRegister({
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    phonenumber: "+62" + values.phone
                })
            }
        })
        setTimeout(() => this.hasSuccess(), 500)
        this.setState({ onSubmit: true })
    }
    hasSuccess = async () => {
        const { success } = this.props.users
        if(success === true){
            this.props.history.push('/login')
        }
    }
    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };
    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };
    render() {
        const { getFieldDecorator } = this.props.form
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '+62',
        })(
            <Select style={{ width: 70 }}>
                <Option value="+62">+62</Option>
            </Select>,
        );
        return (
            <Fragment>
                <Row className='h100'>
                    <Col span={16} className='login-page p-20'>
                        <Title text="Some Text" />
                    </Col>
                    <Col span={8} className="p-20 center pt-50"
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            flexFlow: 'column wrap',
                        }}
                    >
                        <Title text='Sign Up' />
                        <Desc text='Create account for enjoy short many url.' />
                        <Form className='form' onSubmit={this.handleRegister}>
                            <Form.Item>
                                {getFieldDecorator('name', {
                                    rules: [
                                        { required: true, message: 'Please input your name' }
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type='edit' style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder='Name'
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('email', {
                                    rules: [
                                        { type: 'email', message: 'This input only E-Mail' },
                                        { required: true, message: 'Plese input your email' }
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder='Email'
                                    />)}
                            </Form.Item>
                            <Form.Item hasFeedback>
                                {getFieldDecorator('password', {
                                    rules: [
                                        { required: true, message: 'Please input your password' },
                                        { min: 6, message: 'The password must have min 6 character' },
                                        { validator: this.validateToNextPassword, }
                                    ]
                                })(
                                    <Input.Password
                                        prefix={<Icon type='lock' />}
                                        placeholder='Password'
                                    />
                                )}
                            </Form.Item>
                            <Form.Item hasFeedback>
                                {getFieldDecorator('confirm', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please confirm your password!',
                                        },
                                        {
                                            validator: this.compareToFirstPassword,
                                        },
                                    ],
                                })(
                                    <Input.Password
                                        onBlur={this.handleConfirmBlur}
                                        placeholder='Confirm Password'
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('phone', {
                                    rules: [
                                        {required: true, message: 'Please input your phone number!' },
                                        {min: 11, message: 'This not phone number.'},
                                        {max: 12, message: 'This not phone number.'}
                                    ],
                                })(
                                    <Input
                                        addonBefore={prefixSelector}
                                        style={{ width: '100%' }}
                                        placeholder='Phone Number'
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button type='primary' htmlType='submit' className='btn-login'>
                                    Sign Up
                                </Button>
                                Or you already have account <Link to='/login'>
                                    Sign in
                                </Link>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

const FormRegister = Form.create({ name: 'form-register' })(Register)

const stateToProps = state => {
    return {
        users: state.users
    }
}
const dispatchToProps = dispatch => {
    return {
        handleRegister: (params) => dispatch(actUsers.handleRegister(params))
    }
}

export default connect(stateToProps, dispatchToProps)(withRouter(FormRegister))