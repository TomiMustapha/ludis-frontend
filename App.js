import React from "react";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./views/HomeScreen";
import Roster from "./views/Roster";
import Scores from "./views/Scores"
import Axios from "axios";
import { Ionicons } from '@expo/vector-icons';

import { createStackNavigator, createAppContainer,createBottomTabNavigator } from "react-navigation";

const RosterNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Roster: { screen: Roster },
});

const ScoresNavigator = createStackNavigator({
  Home: { screen: Scores },
});

const MainNavigator = createBottomTabNavigator(
  {
    Roster:RosterNavigator,
    Scores: ScoresNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }

);

const App = createAppContainer(MainNavigator);

export default App;
