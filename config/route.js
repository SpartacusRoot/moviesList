import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import MovieDetails from '../screens/MovieDetails';
import TopRated from '../screens/TopRated';
import FavoriteMovies from '../screens/FavoriteMovies'

export const FeedStack = StackNavigator({
 TopRated : {
     screen: TopRated,
     navigationOptions: {
         title: 'Top Rated'
     },
 MovieDetails : {
     screen: MovieDetails,
     navigationOptions: ({ navigation }) => ({
 title : `${navigation.state.params.item.title}`,
     }),
 }    
 },
 
 
})

export const Tabs = TabNavigator({
TopRated : {
 screen : FeedStack,
},
FavoriteMovies : {
 screen: FavoriteMovies,
   },
},
 {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#e91e63',
    },
});


