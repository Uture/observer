import React, { useEffect, useState, useRef } from 'react'
import CalendarSelectionScreen from '@components/screen-components/calendar-selection-screen'
import TabNavigator from '@components/navigation/tabNavigator'
import AsyncStorage from '@react-native-community/async-storage'
import { asyncStorageConstants as constants } from '@constants/constants'


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
    return () => { isMounted = false}
  }, [setCalendarId])

  const onCalendarChosen = async (calendarId: string) => {
    try {
      await AsyncStorage.setItem(constants.CALENDAR_ID_KEY, calendarId).then(() => {
        setCalendarId(calendarId)
      })
    } catch(e) {}
  }
  
  const entryPoint = calendarId == null ? <CalendarSelectionScreen onSelect={onCalendarChosen}/> : <TabNavigator/>
  return entryPoint
}
