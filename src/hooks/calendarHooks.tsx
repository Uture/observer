import React, { useEffect, useState } from 'react';
import * as ExpoCalendar from 'expo-calendar'

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
