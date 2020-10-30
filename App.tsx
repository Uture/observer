import React, { useEffect, useState, useRef } from 'react'
import CalendarSelectionScreen from '@components/screen-components/calendar-selection-screen'
import TabNavigator from '@components/navigation/tabNavigator'
import AsyncStorage from '@react-native-community/async-storage'
import { asyncStorageConstants as constants } from '@constants/constants'
import { Provider, useDispatch } from 'react-redux'
import store from '@redux/store'
import { importEvents } from '@hooks/calendarHooks'
import db from '@data/sqlite-facade'
import ExternalVisit from '@data/entity/externalVisit'
import Pet from '@data/entity/pet'
import { setPets, setExternalVisits } from '@redux/actionCreators'

const AppWrapper = () => {

  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

function App() {
  const [calendarId, setCalendarId] = useState<string|null>(null)

  const dispatch = useDispatch()

  // on App load, initialize local SQLite db
  useEffect(() => {
    db.initializeDB(() => db.createDummyData(() => db.selectAllPets((rows: Array<any>) => {
      const pets: Pet[] = rows.map((row: any, index: number) => {
        const pet = new Pet(
          row.id, row.name, row.owner_name, row.phone_number, row.address,
          row.emergency_name, row.emergency_phone_number, row.emergency_address
        )
        return pet
      })
      dispatch(setPets(pets))
    })))
  }, [])

  // fetch calendarId from AsyncStorage if one exists and update State 
  useEffect(() => {
    let isMounted = true
    async function fetchCalendarAsync() {
      const fetchedCalendarId = await AsyncStorage.getItem(constants.CALENDAR_ID_KEY)
      if(isMounted) {
        console.log('fetched id:'+fetchedCalendarId)
        setCalendarId(fetchedCalendarId)
      }
    }
    fetchCalendarAsync()

    return () => { isMounted = false }
  }, [])

  // when calendarId is set, fetch all events for today
  useEffect(() => {
    if(calendarId != null) {
      const startDate = new Date()
      startDate.setHours(0)
      const endDate = new Date()
      endDate.setHours(24)
      importEvents(calendarId, startDate, endDate, (visits: ExternalVisit[]) => dispatch(setExternalVisits(visits)))
    }
  }, [calendarId])

  // define callback for setting current calendarId by choosing from local calendar list
  const onCalendarChosen = async (calendarId: string) => {
    let isMounted = true
    try {
      await AsyncStorage.setItem(constants.CALENDAR_ID_KEY, calendarId).then(() => {
        if(isMounted) {
          setCalendarId(calendarId)
        }
      })
      isMounted = false
    } catch(e) {}
  }

  const entryPoint = calendarId == null ? <CalendarSelectionScreen onSelect={onCalendarChosen}/> : <TabNavigator/>

  return (
    <Provider store={store}>
      { entryPoint }
    </Provider>
  )
}

export default AppWrapper
