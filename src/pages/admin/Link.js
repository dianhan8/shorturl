import React, { Fragment } from 'react'
import { Table, Popover, Switch, Button, message, Divider } from 'antd'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as act from './../../redux/actions/actionsLinks'
import CreateLinks from './component/Create'
import Edit from './component/Edit'
import Delete from './component/Delete'
import Redirect from './component/Redirect'
import { HOST } from '../../component/Host'

function copyToClipboard(text) {
    var textField = document.createElement('textarea')
    textField.innerText = `${HOST}/${text}`
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
    message.info('Copied!')
}

const colums = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.title - b.title,
    },
    {
        title: 'Link',
        dataIndex: 'url_out',
        key: 'url_out',
        render: (text, record) => <Popover placement='topLeft' content={record.url_in}>
            <a href=''>{text}</a>
        </Popover>
    },
    {
        title: 'Redirect',
        dataIndex: 'redirect',
        key: 'redirect',
        render: (text, record) => <Redirect data={record} is={text} />
    },
    {
        title: 'Click',
        dataIndex: 'click',
        key: 'click'
    },
    {
        title: 'Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: text => new Date(text).toDateString()
    },
    {
        title: 'Action',
        dataIndex: 'redirect',
        key: 'action',
        render: (text, record) => (
            <>
                <Edit idlink={record.id} data={record} redirect={text}/>
                <Delete data={record} />
                <Button icon='copy' style={{marginLeft: 10}} type='primary'
                onClick={() => copyToClipboard(record.url_out)}></Button>
            </>
        )
    }
]

class Link extends React.Component {
    componentDidMount() {
        this.getQueryLinks()
    }
    getQueryLinks = async () => {
        const token = await localStorage.getItem('token')
        await this.props.getData(this.props.id, token)
    }
    render() {
        const dataSource = this.props.link
        return (
            <Fragment>
                <CreateLinks />
                {this.props.user.premium == true && 
                    <Button>Custom Url</Button>
                }
                <Divider/>
                <Table rowKey={record => record.id} dataSource={dataSource} columns={colums} />
            </Fragment>
        )
    }
}


const stateToProps = state => {
    return {
        user: state.users.users,
        link: state.links.link,
        id: state.users.users.userid
    }
}

const dispatchToProps = dispatch => {
    return {
        getData: (id, token) => dispatch(act.handleGetQuery(id, token))
    }
}


export default connect(stateToProps, dispatchToProps)(withRouter(Link))