import { combineReducers } from 'redux'
import { List, Map } from 'immutable'

function posts(state = List(), action) {
  switch (action.type) {
    case 'ADD_POST':
      return state.push(Map({ id: Math.random().toString(36).substr(0, 2), test: action.text }))
    default:
      return state
  }
}

export default combineReducers({
  posts
})
