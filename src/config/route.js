import React from "react";
import { TabNavigator, StackNavigator } from "react-navigation";
import MovieDetails from "../screens/MovieDetails";
import TopRated from "../screens/TopRated";
import FavoriteMovies from "../screens/FavoriteMovies";
import Icon from "react-native-vector-icons/MaterialIcons";
export const FeedStack = StackNavigator({
  TopRated: {
    screen: TopRated
  },
  MovieDetails: {
    screen: MovieDetails
  },

});

export const Tabs = TabNavigator(
  {
    TopRatedMovies: {
      screen: FeedStack,
    },
    FavoriteMovies: {
      screen: FavoriteMovies
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
