import React, { useState } from 'react'
import { Col, Row, Menu, Tag, Alert, Button } from 'antd'
import { BrowserRouter, Route, withRouter, Link, useParams, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { Icon } from 'antd'
import './../../assets/css/base.less'

import LinkPages from './Link'
import Home from './Home'
import Click from './component/Click'
import LimitSection from './component/Limit'
import * as act from './../../redux/actions/actionsUsers'
import { NotifSuccess } from '../../component/Notification'

class Dashboard extends React.Component {
    componentDidMount() {
        const token = localStorage.getItem('token')
        if (!token) {
            this.props.history.replace('/login')
        }
        this.props.sendToken()
        this.interval = setInterval(() => this.autoClose(), 5000)
    }
    autoClose = async () => {
        const time = new Date(this.props.user.expired)
        const timeNow = new Date()
        if (time < timeNow) {
            const props = {
                message: 'Your token has be expired',
                desc: 'you can get again will you login.'
            }
            NotifSuccess(props)
            await localStorage.clear()
            this.props.history.replace('/login')
        }
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }
    render() {
        return (
            <Row>
                <Col span={5}>
                    <Menu
                        mode='inline'
                        defaultSelectedKeys={['1']}
                    >
                        <Menu.Item key="1">
                            <Link to='/user/dashboard/'>
                                <Icon type="dashboard" /> Dashboard
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to='/user/dashboard/link'>
                                <Icon type="api" /> Link
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to='/user/dashboard/setting'>
                                <Icon type="setting" /> Setting
                            </Link>
                        </Menu.Item>
                        <Menu.Item disabled>
                            <Link to='/user/dashboard/payment'>
                                <Icon type="wallet" /> Payment
                                <Tag color="green" style={{ marginLeft: 20 }}>comming soon</Tag>
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to='/user/dashboard/update'>
                                <Icon type="info" /> Update
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Col>
                <Col span={15} className='pl-10 pr-10'>
                    <Switch>
                        <Route exact path='/user/dashboard/' component={Home} />
                        <Route path='/user/dashboard/link' component={LinkPages} />
                    </Switch>
                </Col>
                <Col span={4} className='pr-10'>
                    {
                        this.props.verifyEmail == false &&
                        <>
                        <Alert
                            message={
                                <span>
                                Your e-mail not confirmation. click this for 
                                 <a href=''> confirm</a>.
                                </span>
                            }
                            type='warning'
                            closable
                        />
                        <div className='mb-5'></div>
                        </>
                    }

                    <Click />
                    <div className='mb-5'></div>
                    {this.props.user.premium === false &&
                        <LimitSection data={this.props.user} />
                    }
                </Col>
            </Row>
        )
    }
}
const stateToProps = state => {
    return {
        user: state.users.users,
        verifyEmail: state.users.users.verifyByEmail
    }
}
const dispatchToProps = dispatch => {
    return {
        sendToken: () => dispatch(act.getUserFromToken())
    }
}
export default connect(stateToProps, dispatchToProps)(withRouter(Dashboard))