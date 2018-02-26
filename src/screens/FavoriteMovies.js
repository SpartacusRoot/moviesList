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
  static propTypes = {
    favMovies: PropTypes.array,
    isFetching: PropTypes.bool,
    onRefresh: PropTypes.func.isRequired
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

  renderItem({ item }) {
    //  let { item, index } = favMovies;
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
    return (
      <View style={styles.rootContainer}>
        <FlatList
          data={this.props.favMovies}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(item, index) => index}
          renderItem={this.renderItem.bind(this)}
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
    fontSize: 20
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
