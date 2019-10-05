import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';

class showMap extends React.Component {
  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 55.708906,
          longitude: 37.5926676,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
       />
    );
  }
}
function mapStateToProps(store) {
  return {
    myLocation: store.map.selfGPSLocation,
  };
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(showMap);

// {
//   this.props.myLocation &&
//   <Marker
//     coordinate={{
//       latitude: 55.708906,
//       longitude: 37.5926676,
//     }}
//     title="title"
//     description="description"
//   />
// }
