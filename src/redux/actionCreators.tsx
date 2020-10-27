import Visit from '@data/visit'

// Action Types
export const SET_EVENTS = 'SET_EVENTS'

// Action Creators
export function setVisits(events: Visit[]) {
  return {
    type: SET_EVENTS,
    events 
  }
}