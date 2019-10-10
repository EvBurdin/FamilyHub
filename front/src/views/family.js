import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  stretch: { marginTop: 10, textAlign: 'center', fontSize: 30 },
});

class Family extends Component {
  render() {
    return (
      <View>
        <Image style={{ marginTop: 50 }} source={require('../img/family.jpg')} />
        <Text style={styles.stretch}>My family:</Text>
        <Text style={styles.stretch}>-</Text>
        <Text style={styles.stretch}>-</Text>
      </View>
    );
  }
}

function mapStateToProps(store) {
  return {
    allLocations: store.Map.familyGPSLocation,
  };
}

export default connect(mapStateToProps)(Family);
