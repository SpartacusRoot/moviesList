import PropTypes from "prop-types";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  Button,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  AsyncStorage,
  Platform,
  ImageBackground
} from "react-native";

import MovieDetails from "../screens/MovieDetails";
import {addTofavorite2} from "../service/addTofavoriteService";


class MovieDetailsCont extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: params ? params.title : "Movies details",
      tabBarVisible: false,
      tabBarIcon: <Icon name="movie" color={"#ffc107"} size={25} />
    };
  };



  state = {
    movies: [],
    favMovies: []
  };



  // addTofavorite2 = async () => {
  //   try {
  //     let moviesArray = [];
  //     const movies = this.state.movies;
  //     const moviesGet = await AsyncStorage.getItem("favMovies");
  //     if (moviesGet == null) {
  //       moviesArray = [];
  //     } else {
  //       moviesArray = JSON.parse(moviesGet);
  //     }

  //     let compareArr = moviesArray.some(x => x.id === movies.id);
  //     if (compareArr === true) {
  //       alert("il film scelto è già stato inserito nella lista dei favoriti");
  //     } else if (compareArr === false) {
  //       moviesArray.push(this.state.movies);
  //       await AsyncStorage.setItem("favMovies", JSON.stringify(moviesArray));
  //       alert("Film salvato nei favoriti");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  componentDidMount() {
    this.fetchApiDetails();
  }

  fetchApiDetails = async () => {
    try {
      let { params } = this.props.navigation.state;
      let response = await fetch(
        `https://api.themoviedb.org/3/movie/${
          params.id
        }?api_key=a74169393e0da3cfbc2c58c5feec63d7`
      );
      let json = await response.json();
      this.setState({ movies: json });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { params } = this.props.navigation.state;
    const { movies } = this.state;
    return (
      <MovieDetails movies={this.state.movies} navigation={this.props.navigation.state} addTofavorite={addTofavorite2}/>
    );
  }
}



export default MovieDetailsCont;
