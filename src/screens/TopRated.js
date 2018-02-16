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

class TopRated extends React.Component {
  static propTypes = {
    movies: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      backdrop_path: PropTypes.string,
      vote_average: PropTypes.string
    }),
    isFetching: PropTypes.bool,
    page: PropTypes.number
  };

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
      page: this.state.page,
    });
  };

  goToMovie = () => {
    this.props.navigation.navigate("MovieDetails");
  };

  loadMoreMovies = () => {
  this.setState({ page: this.state.page + 1 }, this.fetchApi);

  };

  renderItem(movies) {
    let { item, index } = movies;
    return (
      <View style={styles.itemBlock}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("MovieDetails", {
              id: item.id,
              title: item.title
            })
          }
        >
          <ImageBackground
            style={styles.itemImage}
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`
            }}
          >
          <Text style={styles.itemName}>{item.title}</Text>
          <Text style={styles.itemLastMessage}>
            <Icon name="star" style={styles.icons} />
            {item.vote_average}
          </Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
      <FlatList
          data={this.state.movies}
          keyExtractor={(item, index) => index}
          renderItem={this.renderItem.bind(this)}
          onEndReached={this.loadMoreMovies}
          onEndReachedThreshold={1}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isFetching}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
        />
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#E0E0E0"
  },
  itemBlock: {
    paddingTop: 7,
    flex: 1,

  },
  icons: {
    color: "#ffc107",
    fontSize: 30,
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 20
  },
  itemImage: {
    backgroundColor: "black",
    opacity: 0.8,
    flexGrow:1,
    alignItems: 'center',
    justifyContent:'flex-end',
    width: 400,
    height: 200,
    borderRadius: 10,
  },
  itemName: {
    color: "#FFFFFF",
    fontSize: 25,
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2
  },
  itemLastMessage: {
    fontSize: 30,
    color: "#212121",
    textAlign: "center",
    textShadowColor: "#FFFFFF",
    textShadowOffset: { width: -2, height: 1 },
    textShadowRadius: 10
  }
});

export default TopRated;
