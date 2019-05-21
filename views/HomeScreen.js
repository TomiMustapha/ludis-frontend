import React from "react";
import { Button, StyleSheet, Text, View, FlatList } from "react-native";
import Roster from "./Roster";
import Axios from "axios";
import {ListItem}  from 'react-native-elements'


class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Teams"
  };
  render() {
    const { navigate } = this.props.navigation;
    const list = [
      {
        title: 'Houston Rockets',
        avatar_url: 'https://i.pinimg.com/originals/da/db/db/dadbdb0c5775a80af7b9714a31eda1dd.jpg'
      },
      {
        title: 'Toronto Raptors',
        avatar_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/36/Toronto_Raptors_logo.svg/1200px-Toronto_Raptors_logo.svg.png'
      },
    ]

    
    return (
      <View>
      {
        list.map((item, i) => (
          <ListItem
            key={i}
            title={item.title}
            leftAvatar={{ source:{uri: item.avatar_url } }}
            onPress={() => navigate("Roster", { title: item.title + " Roster" })}
            rightIcon={{ name: 'arrow-right', type: 'font-awesome'}}
          />
        ))
      }
      </View>

    );
  }
}
export default HomeScreen;
