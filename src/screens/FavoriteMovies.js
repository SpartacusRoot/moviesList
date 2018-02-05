import React from "react";
import { Button, Text, ScrollView, AsyncStorage } from "react-native";

class FavoriteMovies extends React.Component {
  state = {
    favMovies: []
  };

  render() {
    //  this.load();

    return (
      <ScrollView>
        <Button onPress={() => this.update} title="Update favorite Movies" />

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

  update = () => {
    let updateMovies;
    updateMovies = setInterval(async () => {
      try {
        const moviesGet = await AsyncStorage.getItem("favMovies");
        const movies = JSON.parse(moviesGet);

        this.setState({ favMovies: movies });
       // console.warn(this.state.favMovies)
      } catch (error) {
        console.error(error);
      }
    }, 3500);
  };
}

export default FavoriteMovies;
