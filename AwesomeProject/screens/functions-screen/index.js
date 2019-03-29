import React from "react";
import { Image, TouchableOpacity, FlatList, View, Alert } from "react-native";

import styles from "./styles";
import doorImage from "../../assets/icons/oponedDoor.png";
import messageImage from "../../assets/icons/message.png";
import cameraImage from "../../assets/icons/camera.png";

export default class HouseScreen extends React.Component {
  static navigationOptions = {
    title: "Smart House"
  };

  constructor(props) {
    super(props);

    this.state = {
      GridListItems: [
        { key: <Image source={doorImage} style={styles.imageDoor} /> },
        { key: <Image source={doorImage} style={styles.imageDoor} /> },
        { key: <Image source={cameraImage} style={styles.imageDoor} /> },
        { key: <Image source={messageImage} style={styles.imageMessage} /> }
      ]
    };
  }

  _onPressItem = () => {
    Alert.alert("Nothing yet! :D");
  };

  _renderItem = ({ item, index }) => {
    if (((index * 2) / 3) % 2 == 0) {
      return (
        <View>
          <TouchableOpacity
            onPress={this._onPressItem}
            style={styles.GridViewContainer}
          >
            {item.key}
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
          <TouchableOpacity
            onPress={this._onPressItem}
            style={styles.GridViewContainer2}
          >
            {item.key}
          </TouchableOpacity>
        </View>
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={this.state.GridListItems}
            renderItem={this._renderItem}
            numColumns={2}
          />
        </View>
      </View>
    );
  }
}
