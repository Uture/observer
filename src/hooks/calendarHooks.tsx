import React, { useEffect, useState } from 'react';
import * as ExpoCalendar from 'expo-calendar'
import ExternalVisit from '@data/entity/externalVisit'

export const useLocalCalendars = (Component: any) => {
  return (props: any) => {
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

export async function importEvents(calendarId: string, startDate: Date, endDate: Date, callback: Function) {
  await ExpoCalendar.getEventsAsync([calendarId], startDate, endDate).then((events: ExpoCalendar.Event[]) => {
    const visits = events.map((value, index) => {
      let visit = new ExternalVisit(value.id, value.title, value.startDate, value.endDate)
      return visit
    })
    callback(visits)
  }).catch(error => { console.log(error) })
}