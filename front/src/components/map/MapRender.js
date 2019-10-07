import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';

class MapRender extends React.Component {
  state = {};
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
      >
        {this.props.allLocations && (
          <Marker
            coordinate={{
              latitude: this.props.allLocations.latitude,
              longitude: this.props.allLocations.longitude,
            }}
            title="title"
            description="description"
          />
        )}
      </MapView>
    );
  }
}

function mapStateToProps(store) {
  return {
    allLocations: store.Map.familyGPSLocation,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapRender);

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
