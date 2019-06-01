import React from "react";
import { Button, StyleSheet, Text, View, ScrollView } from "react-native";
import axios from "axios";
import { ListItem } from "react-native-elements";

class Roster extends React.Component {
  componentWillMount() {
    this.getRoster(this.props.navigation.state.params.teamId);
  }

  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      title: `${state.params.title}`,
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

  state = {
    players: []
  };

  getRoster(teamId) {
    console.log(teamId);
    axios
      .get("https://ludis.herokuapp.com/api/teamroster", {
        params: {
          teamId: teamId
        }
      })
      .then(res => {
        if (res.data) {
          this.setState((this.state.players = res.data));
          console.log(res.data);
        }
      })
      .catch(err => {
        console.log("request failed");
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    const { players } = this.state;
    return (
      <ScrollView>
        {players.map((item, i) => (
          <ListItem
            key={i}
            title={item.name}
            leftAvatar={{ source: { uri: item.image } }}
            onPress={() =>
              navigate("Player", {
                title: item.name,
                playerData: item
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
export default Roster;

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