import React from "react";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialIcons";
import TopRatedContainer from "../containers/topRatedContainer";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Button,
  StyleSheet,
  Image,
  ImageBackground,
  AsyncStorage,
  RefreshControl
} from "react-native";

export class TopRated extends React.Component {

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View >
      <TopRatedContainer navigate={this.props.navigation} onPress={this.props.onPress} />
      </View>
    );

  }
}


export default TopRated;
