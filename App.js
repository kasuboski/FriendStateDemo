import React from 'react';

import { StackNavigator } from 'react-navigation';

import StateScreen from './views/StateScreen';
import AddStateScreen from './views/AddStateScreen';

const RootNavigator = StackNavigator({
  State: {
    screen: StateScreen,
    navigationOptions: {
      header: null,
    },
  },
  AddState: {
    screen: AddStateScreen,
    navigationOptions: {
      headerTitle: 'Add State'
    }
  }
});

export default RootNavigator;