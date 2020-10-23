import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from '@pretty/common-style';
import CalendarSelectionScreen from '@components/screen-components/calendar-selection-screen';
import TabNavigator from '@components/navigation/tabNavigator'

export default function App() {
  
  return (
      <TabNavigator/>
  );

}
