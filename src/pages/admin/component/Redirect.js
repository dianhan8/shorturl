import React from 'react'
import { Switch } from 'antd'
import { connect } from 'react-redux'
import * as act from './../../../redux/actions/actionsLinks'

class Redirect extends React.Component {
    constructor(props) {
        super(props)
    }
    changeRedirect = async (id, state) => {
        const token = await localStorage.getItem('token')
        if (token) {
            this.props.change({
                id,
                userid: this.props.id,
                redirect: state,
                token
            })
        }
        setTimeout(()=> this.props.getData(this.props.id, token), 1000)
    }
    render() {
        const record = this.props.data
        const is = this.props.is
        return (
            <>
                <Switch checked={is} onChange={(e)=> this.changeRedirect(record.id, e.valueOf())}/>
            </>
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
        change: (params) => dispatch(act.handleRedirect(params)),
        getData: (id, token) => dispatch(act.handleGetQuery(id, token))
    }
}

export default connect(stateToProps, dispatchToProps)(Redirect)
