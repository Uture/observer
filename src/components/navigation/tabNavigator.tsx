import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import EarningsScreen from '@components/screen-components/earningsScreen'
import VisitsScreen from '@components/screen-components/visitsScreen'

const Tab = createBottomTabNavigator()
function TabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string

            if (route.name === 'Visits') {
              iconName = 'md-paw'
            } else if (route.name === 'Earnings') {
              iconName = 'logo-euro'
            } else {
              iconName = ''
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
          <Tab.Screen name="Visits" component={VisitsScreen} />
          <Tab.Screen name="Earnings" component={EarningsScreen} />
        </Tab.Navigator>
    </NavigationContainer>
  )
}

export default TabNavigator