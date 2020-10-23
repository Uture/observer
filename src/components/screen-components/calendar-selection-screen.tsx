import React, { Component, useEffect } from 'react'
import * as ExpoCalendar from 'expo-calendar'
import { TouchableOpacity, View, Text } from 'react-native'
import styles from '@styles/commonStyle'
import { useLocalCalendars } from '@hooks/calendarHooks'

interface Props {
  calendars: ExpoCalendar.Calendar[],
  onSelect: Function
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
            onPress={() => this.props.onSelect(item.id)}>
              <Text style={{color: 'black'}}>{'Calendar: '+item.name}</Text>
            </TouchableOpacity>
        })
      }
    </View>
    )
  }

}

export default useLocalCalendars(CalendarSelectionScreen)