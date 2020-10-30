import ExternalVisit from '@data/entity/externalVisit'
import Pet from '@data/entity/pet'

// Action Types
export const SET_EXTERNAL_VISITS = 'SET_EXTERNAL_VISITS'
export const SET_PETS = 'SET_PETS'

// Action Creators
export function setExternalVisits(events: ExternalVisit[]) {
  return {
    type: SET_EXTERNAL_VISITS,
    events
  }
}

export function setPets(pets: Pet[]) {
  return {
    type: SET_PETS,
    pets
  }
}