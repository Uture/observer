import React, { useEffect, useState } from 'react'
import CalendarSelectionScreen from '@components/screen-components/calendar-selection-screen'
import TabNavigator from '@components/navigation/tabNavigator'
import AsyncStorage from '@react-native-community/async-storage'
import { asyncStorageConstants as constants } from '@constants/constants'


export default function App() {
  const [calendarId, setCalendarId] = useState<string|null>(null)

  const fetchCalendarId = async () => {
    try {
      const fetchedCalendarId = await AsyncStorage.getItem(constants.CALENDAR_ID_KEY)
      console.log('fetched id:'+fetchedCalendarId)
      setCalendarId(fetchedCalendarId)
    } catch(e) {
    }
  }

  fetchCalendarId()
  
  const entryPoint = calendarId == null ? <CalendarSelectionScreen/> : <TabNavigator/>
  return entryPoint
}
