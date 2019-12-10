import React from 'react'
import { Card } from 'antd'

export default function Click() {
    return (
        <Card
            title='Total Klik'
            headStyle={{ backgroundColor: '#2962ff', color: '#fff', fontWeight: 'bold' }}
            bodyStyle={{
                backgroundColor: '#2962ff', color: '#fff', padding: 0, paddingLeft: 25,
                paddingTop: 10,height: 80 }}
            bordered={false}
            hoverable={true}
        >
            <span>Dari </span>
            <div>
                <span className='f-18'>100.000 Click</span>
            </div>
        </Card>
    )
}
