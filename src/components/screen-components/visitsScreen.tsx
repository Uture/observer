import React from 'react'
import { View, Text, ScrollView, SafeAreaView } from 'react-native'
import { useSelector } from 'react-redux'
import ExternalVisit from '@data/entity/externalVisit'
import { allExternalVisitsSelector } from '@redux/selectors'
import { common, visitsScreen} from '@styles/commonStyle'
import { strings, colors, others } from '@constants/constants'
import { Ionicons } from '@expo/vector-icons';

function VisitsScreen() {
  const externalVisits: ExternalVisit[] = useSelector(allExternalVisitsSelector)

  return (
    <SafeAreaView style={common.container}>
      <View style={common.titleContainer}>
        <Ionicons name='md-calendar' style={common.titleIcon} color={colors.TITLE_COLOR} size={others.TITLE_ICON_SIZE}></Ionicons>
        <Text style={common.title}>{strings.VISITS_SCREEN_TITLE}</Text>
      </View>
      <View style={visitsScreen.dateIndicatorContainer}>
        <Text style={visitsScreen.dateIndicatorText}>30.Oktober, 2020</Text>
      </View>
      <ScrollView style={visitsScreen.listContainer}>
        {
          externalVisits.map((item: ExternalVisit, index: number) => {
            return (
              <Text key={ item.id }>{ item.title }</Text>
            )
          })
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default VisitsScreen