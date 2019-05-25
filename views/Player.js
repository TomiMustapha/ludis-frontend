import React from "react";
import { Button, StyleSheet, Text, View, ScrollView } from "react-native";
import axios from "axios";
import { ListItem } from "react-native-elements";

class Player extends React.Component {
  componentWillMount() {}
  constructor(props) {
    super(props);
  }
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      title: `${state.params.title}`
    };
  };
  state = {
    players: []
  };

  render() {
    const { navigate } = this.props.navigation;
    //const { title } = this.navigationOptions;
    const { playerData } = this.props.navigation.state.params;
    console.log(playerData);
    return (
      <View>
        <Text>{JSON.stringify(playerData)}</Text>
      </View>
    );
  }
}
export default Player;
