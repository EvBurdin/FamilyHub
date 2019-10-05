import React from 'react';
import MapView, { Marker } from 'react-native-maps';

export default class showMap extends React.Component {
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
        <Marker
          coordinate={{
            latitude: 55.708906,
            longitude: 37.5926676,
          }}
          title="title"
          description="description"
        />
      </MapView>
    );
  }
}
