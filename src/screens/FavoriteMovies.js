import React from "react";
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
  state = {
    favMovies: [],
    isFetching: false
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderItem(favMovies) {
    let { item, index } = favMovies;
    return (
      <View style={styles.viewContainer}>
        <TouchableOpacity style={styles.itemBlock}>
          <Image
            style={styles.itemImage}
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`
            }}
          />
          <View style={styles.itemMeta}>
            <Text style={styles.itemName}>{item.title}</Text>
            <Text style={styles.itemLastMessage}>{item.vote_average}</Text>
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
    console.warn("refreshing");
    this.setState({ isFetching: true }, this.update);
  }

  update = () => {
    let updateMovies;
    updateMovies = setInterval(async () => {
      try {
        const moviesGet = await AsyncStorage.getItem("favMovies");
        const movies = JSON.parse(moviesGet);

        this.setState({ favMovies: movies, isFetching: false });
        // console.warn(this.state.favMovies[0].backdrop_path)
      } catch (error) {
        this.setState({ error, isFetching: false });
      }
    }, 3500);
  };
}

const styles = StyleSheet.create({
  rootContainer: {
   // backgroundColor: "#BDBDBD"
  },
  viewContainer: {
   // backgroundColor: "#E0E0E0",
    flex: 1
  },

  itemBlock: {
    flexDirection: "row",
    padding: 15,
    flex: 1
  },
  itemMeta: {
    marginLeft: 30,
    flexGrow: 1,
    width: 0
  },
  itemImage: {
    width: 100,
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
