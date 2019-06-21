import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  ActivityIndicator
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
    teams: [],
    loading: false
  };
  getTeams() {
    this.setState({loading: true});
    axios
      .get("https://ludis.herokuapp.com/api/teams")
      .then(res => {
        // handle success
        if (res.data) {
          this.setState({teams: res.data});
          this.setState({loading: false})  
        }
      })
      .catch(error => {
        // handle error
        console.log(JSON.stringify(error));
      });
  }
  render() {
    const { navigate } = this.props.navigation;
    const { teams } = this.state;
    const { loading } = this.state;

    let display;

    if (loading) {
      display = <ActivityIndicator size="large" color="#17408B" animating={loading} />
    } else {
      display = 
        <ScrollView>
          {teams.map((item, i) => (
            <ListItem
              key={i}
              title={item.fullName}
              leftAvatar={{ source: { uri: item.logoPng } }}
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
    }

    return (display);
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