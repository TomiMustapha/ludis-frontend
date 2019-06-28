import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import HomeScreen from "./views/HomeScreen";
import Roster from "./views/Roster";
import Scores from "./views/Scores"
import Axios from "axios";

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
    Rosters:RosterNavigator,
    Scores: ScoresNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Rosters') {
          iconName = 'people';
        } else if (routeName === 'Scores') {
          iconName = 'tv';
        }

        return <Icon name={iconName} type="material" size={25} color={tintColor} iconStyle={{marginTop: 10, alignItems: 'center'}} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: "#17408B",
      inactiveTintColor: 'gray',
    }
  }

);

const App = createAppContainer(MainNavigator);

export default App;
