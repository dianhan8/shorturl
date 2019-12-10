import React from 'react'
import { Card, Icon, Button, Dropdown, Menu, Row, Col, PageHeader, Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import './../../assets/css/base.less'
import Chart from './component/Chart';


class Home extends React.Component {
    render() {
        const menu = (
            <Menu>
                <Menu.Item>
                    <Link>
                        Lebih rinci
                    </Link>
                </Menu.Item>
            </Menu>
        );
        return (
            <>
                <Breadcrumb itemRender={<a>Hello</a>} />
                <Card title='Perkiraan Kunjungan' extra={
                    <Dropdown overlay={menu}>
                        <Button type='ghost' style={{ borderWidth: 0 }}>
                            <Icon type='more' style={{ fontWeight: 'bold', color: '#fff' }} />
                        </Button>
                    </Dropdown>

                }
                    headStyle={{ backgroundColor: '#2962ff', color: '#fff', fontWeight: 'bold' }}
                    bodyStyle={{
                        backgroundColor: '#2962ff', color: '#fff', padding: 0, paddingLeft: 25,
                        paddingBottom: 25
                    }}
                    bordered={false}
                    hoverable={true}
                >
                    <Row>
                        <Col span={6}>
                            <span>Hari Ini</span>
                            <div>
                                <span className='f-18'>80 Click</span>
                            </div>
                        </Col>
                        <Col span={6}>
                            <span>Kemarin</span>
                            <div>
                                <span className='f-18'>80 Click</span>
                            </div>
                        </Col>
                        <Col span={6}>
                            <span>7 hari yang lalu</span>
                            <div>
                                <span className='f-18'>80 Click</span>
                            </div>
                        </Col>
                        <Col span={6}>
                            <span>Bulan ini</span>
                            <div>
                                <span className='f-18'>80 Click</span>
                            </div>
                        </Col>
                    </Row>
                </Card>
                <Row>
                    <Chart/>
                </Row>
            </>
        )
    }
}


export default Home