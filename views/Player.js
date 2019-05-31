import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  SectionList
} from "react-native";
import axios from "axios";
import { ListItem, Avatar } from "react-native-elements";

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
    const overrideRenderItem = ({ item, index, section: { title, data } }) => (
      <Text key={index}>Override{item}</Text>
    );

    console.log(playerData);
    return (
      <ScrollView contentContainerStyle={styles.MainContainer}>
        <Text style={styles.text}>#{playerData.number}</Text>
        <Image source={{ uri: playerData.image }} style={styles.playerImage} />
        <Text style={styles.text}>{playerData.name}</Text>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: "center"
  },
  text: {
    marginTop: 30,
    fontSize: 30,
    color: "black",
    fontWeight: "bold",
    alignItems: "center"
  },
  playerImage: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    borderColor: "black",
    borderWidth: 2
  }
});

export default Player;
