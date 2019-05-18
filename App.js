import React from "react";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./views/HomeScreen";
import Roster from "./views/Roster";
import Axios from "axios";

import { createStackNavigator, createAppContainer } from "react-navigation";

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Roster: { screen: Roster }
});

const App = createAppContainer(MainNavigator);

export default App;
