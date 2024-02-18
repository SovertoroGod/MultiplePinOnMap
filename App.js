import React, { useState, useEffect } from 'react';
import { StyleSheet, View,Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);


  const defaultMarkers = [
    { latitude: 17.3221, longitude: 96.4663, title: 'Marker 1' },
    { latitude: 16.871311, longitude: 96.199379, title: 'Marker 2' },
    { latitude: 18.3391, longitude: 95.6195, title: 'Marker 3' },
    { latitude: 21.9588, longitude: 96.0891, title: 'Marker 4' },
   
  ];

  useEffect(() => {
    setMarkers(defaultMarkers);
  }, []);

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
         
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Your Location"
          />

          
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker}
              title={marker.title}
              pinColor="green" 
            />
          ))}
        </MapView>
      ) : (
        <Text>Waiting for location</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapScreen;
