import { TabNavigator, NavigationActions, StackNavigator } from "react-navigation";
import { View, Text,  AppRegistry, Button, ScrollView,  ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import MovieDetails from './screens/MovieDetails'
import TopRated from './screens/TopRated'
/*
const setParamsAction = NavigationActions.setParams({
  params : { title: 's'},
  key: 's'
   })


export const MovieStack = StackNavigator ({
Feed: {
  screen: TopRated,
  navigationOptions: {
  title: 'top rated'
  },
},
MovieDetails: {
  screen: MovieDetails,
  navigationOptions : {
    title: ({state}) => `${state.params.title.toUppercase()} `
  }
}
});


class TopRated extends React.Component {
  constructor(props){
    super(props);
     this.state = {
       isLoading: true,
       data: []
     }

  }
  
  
  static navigationOptions = {
    tabBarLabel: 'Top Rated'
  };

  componentDidMount(){
    this.fetchApi();
  }

  fetchApi = async () => {
    const response = await  fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=a74169393e0da3cfbc2c58c5feec63d7');
    const json = await response.json();
    this.setState({data: json.results})
  }


  render() {
    return (
      <ScrollView>
        <Button onPress={()=> this.props.navigation.navigate('MovieInfo')}
          title="Go To Movie Info"
        />
       
        <FlatList
          data={this.state.data}
          keyExtractor={(item,index) => index}
          renderItem={({ item }) =>
          <TouchableOpacity onPress={()=> this.props.navigation.dispatch(setParamsAction)}>
          <Text>  {item.title} </Text>
          </TouchableOpacity >}
        />

      </ScrollView>
    );
  }


}

class MovieInfo extends React.Component {
  static navigationOptions = {
  tabBarLabel: 'Favorite Movies'
  };
 render() {
   return (
     <Button onPress={()=> this.props.navigation.goBack()}
             title='Go back'
     />

   );
 }
  
  }

const myRouters = TabNavigator ({

  TopRated: {
    screen: TopRated,
  },
  MovieInfo: {
    screen: MovieInfo,
  },
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
});



export default myRouters;
*/