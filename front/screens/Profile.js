import React from 'react';
import { Button, View, Text } from 'react-native';
class Profile extends React.Component {
  static navigationOptions = {
    title: 'Profile'
   };
 render() {
 return (
  <View style={{ 
   flex: 1,
   alignItems:'center',
   justifyContent:'center'
  }}>
<Button title="Go to Home screen"
    onPress={() => this.props.navigation.openDrawer()}
   />
  </View>
);
}
}
export default Profile;