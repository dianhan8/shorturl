import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import reducersUsers from './reducersUsers'

const appReducers = (history) => combineReducers({
    users: reducersUsers,
    router: connectRouter(history)
})

export default appReducers