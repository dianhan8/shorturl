import React from 'react'
import { Card, Progress, Button } from 'antd'
import Typography from 'antd/lib/typography/Typography'

function LimitSection() {
    return (
        <Card title='Limit build link'
            headStyle={{ backgroundColor: '#2962ff', color: '#fff', fontWeight: 'bold' }}
        >
            <span>
                <Typography>build link</Typography>
                <Progress size='default' percent={0.1} />
            </span>
            <span>
                <Typography>build link redirect</Typography>
                <Progress size='default' percent={0.5} />
            </span>
            <Button type='primary'>
                Upgrade to pro
            </Button>
        </Card>
    )
}


export default LimitSection