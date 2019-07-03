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
import { ListItem, Image, Icon, Avatar } from "react-native-elements";
import style from "../styles/style"

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      title: "Teams",
    };
  };
  componentWillMount() {
    this.props.navigation.setParams({
      refresh: this._getTeams
    });
    this.getTeams();
  }
  constructor(props) {
    super(props);
  }
  state = {
    teams: [],
    loading: false
  };
  _getTeams = () => {
    this.getTeams();
  }
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
        this.setState({loading: false});
        console.log(JSON.stringify(error));
      });
  }
  render() {
    const { navigate } = this.props.navigation;
    const { teams } = this.state;
    const { loading } = this.state;

    let display;

    if (loading) {
      display = 
      <View style={ {flex: 1, justifyContent: "center", backgroundColor: "#DEDEDE" } }>
        <ActivityIndicator size="large" color="#17408B" animating={loading}/>
      </View>
    } else {
      display = 
        <ScrollView style={style.base}>
          {teams.map((item, i) => (
            <ListItem
              key={i}
              title={item.fullName}
              leftAvatar={
                <Avatar
                  size = "medium"
                  activeOpacity = {1}
                  source = {{ uri: item.logoPng }}
                  avatarStyle={{backgroundColor: "#DEDEDE"}}
                  onPress={() =>
                    navigate("Roster", {
                      title: item.tricode + " Roster",
                      teamId: item.teamId
                    })
                  }
                />
              }
              onPress={() =>
                navigate("Roster", {
                  title: item.tricode + " Roster",
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
  }
});