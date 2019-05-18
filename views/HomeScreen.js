import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Roster from "./Roster";
import Axios from "axios";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Teams"
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Button
        title="View Rockets Roster"
        onPress={() => navigate("Roster", { title: "Rockets" })}
      />
    );
  }
}
export default HomeScreen;
