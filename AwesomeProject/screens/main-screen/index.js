import React from "react";
import { Image, TouchableOpacity, FlatList, View, Alert } from "react-native";

import styles from "./styles";
import optionsImage from "../../assets/icons/options.png";
import houseImage from "../../assets/icons/houseSecurity.png";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home"
  };

  constructor(props) {
    super(props);

    this.state = {
      GridListItems: [
        { key: <Image source={houseImage} style={styles.imageOptions} /> },
        { key: <Image source={optionsImage} style={styles.imageHouse} /> }
      ]
    };
  }

  _onPressHouse = () => {
    this.props.navigation.navigate("HouseControls");
  };

  _onPressOptions = () => {
    Alert.alert("Nothing yet! :D");
  };

  _renderItem = ({ item, index }) => {
    if (index == 0) {
      //house icon
      return (
        <View>
          <TouchableOpacity
            onPress={this._onPressHouse}
            style={styles.GridViewContainer}
          >
            {item.key}
          </TouchableOpacity>
        </View>
      );
    } else {
      //options icon
      return (
        <View>
          <TouchableOpacity
            onPress={this._onPressOptions}
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
            numColumns={1}
          />
        </View>
      </View>
    );
  }
}
