import * as React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useStore } from 'react-redux'
import Visit from '@data/visit'

function VisitsScreen() {
  const store = useStore()
  const { currentVisits } = store.getState()
  console.log('current events:')
  console.log(currentVisits)

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>What visits wait for me today?</Text>
      <ScrollView>
        {
          currentVisits.map((item: Visit, index: number) => {
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