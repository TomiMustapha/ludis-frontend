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
import { ListItem, Image } from "react-native-elements";
import SvgUri from "react-native-svg-uri";

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      title: "Teams",
      headerStyle: {
        backgroundColor: "#17408B",
        borderBottomColor: "white",
        borderBottomWidth: 1,
      },
      headerTitleStyle: {
        color: 'white'
      }
    };
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
            leftAvatar={
              <Image
                source={{
                  uri:
                    "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203458.png"
                }}
              />
            }
            onPress={() =>
              navigate("Roster", {
                title: item.nickname + " Roster",
                teamId: item.teamId
              })
            }
            chevron
            chevronColor="#17408B"
            containerStyle={styles.MainContainer}
          />
        ))}
      </ScrollView>
    );
  }
}
export default HomeScreen;

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: "#DEDEDE"
  },
  text: {
    marginTop: 30,
    fontSize: 30,
    color: "black",
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