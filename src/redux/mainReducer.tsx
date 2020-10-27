import { createStore } from 'redux'
import { SET_EVENTS } from '@redux/actionCreators'

const initialState = {
  currentCalendarId: null,
  currentVisits: []
}

export default function mainReducer(state = initialState, action: any) {
  switch(action.type) {
    case SET_EVENTS: 
    console.log('putting events into store')
    return {
      ...state,
      currentVisits:  action.events
    }
    default: return state
  }
} 