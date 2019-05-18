import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import axios from "axios";

class Roster extends React.Component {
  componentWillMount() {
    this.getRoster();
  }
  constructor(props) {
    super(props);
  }
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      title: `${state.params.title}`
    };
  };

  //backend call currently doesn't work if not on the same wifi
  getRoster() {
    axios
      .get("https://www.google.com/")
      .then(res => {
        if (res.data) {
          console.log("request succeeded");
          //this.setState((this.state.roster = "Request returned"));
        }
      })
      .catch(err => {
        console.log("request failed");
        //this.setState((this.state.roster = "Request failed"));
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button title="Placholder" onPress={() => this.getRoster()} />
      </View>
    );
  }
}
export default Roster;
