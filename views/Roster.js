import React from "react";
import { Button, StyleSheet, Text, View, ScrollView, ActivityIndicator } from "react-native";
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
    players: [],
    loading: false
  };

  getRoster(teamId) {
    this.setState({loading: true});
    axios
      .get("https://ludis.herokuapp.com/api/teamroster", {
        params: {
          teamId: teamId
        }
      })
      .then(res => {
        if (res.data) {
          this.setState({loading: false});
          this.setState({players: res.data});
        }
      })
      .catch(err => {
        console.log("request failed");
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    const { players } = this.state;
    const { loading } = this.state;

    let display;

    if (loading) {
      display = <ActivityIndicator size="large" color="#17408B" animating={loading} />
    } else {
      display =
      <View>
      <ScrollView>
        {players.map((item, i) => (
          <ListItem
            key={i}
            title={item.name}
            leftAvatar={{ source: { uri: item.image } }}
            subtitle= {"#" + item.number + " | " + item.position + " | " + item.height + "\" | " + item.weight }
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
      </View> 
    }

    return(display);
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