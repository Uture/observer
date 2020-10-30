import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import ExternalVisit from '@data/entity/externalVisit'
import { allExternalVisitsSelector } from '@redux/selectors'

function VisitsScreen() {
  const externalVisits: ExternalVisit[] = useSelector(allExternalVisitsSelector)

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>What visits wait for me today?</Text>
      <ScrollView>
        {
          externalVisits.map((item: ExternalVisit, index: number) => {
            return (
              <Text key={ item.id }>{ item.title }</Text>
            )
          })
        }
      </ScrollView>
    </View>
  )
}

export default VisitsScreen