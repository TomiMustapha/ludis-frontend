import React from "react";
import { Icon } from "react-native-elements";
import HomeScreen from "./views/HomeScreen";
import Roster from "./views/Roster";
import Scores from "./views/Scores"
import style from "./styles/style";

import { createStackNavigator, createAppContainer,createBottomTabNavigator } from "react-navigation";

const RosterNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Roster: { screen: Roster },
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    headerStyle: style.header,
    headerTitleStyle: style.headerTitle,
    headerTintColor: "white",
    headerRight:
    <Icon
        name="refresh"
        type="material"
        color="white"
        underlayColor="#17408B"
        onPress={navigation.getParam('refresh')}
        iconStyle={ {marginRight: 10} }
      />
  }
)});

const ScoresNavigator = createStackNavigator({
  Home: { screen: Scores },
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    title: "Scores",
    headerStyle: style.header,
    headerTitleStyle: style.headerTitle,
    
  })
  }
);

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
