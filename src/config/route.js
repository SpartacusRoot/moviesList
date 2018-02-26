import React from "react";
import { TabNavigator, StackNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/MaterialIcons";

import MovieDetails from "../screens/MovieDetails";
import TopRated from "../screens/TopRated";
import FavoriteMovies from "../screens/FavoriteMovies";
import topRatedCont from "../containers/topRatedCont";
import movieDetailsCont from "../containers/movieDetailsCont";
import favoriteMoviesCont from "../containers/favoriteMoviesCont";


export const FeedStack = StackNavigator({
  TopRated: {
    screen: topRatedCont,
    navigationOptions : {
      title: 'Top Rated',
    }
  },
  MovieDetails: {
    screen: movieDetailsCont
  },

},
{
 initialRouteName: 'TopRated',
  navigationOptions: {
    headerStyle: {
      backgroundColor: "#ffa000",
    },
    headerTintColor: "white",
    headerTintStyle: {
     fontWeight: 'bold',
    },
  }
});

export const FeedStackFav = StackNavigator({
  FavoriteMovies: {
    screen: favoriteMoviesCont,
  }
})

export const Tabs = TabNavigator(
  {
    TopRatedMovies: {
      screen: FeedStack,

    },
    FavoriteMovies: {
      screen: FeedStackFav,
    }
  },
  {
    tabBarPosition: "bottom",
    animationEnabled: true,
    tabBarOptions: {
      style: {
        backgroundColor: '#212121',
      },
      labelStyle: {
        fontSize: 15,
      },
   //   activeTintColor: "#009688",
   //   inactiveTintColor: "black",
   //   activeBackgroundColor:"#ffc107",
      showIcon: true,

    }
  }
);
