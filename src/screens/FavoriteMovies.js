import React from "react";
import { Button, Text, ScrollView } from "react-native";

class FavoriteMovies extends React.Component {
  render() {
    return (
      <Button onPress={() => this.props.navigation.goBack()} title="Go back" />
    );
  }
}

export default FavoriteMovies;
