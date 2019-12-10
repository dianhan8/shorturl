import React from 'react'
import { connect } from 'react-redux'
import {getUserFromToken} from './../redux/actions/actionsUsers'

class Token extends React.Component {
    componentDidUpdate() {
        this.getToken()
    }
    getToken = async () => {
        const token = await localStorage.getItem('token')
        if (token) {
            this.props.sendToken(token)
        }
    }
}
const dispatchToProps = dispatch => {
    return {
        sendToken: (token)=> dispatch(getUserFromToken(token))
    }
}
export default connect(dispatchToProps)(Token)