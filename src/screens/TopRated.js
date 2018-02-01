import React from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Button,
  StyleSheet,
  Image,
  AsyncStorage
} from "react-native";

class TopRated extends React.Component {
  static navigationOptions = {
    title: "Top Rated"
  };

  state = {
    data: [],
  };

  componentDidMount() {
    this.fetchApi();
  }

  fetchApi = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=a74169393e0da3cfbc2c58c5feec63d7"
    );
    const json = await response.json();
    this.setState({ data: json.results });
  };

  goToMovie = () => {
    this.props.navigation.navigate("MovieDetails");
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

  renderItem(data) {
    let { item, index } = data;
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
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
        <FlatList
          style={styles.list_container}
          data={this.state.data}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(item, index) => index}
          renderItem={this.renderItem.bind(this)}
        />
      </ScrollView>
    );
  }
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

export default TopRated;
