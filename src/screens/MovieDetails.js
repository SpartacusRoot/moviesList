import PropTypes from "prop-types";
import React from "react";
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
    title: "Movies details"
  };

  /*
  static propTypes = {
    movie: PropTypes.object.isRequired,
  }
*/

  // static navigationOptions = ({ navigation }) => ({
  // title: `${this.props.navigation.state.params.title}`,
  //});

  state = {
    movies: [],
    favMovies: []
  };

  /*
  addTofavorite = async () => {
    try {
    //  const movies = this.state.movies;
      const movieSet = await AsyncStorage.setItem(
        "favMovies",
        JSON.stringify(movies)
      );

      let movieGet = await AsyncStorage.getItem("favMovies");
      let movieGetString = JSON.parse(movieGet);
      this.setState({ favMovies: movieGet });
      console.warn(typeof (movieGetString));
    } catch (error) {
      console.error(error);
    }
  };
*/

  SaveDataToLocalStorage = async (movies) => {
    let movieArr = [];
    movieArr = await AsyncStorage.getItem("favMovies");
    movieArrObj = JSON.parse(movieArr);
    movieArrObj.push(movies);
    let setMovies = await AsyncStorage.setItem(
      "favMovies",
      JSON.stringify(movieArr)
    );

  };

  addTofavorite2 = async () => {
    try {
      let moviesArray= [];
      const movies = this.state.movies;
      //  console.warn(movies.id);
      const moviesGet = await AsyncStorage.getItem("favMovies");
      if (moviesGet == null) {
        moviesArray = [];
      } else {
        moviesArray = JSON.parse(moviesGet);
      }

      let compareArr = moviesArray.some(x => x.id === movies.id)
      console.warn(compareArr)
      if(compareArr === true){
        alert("il film scelto è già stato inserito nella lista dei favoriti");
      } else if (compareArr === false){
        moviesArray.push(this.state.movies);
        await AsyncStorage.setItem("favMovies", JSON.stringify(moviesArray));
      }



    //  AsyncStorage.getItem("favMovies").then((res) => console.warn(JSON.parse(res).length));

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
          <Button
            onPress={this.addTofavorite2}
            title="aggiungi ai favoriti"
            accessibilityLabel="Aggiungi ai favoriti i tuoi film preferiti "
          />
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
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "relative"
  },
  image: {
    width: 500,
    height: 200
  },
  title: {
    fontSize: 30,
    position: "absolute",
    bottom: 8,
    left: 16,
    color: "#D32F2F"
  },
  overview: {
    fontSize: 24,
    padding: 20,
    textAlign: "left",
    color: "#212121"
  }
});

export default MovieDetails;
