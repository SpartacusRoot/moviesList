import React from "react";
import { Button, Text, ScrollView, AsyncStorage, FlatList,
         View, TouchableOpacity, Image, StyleSheet, RefreshControl } from "react-native";

class FavoriteMovies extends React.Component {
  state = {
    favMovies: [],
    isFetching: false,
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
      <View>
        <TouchableOpacity>
          <Image
          style={styles.itemImage}
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`
            }}
          />
          <View style={styles.itemMeta}>
            <Text style={styles.itemName}>
              {item.title}
            </Text>
            <Text style={styles.itemLastMessage}>{item.vote_average}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  render() {
    //  this.load();

    return (
      <ScrollView style={styles.container}>

       <FlatList
          style={styles.list_container}
          data={this.state.favMovies}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(item, index) => index}
          renderItem={this.renderItem.bind(this)}
          refreshControl= {
          <RefreshControl
          refreshing={this.state.isFetching}
          onRefresh={this.onRefresh.bind(this)}
          />
          }

        />
      </ScrollView>

    );

  }
  /*
  load = async () => {
    try {
      const moviesGet = await AsyncStorage.getItem("favMovies");
      const movies = await JSON.parse(moviesGet);
      this.setState({ favMovies: movies });
      console.warn(this.state.FavoriteMovies);
      if (value !== null) {
      }
    } catch (e) {
      console.warn("Failed to load movies.");
    }
  };
*/
  componentDidMount() {

    this.update();
  }

  onRefresh() {
    console.warn('refreshing')
    this.setState({isFetching: true}, this.update);

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
        this.setState({error, isFetching: false});
      }
    }, 3500);
  };


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 55
  },
  itemBlock: {
    paddingBottom: 30
  },
  itemImage: {
    width: 250,
    height: 150,
    borderRadius: 5,
    padding: 5,
    marginLeft: 55
  },
  itemMeta: {
    marginLeft: 55,
    padding: 5
  },
  itemName: {
    color: "#212121",
    fontSize: 25,
    textAlign: "left"
  },
  itemLastMessage: {
    fontSize: 30,
    color: "#D32F2F",
    textAlign: "left"
  }
});


export default FavoriteMovies;
