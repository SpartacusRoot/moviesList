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

class FavoriteMovies extends React.Component {
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

  static propTypes = {
    movies: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      backdrop_path: PropTypes.string,
      vote_average: PropTypes.string
    }),
    isFetching: PropTypes.bool,
    favMovies: PropTypes.objectOf(PropTypes.movies)
  };

  state = {
    favMovies: [],
    isFetching: false
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE"
        }}
      />
    );
  };

  renderItem(favMovies) {
    let { item, index } = favMovies;
    return (
      <View style={styles.viewContainer}>
        <TouchableOpacity
          style={styles.itemBlock}
          onPress={() =>
            this.props.navigation.navigate("MovieDetails", {
              id: item.id,
              title: item.title
            })
          }
        >
          <Image
            style={styles.itemImage}
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`
            }}
          />
          <View style={styles.itemMeta}>
            <Text style={styles.itemName}>{item.title}</Text>
            <Text style={styles.itemLastMessage}>
              <Icon name="star" style={styles.icons} />
              {item.vote_average}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  render() {
    //  this.load();

    return (
      <View style={styles.rootContainer}>
        <FlatList
          data={this.state.favMovies}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(item, index) => index}
          renderItem={this.renderItem.bind(this)}
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
}

const styles = StyleSheet.create({
  rootContainer: {
    paddingTop: 20,
    backgroundColor: "#cfd8dc"
  },
  viewContainer: {
    backgroundColor: "#E0E0E0",
    flex: 1
  },

  itemBlock: {
    flexDirection: "row",
    padding: 15,
    flex: 1
  },
  itemMeta: {
    marginLeft: 20,
    flexGrow: 1,
    width: 0
  },
  icons: {
    color: "#ffc107",
    fontSize: 30
  },
  itemImage: {
    width: 150,
    height: 100,
    borderRadius: 5,
    padding: 25
  },
  itemName: {
    color: "#212121",
    fontSize: 25
  },
  itemLastMessage: {
    fontSize: 20,
    color: "#D32F2F"
  }
});

export default FavoriteMovies;
