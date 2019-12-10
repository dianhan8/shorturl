import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import reducers from './reducers'
import middleware from './middleware'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

export default function configureStore(preloadedState) {
    const store = createStore(
        reducers(history), // root reducer with router state
        preloadedState,
        compose(
            applyMiddleware(
                routerMiddleware(history), // for dispatching history actions
                ...middleware
            ),
        ),
    )
    if (module.hot) {
        module.hot.accept('./reducers', () => {
            store.replaceReducer(reducers(history))
        })
    }
    return store
}