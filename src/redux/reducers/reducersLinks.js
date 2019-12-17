import * as types from './../types'
import { message } from 'antd'

const initialState = {
    isLoad: true,
    status: null,
    failed: false,
    link: []
}

export default function reducersLinks(state = initialState, action){
    switch(action.type){
        case `${types.GET_QUERY_LINKS}_PENDING`:
            return {
                ...state,
                isLoad: true
            }
        case `${types.GET_QUERY_LINKS}_FULFILLED`:
            return {
                ...state,
                isLoad: false,
                link: action.payload.data.item
            }
        case `${types.GET_QUERY_LINKS}_REJECTED`:
            message.error(action.payload.message)
            return {
                ...state,
                isLoad: false,
                status: 404
            }
        case `${types.ADD_QUERY_LINKS}_PENDING`:
            return {
                ...state,
                isLoad: true,
            }
        case `${types.ADD_QUERY_LINKS}_FULFILLED`:
                switch(action.payload.data.code){
                    case 200:
                        message.success('Success')
                    break;
                    case 404:
                        message.error('Not Found, Failed')
                    break;
                    case 500:
                        message.error('Bad Request, Server Error')
                    break;
                }
            return {
                ...state,
                isLoad: false
            }
        case `${types.ADD_QUERY_LINKS}_REJECTED`:
                message.error(action.payload.message)
            return {
                ...state,
                isLoad: false,
                status: 404,
                data: action.payload.message
            }
        case `${types.EDIT_QUERY_LINKS}_PENDING`:
            return {
                ...state,
                isLoad: true,
            }
        case `${types.EDIT_QUERY_LINKS}_FULFILLED`:
                switch(action.payload.data.code){
                    case 201:
                        message.success('Success')
                    break;
                    case 404:
                        message.error('Not Found, Failed')
                    break;
                    case 500:
                        message.error('Bad Request, Server Error')
                    break;
                }
            return {
                ...state,
                isLoad: false
            }
        case `${types.EDIT_QUERY_LINKS}_REJECTED`:
            message.error(action.payload.message)
            return {
                ...state,
                isLoad: false,
                status: action.payload.data.code,
                data: action.payload.message
            }
        case `${types.DELETE_QUERY_LINKS}_PENDING`:
            return {
                ...state,
                isLoad: true
            }
        case `${types.DELETE_QUERY_LINKS}_FULFILLED`:
                switch(action.payload.data.code){
                    case 201:
                        message.success('Success')
                    break;
                    case 404:
                        message.error('Not Found, Failed')
                    break;
                    case 500:
                        message.error('Bad Request, Server Error')
                    break;
                }
            return {
                ...state,
                isLoad: false
            }
        case `${types.DELETE_QUERY_LINKS}_REJECTED`:
            message.error(action.payload.message)
            return {
                ...state,
                isLoad: false,
                status: 404,
                data: action.payload.message
            }
        case `${types.REDIRECT_QUERY_LINKS}_PENDING`:
            return {
                ...state,
                isLoad: true
            }
        case `${types.REDIRECT_QUERY_LINKS}_FULFILLED`:
                switch(action.payload.data.code){
                    case 201:
                        message.success('Success')
                    break;
                    case 203:
                        message.info('Failed')
                    break;
                    case 404:
                        message.error('Not Found, Failed')
                    break;
                    case 500:
                        message.error('Bad Request, Server Error')
                    break;
                }
            return {
                ...state,
                isLoad: false
            }
        case `${types.REDIRECT_QUERY_LINKS}_REJECTED`:
            message.error(action.payload.message)
            return {
                ...state,
                isLoad: false,
                status: action.payload.data.code,
                data: action.payload.message
            }
        default :
            return state
    }
}