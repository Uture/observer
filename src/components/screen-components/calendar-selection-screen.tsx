import React, { Component, useEffect } from 'react'
import * as ExpoCalendar from 'expo-calendar'
import { TouchableOpacity, View, Text, ScrollView } from 'react-native'
import { common } from '@styles/commonStyle'
import { useLocalCalendars } from '@hooks/calendarHooks'

interface Props {
  calendars: ExpoCalendar.Calendar[],
  onSelect: Function
}
interface State {}

class CalendarSelectionScreen extends Component<Props, State> {
  
  render() {
    return (
    <ScrollView>
      {
        this.props.calendars.map((item: ExpoCalendar.Calendar, index: number) => {
          return <TouchableOpacity
            key={item.id}
            style={common.listItem}
            onPress={() => this.props.onSelect(item.id)}>
              <Text style={{color: 'black'}}>{'Calendar: '+item.name}</Text>
            </TouchableOpacity>
        })
      }
    </ScrollView>
    )
  }

}

export default useLocalCalendars(CalendarSelectionScreen)