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
  AsyncStorage
} from "react-native";

class MovieDetails extends React.Component {
  static navigationOptions = {
    title: "Movies details",
    tabBarVisible: false,
    tabBarIcon:(
      <Icon name="movie" color={"#ffc107"} size={25} />
     )
  };


  static propTypes = {
    movie: PropTypes.object,
    favMovies: PropTypes.object,
    moviesArray: PropTypes.arrayOf(PropTypes.favMovies),
  }


  state = {
    movies: [],
    favMovies: []
  };


  addTofavorite2 = async () => {
    try {
      let moviesArray = [];
      const movies = this.state.movies;
      const moviesGet = await AsyncStorage.getItem("favMovies");
      if (moviesGet == null) {
        moviesArray = [];
      } else {
        moviesArray = JSON.parse(moviesGet);
      }

      let compareArr = moviesArray.some(x => x.id === movies.id);
      if (compareArr === true) {
        alert("il film scelto è già stato inserito nella lista dei favoriti");
      } else if (compareArr === false) {
        moviesArray.push(this.state.movies);
        await AsyncStorage.setItem("favMovies", JSON.stringify(moviesArray));
        alert("Film salvato nei favoriti");
      }
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    this.fetchApiDetails();
  }

  fetchApiDetails = async () => {
    try {
      //  let id = this.props.navigation.state.params.id;
      let response = await fetch(
        `https://api.themoviedb.org/3/movie/${
          this.props.navigation.state.params.id
        }?api_key=a74169393e0da3cfbc2c58c5feec63d7`
      );
      let json = await response.json();
      this.setState({ movies: json });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${
                this.state.movies.backdrop_path
              }`
            }}
            style={styles.image}
          />
          <Text style={styles.title}>
            {this.props.navigation.state.params.title}
          </Text>
        </View>
        <Text style={styles.overview}>{this.state.movies.overview}</Text>
        <Button
          color="#212121"
          style={styles.buttonFavorite}
          onPress={this.addTofavorite2}
          title="aggiungi ai favoriti"
          accessibilityLabel="Aggiungi ai favoriti i tuoi film preferiti "
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: 500,
    height: 250
  },
  title: {
    fontSize: 30,
    position: "absolute",
    bottom: 8,
    left: 16,
    color: "#ffffff",
    textShadowColor: '#000',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
  },
  overview: {
    fontSize: 24,
    padding: 20,
    textAlign: "left",
    color: "#212121"
  },
  buttonFavorite: {
    backgroundColor: "#009688",
    position: 'absolute',
    bottom:0,
    left:0,
  }
});

export default MovieDetails;
