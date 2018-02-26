import React from "react";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialIcons";
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

import { TopRated } from "../screens/TopRated";

class TopRatedCont extends React.Component {
  static navigationOptions = {
    title: "Top Rated",
    tabBarIcon: <Icon name="movie" color={"#ffc107"} size={25} />
  };

  state = {
    movies: [],
    page: 1,
    isFetching: false
  };

  componentDidMount() {
    this.fetchApi();
  }

  onRefresh() {
    this.setState({ isFetching: true }, this.fetchApi);
  }

  fetchApi = async () => {
    // const page = this.state;
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=a74169393e0da3cfbc2c58c5feec63d7&page=${
        this.state.page
      }`
    );
    const json = await response.json();
    this.setState({
      movies: [...this.state.movies, ...json.results],
      isFetching: false,
      page: this.state.page
    });
  };

  loadMoreMovies = () => {
    this.setState({ page: this.state.page + 1 }, this.fetchApi);
  };

  render() {
    return (
      <TopRated
        movies={this.state.movies}
        isFetching={this.state.isFetching}
        loadMoreMovies={this.loadMoreMovies}
        onRefresh={this.onRefresh}
        navigate={this.props.navigation}
      />
    );
  }
}

export default TopRatedCont;
