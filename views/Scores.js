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
import { ListItem, Image,DatePickerIOS } from "react-native-elements";
import SvgUri from "react-native-svg-uri";

class Scores extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      title: "Scores",
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
    this.getScores();
  }
  constructor(props) {
    super(props);
  }
  state = {
    teams: [],
    loading: false
  };
  getScores() {
    this.setState({loading: true});
    axios
      .get("https://ludis.herokuapp.com/api/score/?gameDate=20181029")
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
              title = {<Text style={styles.text} >{item.hTeam.score+" - "+ item.hTeam.score}</Text>}
              leftAvatar={
                { source: { uri: item.hTeam.logoPng }, 
                placeholderStyle: { backgroundColor: "#DEDEDE"}
              }}
              rightAvatar={
                { source: { uri: item.vTeam.logoPng }, 
                placeholderStyle: { backgroundColor: "#DEDEDE"}
              }}
            //   onPress={() =>
            //     navigate("Roster", {
            //       title: item.nickname + " Roster",
            //       teamId: item.teamId
            //     })
            //   }
              containerStyle={styles.MainContainer}
            />
          ))}
      </ScrollView>
    }

    return (display);
  }
}
export default Scores;

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: "#DEDEDE",
    alignItems: "center"
  },
  text: {
    fontSize: 30,
    color: "black",
    alignItems: "center",
    justifyContent: "center"
  }
});