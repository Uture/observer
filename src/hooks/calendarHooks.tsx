import React, { useEffect, useState } from 'react';
import * as ExpoCalendar from 'expo-calendar'
import store from '@redux/store'
import { setVisits } from '@redux/actionCreators'
import Visit from '@data/visit'

export const useLocalCalendars = (Component: any) => {
  return (props: any) =>  {
    const calendars = getLocalCalendars()
    return <Component calendars={calendars} {...props} />
  }
}

function getLocalCalendars(): ExpoCalendar.Calendar[] {

  const [calendars, setCalendars] = useState<ExpoCalendar.Calendar[]>([]);

  useEffect(() => {
    (async () => {
      const { status } = await ExpoCalendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await ExpoCalendar.getCalendarsAsync();
        setCalendars(calendars)
      }
    })();
  }, []);

  return calendars;
 
}

export async function importEvents(calendarId: string, startDate: Date, endDate: Date) {
  console.log('using calendar id: '+calendarId)
  await ExpoCalendar.getEventsAsync([calendarId], startDate, endDate).then((events: ExpoCalendar.Event[]) => {
    console.log('found '+events.length+' events')
    const visits = events.map((value, index) => {
      let visit = new Visit(value.id, value.startDate, value.endDate, value.title, false)
      console.log('title '+visit.title)
      return visit
    })
    store.dispatch(setVisits(visits))
    console.log('events imported')
  }).catch(error => { console.log(error) })
}