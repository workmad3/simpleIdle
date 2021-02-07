import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import gameReducer from 'reducers/game'

const reducers = combineReducers({
  game: gameReducer
})

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

export default store
