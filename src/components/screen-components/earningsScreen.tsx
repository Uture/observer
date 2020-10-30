import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { allPetsSelector } from '@redux/selectors'
import Pet from '@data/entity/pet'

function EarningsScreen() {

  const pets: Pet[] = useSelector(allPetsSelector)

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {
        pets.map((pet: Pet, index:number) => {
          return (<Text key={pet.id}>{pet.name} is his name!</Text>)
        })
      }
    </View>
  )
}

export default EarningsScreen