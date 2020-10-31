import { StyleSheet } from 'react-native';
import React from "react";
import { colors } from '@constants/constants'

export const common = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.MAIN_BACKGROUND,
  },

  listItem: {
    padding: 15,
    marginTop: 5,
    alignItems: 'center',
    backgroundColor: '#adf'
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 10,
    paddingLeft: 10,
  },
  
  title: {
    fontSize: 18,
    color: colors.TITLE_COLOR,
    fontFamily: 'OpenSans',
  },

  titleIcon: {
    fontSize: 24,
    color: colors.TITLE_COLOR,
    padding: 5
  }

});

export const visitsScreen = {

  listContainer: {
    flex: 1,
    backgroundColor: colors.MAIN_FOREGROUND
  },

  dateIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#357266',
    padding: 15
  },

  dateIndicatorText: {
    color: 'white',
    fontFamily: 'OpenSans-SemiBold'
  }

}