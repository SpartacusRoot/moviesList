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
  RefreshControl
} from "react-native";

export class TopRated extends React.Component {
  static propTypes = {
    Movies: PropTypes.object,
    isFetching: PropTypes.bool,
    onRefresh: PropTypes.func.isRequired,
    loadMoreMovies: PropTypes.func.isRequired,
  };


  renderItem({ item }) {
    return (
      <View style={styles.itemBlock}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigate.navigate("MovieDetails", {
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
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.movies}
          keyExtractor={(item, index) => index}
          renderItem={this.renderItem.bind(this)}
          onEndReached={this.props.loadMoreMovies}
          onEndReachedThreshold={1}
          refreshControl={
            <RefreshControl
              refreshing={this.props.isFetching}
              onRefresh={this.props.onRefresh.bind(this)}
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
    flex: 1
  },
  icons: {
    color: "#ffc107",
    fontSize: 20,
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 20
  },
  itemImage: {
    backgroundColor: "black",
    opacity: 0.8,
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    width: 400,
    height: 200,
    borderRadius: 10
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

// import React from "react";
// import PropTypes from "prop-types";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import {
//   View,
//   Text,
//   ScrollView,
//   FlatList,
//   TouchableOpacity,
//   Button,
//   StyleSheet,
//   Image,
//   ImageBackground,
//   AsyncStorage,
//   RefreshControl
// } from "react-native";

// import TopRatedContainer from "../containers/topRatedContainer";

// export const TopRated = props => {
//   return (
//     <View>
//       <TopRatedContainer navigate={props.navigation} onPress={props.onPress} />
//     </View>
//   );
// };

// /*
// export class TopRated extends React.Component {

//   static navigationOptions = {
//     title: "Top Rated",
//     tabBarIcon: <Icon name="movie" color={"#ffc107"} size={25} />
//   };

//   render() {

//     return (
//       <View >
//       <TopRatedContainer navigate={this.props.navigation} onPress={this.props.onPress} />
//       </View>
//     );

//   }
// }
// */

// export default TopRated;
