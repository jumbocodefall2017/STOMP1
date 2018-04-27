import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';

// This is the list from React Native Elements
import { List, ListItem } from 'react-native-elements'

// Here's an array that we will use for dummmy data
// TODO: make a request to the heroku server to retrieve the data <- maybe do this on the item, not here.
// TODO: populate the icon (or image) with something suitible


request = new XMLHttpRequest();
request.open('GET', 'https://shrouded-crag-14655.herokuapp.com/getList', true);
request.onreadystatechange = function() {
  if (request.readyState == 4 && request.status == 200) {
    responseString = request.responseText;
    list = JSON.parse(responseString); //response text into array
  }
};
request.send();


export default class ListScreen extends React.Component {

  // These are for react navigation, like header bar and such
  static navigationOptions = {
    title: 'List',
  };

  render() {

    // this is the navigator we passed in from App.js
    const { navigate } = this.props.navigation;

    return (
      <List containerStyle={{marginBottom: 20}}>
        {
          // this maps our map to renderable ListItems
          list.map((item, index) => (
            <ListItem
              key={index} // Ensure these are unique per item (like by using the list index)
              title={item}
              //subtitle={item.description}
              //leftIcon={{ name: item.icon }}
              onPress={() =>

                // Navigate to the item screen, and pass the name of the selected item as a prop
                navigate('Item', { name: item })
              }
            />
          ))
        }
      </List>
    );
  }
}
