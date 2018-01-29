import React from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Button
} from "react-native";

class TopRated extends React.Component {
  static navigationOptions = {
    title: "Top Rated"
  }

  state = {
    isLoading: true,
    data: []
  }

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
    this.props.navigation.navigate("MovieDetails")
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
        <Button
          onPress={this.goToMovie}
          title="Prova"
        />
        <FlatList
          data={this.state.data}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("MovieDetails", {movie: this.state.data})
              }
            >
              <Text> {item.title} </Text>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    );
  }
}

export default TopRated;
