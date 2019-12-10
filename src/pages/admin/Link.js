import React, { Fragment } from 'react'
import { Row, Col } from 'antd'
import { withRouter } from 'react-router-dom'
class Home extends React.Component {
    render() {
        return (
            <Fragment>
                <h1>Hello Link</h1>
            </Fragment>
        )
    }
}

export default withRouter(Home)