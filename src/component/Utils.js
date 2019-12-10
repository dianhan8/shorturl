import React from 'react'
// import PropTypes from 'prop-types'
import { Card, Typography, Tabs, Button, Tooltip, Row, Col } from 'antd'
import './../assets/css/utils.less'
import './../assets/css/base.less'

const { TabPane } = Tabs

const Info = (props) => (
    <Tooltip placement="topLeft" title="How is worked!">
        <Button icon="info" type="link" />
    </Tooltip>
)

export const CardText = (props) => {
    return (
        <Card
            size={props.size}
            extra={props.info ? <Info /> : null}
            title={props.title}
            className="Box"
            bodyStyle={{ justifyContent: 'center', textAlign: 'center' }}
            style={{
                color: props.light ? '#fff' : '#3d3d3d',
                height: props.height
            }}>
            {props.text}
        </Card>
    )
}

export const Title = (props) => {
    return (
        <Typography
            style={{
                fontWeight: props.bold ? "bold" : null,
                fontSize: 22,
                color: props.color ? props.color : "rgba(0,0,0,.7)"
            }}
        >
            {props.text}
        </Typography>
    )
}

export const Desc = (props) => {
    return (
        <Typography
            style={{
                fontSize: 12,
                color: "rgba(0,0,0,.7)"
            }}
            className={props.class}
        >
            {props.text}
        </Typography>
    )
}

export const Box = (props) => {
    return (
        <Card
            style={{
                backgroundImage: `url(${props.url})`,
                width: 120,
                height: 120,
                borderRadius: 10,
                textAlign: 'center',
                color: '#fff',
                fontSize: 20,
                fontWeight: 'bold'
            }}
            hoverable={true}
        >
            {props.text}
        </Card>
    )
}

export const Event = (props) => {
    return (
        <div className="tab">
            <Tabs tabBarExtraContent={<Info />}>
                <TabPane tab="Solution" key="1" className="pl-10">
                    Content of tab 1
                </TabPane>
                <TabPane tab="Debat" key="2" className="pl-10">
                    Content of tab 2
                </TabPane>
                <TabPane tab="Fix Problem" key="3" className="pl-10">
                    Content of tab 3
                </TabPane>
            </Tabs>
        </div>
    )
}

export const Category = (props) => {
    return (
        <Row>
            <Col xxl={4} xl={24} lg={8} md={8} sm={24} xs={24} className="box-project mr-t-20">
                <Button>Dioda</Button>
            </Col>
        </Row>
    )
}