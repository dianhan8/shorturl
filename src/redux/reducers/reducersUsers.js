import * as types from './../types'
import { message } from 'antd'

const initialState = {
    isLoad: true,
    status: null,
    failed: false,
    users: ''
}

export default function reducersUsers(state = initialState, action) {
    switch (action.type) {
        case `${types.LOGIN}_PENDING`:
            return {
                ...state,
                isLoad: true
            }
        case `${types.LOGIN}_FULFILLED`:
            return {
                ...state,
                isLoad: false,
                status: action.payload.data.code,
                data: action.payload.data
            }
        case `${types.LOGIN}_REJECTED`:
            return {
                ...state,
                isLoad: false,
                status: 404,
                data: action.payload.message
            }
        case `${types.REGISTER}_PENDING`:
            return {
                ...state,
                isLoad: true
            }
        case `${types.REGISTER}_FULFILLED`:
            return {
                ...state,
                isLoad: false,
                status: action.payload.data.code,
                data: action.payload.data
            }
        case `${types.REGISTER}_REJECTED`:
            return {
                ...state,
                isLoad: false,
                status: 404,
                data: action.payload.message
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