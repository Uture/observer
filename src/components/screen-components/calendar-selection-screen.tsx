import React, { Component, useEffect } from 'react'
import * as ExpoCalendar from 'expo-calendar'
import { TouchableOpacity, View, Text } from 'react-native'
import styles from '@styles/commonStyle'
import { useLocalCalendars } from '@hooks/calendarHooks'

interface Props {
  calendars: ExpoCalendar.Calendar[]
}
interface State {}

class CalendarSelectionScreen extends Component<Props, State> {
  
  render() {
    return (
    <View>
      {
        this.props.calendars.map((item: ExpoCalendar.Calendar, index: number) => {
          return <TouchableOpacity
            key={item.id}
            style={styles.listItem}
            onPress={() => this.onCalendarSelected(item.id)}>
              <Text style={{color: 'black'}}>{'Calendar: '+item.name}</Text>
            </TouchableOpacity>
        })
      }
    </View>
    )
  }

  onCalendarSelected(calendarId: string) {

  }

}

export default useLocalCalendars(CalendarSelectionScreen)