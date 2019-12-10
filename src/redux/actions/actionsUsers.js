import * as types from './../types'
import { HOST } from './../../component/Host'
import jwt from 'jsonwebtoken'
import axios from 'axios'

export const handleLogin = (params) => ({
    type: types.LOGIN,
    payload: axios(`${HOST}/api/login/v1`,{
        method: 'POST',
        data: {email: params.email,password: params.password}
    })
})

export const handleRegister = (params) => ({
    type: types.REGISTER,
    payload: axios(`${HOST}/api/register/v1`,{
        method: 'POST',
        data: {
            email: params.email,
            name: params.name,
            password: params.password,
            phonenumber: params.phonenumber
        }
    })
})

export const getUserFromToken = () => ({
    type: types.GET_TOKEN,
    payload: jwt.decode(localStorage.getItem('token'))
})