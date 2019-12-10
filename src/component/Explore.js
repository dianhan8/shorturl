import React from 'react'
import { Row, Col } from 'antd'
import { Title } from './../component/Utils'

class Explore extends React.Component {
    render() {
        return (
            <Row>
                <Col xxl={4} xl={24} lg={8} md={8} sm={24} xs={24} className="box-project mr-t-20">
                    <Title text="Explore" />
                </Col>
            </Row>
        )
    }
}

export default Explore