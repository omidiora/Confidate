import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// import { MainStackNavigator, ContactStackNavigator } from "./StackNavigator";
import {Home} from '../screens';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
