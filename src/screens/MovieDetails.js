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

class MovieDetails extends React.Component {
  static propTypes = {
    // type error
// movies: PropTypes.array,
    addTofavorite: PropTypes.func.isRequired
  };

  render() {
    const { params } = this.props.navigation;
    const { movies } = this.props;
    return (
      <ScrollView>
        <View style={styles.container}>
          <ImageBackground
            style={styles.image}
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${movies.backdrop_path}`
            }}
            style={styles.image}
          >
            <Text style={styles.title}>{params.title}</Text>
          </ImageBackground>
          <View style={styles.detailsContainer}>
            <Image
              style={styles.imagePoster}
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${movies.poster_path}`
              }}
            />
            <View style={styles.ratingContainer}>
              <View style={styles.taglineWrap}>
                <Text style={styles.ratingContainerTitle}>
                  {movies.tagline}
                </Text>
              </View>
              <Text style={styles.ratings}>Ratings</Text>
              <Text style={styles.voteAverage}>{movies.vote_average}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.overview}>{movies.overview}</Text>
        <View style={styles.elevationContainer}>
          <TouchableOpacity
            style={styles.buttonFavorite}
            onPress={this.props.addTofavorite}
          >
            <Text style={styles.FavoriteText}>Aggiungi ai favoriti</Text>
          </TouchableOpacity>
        </View>
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
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexGrow: 0.4,
    width: "100%"
  },
  detailsContainer: {
    flex: 1,
    flexDirection: "row"
  },

  imagePoster: {
    position: "relative",
    left: 10,
    bottom: 20,
    width: 150,
    height: 220,
    borderRadius: 5
  },
  taglineWrap: {
    flex: 1,
    flexGrow: 0.4,
    maxWidth: "75%"
  },
  ratingContainer: {
    left: 30,
    flexDirection: "column"
  },
  ratings: {
    fontSize: 40,
    color: "#212121"
  },
  voteAverage: {
    fontSize: 30,
    color: "#ffa000"
  },
  ratingContainerTitle: {
    paddingTop: 7,
    flex: 1,
    fontSize: 25,
    color: "#212121"
  },
  title: {
    fontSize: 30,
    color: "#ffffff",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2
  },
  overview: {
    fontSize: 25,
    padding: 20,
    textAlign: "left",
    color: "#212121"
  },
  elevationContainer: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 10,
        shadowOpacity: 1
      },
      android: {
        elevation: 5
      }
    })
  },
  buttonFavorite: {
    flex: 1,
    borderBottomWidth: 5,
    borderBottomColor: "#757575",
    backgroundColor: "#212121",
    width: "75%",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 8,
    height: 75,
    marginBottom: 10,
    marginTop: 10
  },
  FavoriteText: {
    textAlign: "center",
    fontSize: 25,
    color: "#ffffff"
  }
});

export default MovieDetails;
