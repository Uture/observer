import React from 'react'
import { View, Text, ScrollView, SafeAreaView } from 'react-native'
import { useSelector } from 'react-redux'
import ExternalVisit from '@data/entity/externalVisit'
import { allExternalVisitsSelector } from '@redux/selectors'
import { common, visitsScreen} from '@styles/commonStyle'
import { strings, colors, others } from '@constants/constants'
import { Ionicons } from '@expo/vector-icons';
import TitleHeader from '@components/commons/titleHeader' 

function VisitsScreen() {
  const externalVisits: ExternalVisit[] = useSelector(allExternalVisitsSelector)

  return (
    <SafeAreaView style={common.container}>
      <TitleHeader title={strings.VISITS_SCREEN_TITLE} iconName='md-calendar'></TitleHeader>
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