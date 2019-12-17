import * as types from './../types'
import { message } from 'antd'
import { push } from 'connected-react-router'
import React from 'react'

const initialState = {
    isLoad: true,
    status: null,
    failed: false,
    users: '',
    success: false
}

export default function reducersUsers(state = initialState, action) {
    switch (action.type) {
        case `${types.LOGIN}_PENDING`:
            state = initialState
            return {
                ...state,
                isLoad: true
            }
        case `${types.LOGIN}_FULFILLED`:
            switch (action.payload.data.code) {
                case 200:
                    message.success(<span>Success, Automatic redirect to Dashboard</span>, 3)
                    localStorage.setItem('token', action.payload.data.token)
                    state.isLoad = false
                    state.failed = false
                    state.success = true
                    break;
                case 204:
                    message.info(action.payload.data.message)
                    state.isLoad = false
                    state.failed = true
                    state.success = false
                    break;
                case 301:
                    message.info(action.payload.data.message)
                    state.isLoad = false
                    state.failed = true
                    state.success = false
                case 404:
                    message.error(action.payload.message)
                    state.isLoad = false
                    state.failed = true
                    state.success = false
                    break;
            }
            return {
                ...state
            }
        case `${types.LOGIN}_REJECTED`:
            message.error(action.payload.message)
            return {
                ...state,
                isLoad: false,
            }
        case `${types.REGISTER}_PENDING`:
            state = initialState
            if (state.isLoad === true) {
                message.loading('Request to server', 1)
            }
            return {
                ...state,
                isLoad: true
            }
        case `${types.REGISTER}_FULFILLED`:
            switch (action.payload.data.code) {
                case 202:
                    message.info(action.payload.data.message)
                    state.isLoad = false
                    state.failed = false
                    state.success = false
                    break;
                case 201:
                    message.success(action.payload.data.message)
                    state.isLoad = false
                    state.failed = false
                    state.success = true
                    break;
                case 500:
                    message.error('Maaf ada kesalahan pada server kami.')
                    state.isLoad = false
                    state.failed = true
                    state.success = false
            }
            return {
                isLoad: state.isLoad,
                failed: state.failed,
                success: state.success
            }
        case `${types.REGISTER}_REJECTED`:
            message.error(action.payload.message)
            return {
                ...state,
                isLoad: false,
            }
        case `${types.GET_TOKEN}`:
            return {
                ...state,
                users: action.payload
            }
        default:
            return state
    }
}