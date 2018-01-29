import PropTypes from 'prop-types';
import React from 'react';
import { Button, ScrollView, Text} from 'react-native';

class MovieDetails extends React.Component {
  // static navigationOptions = ({ navigation }) => ({
  //   title : `${navigation.state.params.item.title}`,
  // })

  static propTypes = {
    movie: PropTypes.object.isRequired,
  }


  render() {
  // const { title } = this.props.navigation.state.params;
    return (
    <ScrollView>
      <Button onPress={()=> this.props.navigation.goBack()}
        title='Go back'
      />
      <Text>PRova</Text>
    </ScrollView>
    );
  }
}

export default MovieDetails;
