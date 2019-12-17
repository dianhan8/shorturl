import React from 'react'
import { Button, Popconfirm, message } from 'antd'
import { connect } from 'react-redux'
import * as act from './../../../redux/actions/actionsLinks'


class Delete extends React.Component {
    constructor(props) {
        super(props)
    }
    destroyData = async (id) => {
        const token = await localStorage.getItem('token')
        if (token) {
            this.props.deleteData({
                id,
                userid: this.props.id,
                token
            })
        }
        setTimeout(() => this.props.getData(this.props.id, token), 500)
    }
    confirm = (id) => {
        this.destroyData(id)
    }
    cancel = e => {
        message.info('Delete Cancel')
    }
    render() {
        const record = this.props.data
        return (
            <Popconfirm
                title="Are you sure delete this link?"
                onConfirm={() => this.confirm(record.id)}
                onCancel={() => this.cancel()}
                okText="Yes"
                cancelText="No"
            >
                <Button icon='delete' type='danger' style={{ marginLeft: 10 }}></Button>
            </Popconfirm>
        )
    }
}

const stateToProps = state => {
    return {
        id: state.users.users.userid
    }
}
const dispatchToProps = dispatch => {
    return {
        deleteData: (params) => dispatch(act.handleDeleteQuery(params)),
        getData: (id, token) => dispatch(act.handleGetQuery(id, token))
    }
}

export default connect(stateToProps, dispatchToProps)(Delete)