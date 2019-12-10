import React from 'react'
import { Row, Col, Button, Dropdown, Menu, Icon } from 'antd'
import './../assets/css/header.less'
import { Link, withRouter } from 'react-router-dom'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import jwt from 'jsonwebtoken'
const menu = [
    { name: 'Home', url: '/', icon: 'home' },
    { name: 'About', url: '/about' },
    { name: 'Contact', url: '/contact' },
    { name: 'Sign In', url: '/login', icon: 'user' },
    { name: 'Sign Up', url: '/register', icon: 'user-add' }
]


function Menus(props) {
    return (
        props.data.map((menu, index) => {
            return (
                <Link to={menu.url} key={index}>
                    <Button id='preview-button' icon={menu.icon}>{menu.name}</Button>
                </Link>
            )
        })
    )
}

class AppNavbar extends React.Component {
    render() {
        const logout = async () => {
            await localStorage.clear()
            this.props.history.push('/login')
        }
        const token = localStorage.getItem('token')
        const decode = jwt.decode(token)
        return (
            <div id="header" className="header">
                <Row>
                    <Col xxl={4} xl={5} lg={8} md={8} sm={24} xs={24}>
                        <div to="/" id="logo">
                            <span>NECTLY </span>
                        </div>
                    </Col>
                    <Col xxl={20} xl={19} lg={16} md={16} sm={0} xs={0}>
                        <div className="header-meta">
                            {/* <div id='menu'><Menus data={menu}/></div> */}
                            <div id='preview'>
                                {!token ?
                                    <Menus data={menu} />
                                    :
                                    <Dropdown placement='bottomCenter' overlay={
                                        <Menu>
                                            <Menu.Item>
                                                <a>My Profile</a>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <a onClick={() => logout()}>
                                                    <Icon type="logout" style={{marginRight: 5}}/>
                                                     Logout
                                                </a>
                                            </Menu.Item>
                                        </Menu>

                                    }>
                                        <Button id='preview-button' icon='user'>{decode.name}</Button>
                                    </Dropdown>
                                }
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}
const dispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, dispatchToProps)(withRouter(AppNavbar))