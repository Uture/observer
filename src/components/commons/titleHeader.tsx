import React from 'react'
import { View, Text} from 'react-native'
import { common } from '@styles/commonStyle'
import { Ionicons } from '@expo/vector-icons'
import { colors, others } from '@constants/constants' 

type TitleHeaderProps = {
  title: string,
  iconName: string
} 

const TitleHeader = (props: TitleHeaderProps) => {
  const { title, iconName } = props

  return (
    <View style={common.titleContainer}>
      <Ionicons name={iconName} style={common.titleIcon} color={colors.TITLE_COLOR} size={others.TITLE_ICON_SIZE}></Ionicons>
      <Text style={common.title}>{props.title}</Text>
    </View>
  )
} 

export default TitleHeader