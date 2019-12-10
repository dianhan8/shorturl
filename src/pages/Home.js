import React, { Fragment } from 'react'
import { Row, Col } from 'antd'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Token from '../component/Token'
class Home extends React.Component {
    componentDidMount() {
        this.autoLinking()
    }
    autoLinking = async () => {
        const token = await localStorage.getItem('token')
        if (token) {
            this.props.history.push('/user/dashboard')
        }
    }
    render() {
        return (
            <Fragment>
                <h1>Hello</h1>
            </Fragment>
        )
    }
}

export default connect()(withRouter(Home))