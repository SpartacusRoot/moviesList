import React from "react";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  Button,
  Text,
  ScrollView,
  AsyncStorage,
  FlatList,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  RefreshControl
} from "react-native";

import FavoriteMovies from "../screens/FavoriteMovies";

class FavoriteMoviesCont extends React.Component {
  static navigationOptions = {
    title: "Favorite movies",
    headerStyle: {
      backgroundColor: "#ffa000"
    },
    headerTintColor: "white",
    headerTintStyle: {
      fontWeight: "bold"
    },
    tabBarIcon: <Icon name="favorite" color={"#ffc107"} size={25} />
  };

  state = {
    favMovies: [],
    isFetching: false
  };

  componentDidMount() {
    this.update();
  }

  onRefresh() {
    this.setState({ isFetching: true }, this.update);
  }

  update = () => {
    let updateMovies;
    updateMovies = setInterval(async () => {
      try {
        const moviesGet = await AsyncStorage.getItem("favMovies");
        const movies = JSON.parse(moviesGet);
        this.setState({ favMovies: movies, isFetching: false });
      } catch (error) {
        this.setState({ error, isFetching: false });
      }
    }, 3500);
  };

  render() {
    return (
      <FavoriteMovies
        favMovies={this.state.favMovies}
        isFetching={this.state.isFetching}
        onRefresh={this.onRefresh}
        navigation={this.props.navigation}
      />
    );
  }
}

export default FavoriteMoviesCont;
