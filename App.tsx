import React, { useEffect, useState, useRef } from 'react'
import CalendarSelectionScreen from '@components/screen-components/calendar-selection-screen'
import TabNavigator from '@components/navigation/tabNavigator'
import AsyncStorage from '@react-native-community/async-storage'
import { asyncStorageConstants as constants } from '@constants/constants'
import { Provider } from 'react-redux'
import store from '@redux/store'
import { importEvents } from '@hooks/calendarHooks'
import * as ExpoCalendar from 'expo-calendar'

export default function App() {
  const [calendarId, setCalendarId] = useState<string|null>(null)

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
  })

  useEffect(() => {
    if(calendarId != null) {
      const startDate = new Date()
      startDate.setHours(0)
      const endDate = new Date()
      endDate.setHours(24)
      importEvents(calendarId, startDate, endDate)
    }
  }, [calendarId])

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
