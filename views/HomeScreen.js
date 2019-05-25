import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView
} from "react-native";
import Roster from "./Roster";
import axios from "axios";
import { ListItem } from "react-native-elements";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Teams"
  };
  componentWillMount() {
    this.getTeams();
  }
  constructor(props) {
    super(props);
  }
  state = {
    teams: []
  };
  getTeams() {
    axios
      .get("https://ludis.herokuapp.com/api/teams")
      .then(res => {
        // handle success
        this.setState((this.state.teams = res.data));
        console.log(res.data);
      })
      .catch(error => {
        // handle error
        console.log(JSON.stringify(error));
      });
  }
  render() {
    const { navigate } = this.props.navigation;
    const { teams } = this.state;
    return (
      <ScrollView>
        {teams.map((item, i) => (
          <ListItem
            key={i}
            title={item.fullName}
            //leftAvatar={{ source: { uri: item.avatar_url } }}
            onPress={() =>
              navigate("Roster", {
                title: item.nickname + " Roster",
                teamId: item.teamId
              })
            }
            //rightIcon={{ name: "arrow-right", type: "font-awesome" }}
          />
        ))}
      </ScrollView>
    );
  }
}
export default HomeScreen;
