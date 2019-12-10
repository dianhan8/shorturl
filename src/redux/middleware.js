import {createLogger} from 'redux-logger'
import promise from 'redux-promise-middleware'


const middleware = []
middleware.push(createLogger())
middleware.push(promise)

export default middleware