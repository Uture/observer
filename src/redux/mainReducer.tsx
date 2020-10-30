import { createStore } from 'redux'
import { SET_EXTERNAL_VISITS, SET_PETS } from '@redux/actionCreators'

const initialState = {
  currentCalendarId: null,
  externalVisits: [],
  visits: [],
  pets: []
}

export default function mainReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_EXTERNAL_VISITS:
      return {
        ...state,
        externalVisits: action.events
      }
    case SET_PETS:
      return {
        ...state,
        pets: action.pets
      }
    default: return state
  }
} 