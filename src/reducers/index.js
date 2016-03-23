import { combineReducers } from 'redux'
import _ from 'lodash'

function posts(state = [], action) {
  switch (action.type) {
    case 'ADD_POST':
      return [...state, action.post]
    default:
      return state
  }
}

export default combineReducers({
  posts
})
