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
import DatePicker from 'react-native-datepicker';

class Scores extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    const { params = {} } = navigation.state
    return {
      title: "Scores",
      headerStyle: {
        backgroundColor: "#17408B",
        borderBottomColor: "white",
        borderBottomWidth: 1,
      },
      headerTitleStyle: {
        color: 'white'
      },
      headerRight:
      (
        <DatePicker
          style={{alignItems: "flex-end"}}
          hideText="true"
          format="YYYYMMDD" 
          mode="date" 
          androidMode="spinner"
          maxDate={new Date()}
          iconComponent={<Icon name="date-range" type="material" color="white" iconStyle={{marginRight: 10}}/>}
          onDateChange={(date) => params.selectDate(date)}
        />
      )
    };
  };
  componentWillMount() {
    this.props.navigation.setParams({ selectDate: this._selectDate })

    var todayDate = new Date();
    this.state.date = this.formatDefaultDate(todayDate);

    this.getScores();
  }
  constructor(props) {
    super(props);
  }
  _selectDate = (date) => {
    this.setState({date: date})
    this.getScores();
  }
  formatDefaultDate(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();

    if (d < 10) {
      d = '0' + d;
    }

    if (m < 10) {
      m = '0' + m;
    }

    return y + m + d;
  }
  state = {
    date: '',
    scores: [],
    loading: false
  };
  getScores() {
    this.setState({loading: true});
    axios
      .get("https://ludis.herokuapp.com/api/score/?gameDate=" + this.state.date)
      .then(res => {
        // handle success
        if (res.data) {
          this.setState({scores: res.data});
          this.setState({loading: false});
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
    const { scores } = this.state;
    const { loading } = this.state;

    let display;

    if (loading) {
      display =
        <View style={ {flex: 1, justifyContent: "center", backgroundColor: "#DEDEDE" } }>
          <ActivityIndicator size="large" color="#17408B" animating={loading}/>
        </View>
    } else {
      if (scores.length == 0) {
        display =
          <View style={{flex: 1, justifyContent: "center", backgroundColor: "#DEDEDE", alignItems: "center"}}>
            <Text>No games at given date.</Text>
          </View>
      } else {
        display =
          <ScrollView style={{backgroundColor: "#DEDEDE"}}>
            {scores.map((item, i) => (
              <ListItem contentContainerStyle={{justifyContent: "center", alignItems: "center"}}
                key={i}
                title = {<Text style={styles.text} >{item.hTeam.score + " - " + item.vTeam.score}</Text>}
                leftElement = {<Text>{item.hTeam.triCode}</Text>}
                rightElement = {<Text>{item.vTeam.triCode}</Text>}
                subtitle = {item.playoff == true ? item.hTeam.series + ' - ' + item.vTeam.series : ''}
                leftAvatar={
                  <Avatar
                    size = "medium"
                    source = {{ uri: item.hTeam.logoPng }}
                    placeholderStyle= {{ backgroundColor: "#DEDEDE"}}
                    onPress={() =>
                      navigate("Roster", {
                        title: item.hTeam.triCode + " Roster",
                        teamId: item.hTeam.teamId
                      })
                    }
                  />
                }
                rightAvatar={
                  <Avatar
                    size = "medium"
                    source = {{ uri: item.vTeam.logoPng }}
                    placeholderStyle= {{ backgroundColor: "#DEDEDE"}}
                    onPress={() =>
                      navigate("Roster", {
                        title: item.vTeam.triCode + " Roster",
                        teamId: item.vTeam.teamId
                      })
                    }
                  />
                }
                containerStyle={styles.MainContainer}
              />
            ))}
        </ScrollView>
      }
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