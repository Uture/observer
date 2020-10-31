import React from 'react'
import { View, Text, ScrollView, SafeAreaView } from 'react-native'
import { useSelector } from 'react-redux'
import ExternalVisit from '@data/entity/externalVisit'
import { allExternalVisitsSelector } from '@redux/selectors'
import { common, visitsScreen} from '@styles/commonStyle'
import { strings, colors, others } from '@constants/constants'
import { Ionicons } from '@expo/vector-icons';
import TitleHeader from '@components/commons/titleHeader' 
import moment from 'moment'

type VisitTick = {
  startDate: moment.Moment,
  endDate: moment.Moment
}

function VisitsScreen() {
  const externalVisits: ExternalVisit[] = useSelector(allExternalVisitsSelector)
  const selectedDate = moment().utc(true).startOf('day')

  const ticks: moment.Moment[] = []

  const timelineRange = Array.from({length: 13}, (_, i) => selectedDate.clone().add(i+8, 'hours'))

  timelineRange.forEach((timelineMoment: moment.Moment) => {
    const encompassingVisit = externalVisits.find((visit: ExternalVisit) => {
      if(visit.startDate.isSameOrBefore(timelineMoment) && visit.endDate.isSameOrAfter(timelineMoment)) {
        return visit
      }
    })
    if(!encompassingVisit) {
      ticks.push(timelineMoment)
    }
  })

  externalVisits.forEach((visit: ExternalVisit) => {
    ticks.push(visit.startDate)
    ticks.push(visit.endDate)
  })

  ticks.sort((a: moment.Moment, b: moment.Moment) => {
    if(a.isSame(b)) { return 0 }
    if(a.isAfter(b)) { return 1 }
    return -1
  })

  const visitsContainer = (
    <ScrollView style={{paddingTop: 0, ...visitsScreen.listContainer}}>
      <View style={{position: 'absolute', left: 40, width: 1, height: 1000, backgroundColor: colors.MAIN_BACKGROUND}}></View>
      {
        ticks.map((tick: moment.Moment, index: number) => {
          const marginTop = index == 0 ? 16 : 0
          
          const matchedVisit = externalVisits.find((visit: ExternalVisit, index: number) => {
            return visit.startDate.isSame(tick)
          })

          let visitSlot

          if(matchedVisit) {
            const { startDate, endDate } = matchedVisit
            const slotHeight = 32/60*Math.abs(endDate.diff(startDate, 'minutes'))
            visitSlot = (
              <View style={{marginLeft: 45, height: slotHeight, flex: 1, margin: 5, padding: 10, borderRadius: 10, backgroundColor: colors.VISIT_SLOT_BACKGROUND}}><Text>{matchedVisit.title}</Text></View>
            )
          } else {
            visitSlot = (
              <View style={{marginLeft: 40, height: 32}}></View>
            )
          }

          const timeText = matchedVisit ? matchedVisit.startDate.format('HH:mm') : tick.format('HH:mm')

          const horizontal = (
            <View style={{flexDirection: 'row', marginTop: marginTop, marginLeft: 0, height: 1}}>
              <View style={{position: 'absolute', left: 5, top: -7}}><Text style={{fontSize: 10}}>{timeText}</Text></View>
              <View style={{flex: 1, marginLeft: 35, height: 1, backgroundColor: colors.MAIN_BACKGROUND}}></View>
            </View>
          )
          return [
            horizontal, visitSlot
          ]
        })
      }
    </ScrollView>
  ) 

  return (
    <SafeAreaView style={common.container}>
      <TitleHeader title={strings.VISITS_SCREEN_TITLE} iconName='md-calendar'></TitleHeader>
      <View style={visitsScreen.dateIndicatorContainer}>
        <Text style={visitsScreen.dateIndicatorText}>{ selectedDate.format('D.MMMM, YYYY') }</Text>
      </View>
      { visitsContainer }
    </SafeAreaView>
  )
}

export default VisitsScreen