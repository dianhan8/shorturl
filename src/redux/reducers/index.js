import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import reducersUsers from './reducersUsers'
import reducersLinks from './reducersLinks'

const appReducers = (history) => combineReducers({
    links: reducersLinks,
    users: reducersUsers,
    router: connectRouter(history)
})

export default appReducers