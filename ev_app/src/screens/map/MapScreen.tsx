import React, { useState, useEffect, useRef } from 'react';
import { View, PermissionsAndroid, Platform, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import LoadingComponent from '../../shared/ui/Loading';
import IconLocation from '../../shared/icons/ic_locationGeo.svg';
import CardStation from './components/CardStation';
import SearchBar from '../../shared/ui/SearchBar';
import MapViewDirections from 'react-native-maps-directions';
import { calculateDistance } from '../../utils/distance';
import { useLocation } from '../../context/LocationContext';
import { GOOGLE_API } from '../../shared/constants';
import { CommonActions } from '@react-navigation/native';
import { NAVIGATIONS_ROUTE } from '../../navigation/Routes';
import { getNearByChargingStationSearchText, getNearestChargingStations } from '../../api/stationApi';

const MapScreen = ({navigation} : any) => {
  const { latitude, longitude, setLatitude, setLongitude } = useLocation();
  const [chargingStation, setChargingStation] = useState<any[]>([]);
  const [selectedStation, setSelectedStation] = useState<any>(null);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mapRegion, setMapRegion] = useState<any>(null);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const handleNavDetail = (station : any) => {
    navigation.dispatch(CommonActions.navigate({ name: NAVIGATIONS_ROUTE.SCREEN_DETAIL_STATION, params: { station } }));
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Quyền Truy Cập Vị Trí',
            message: 'Ứng dụng cần truy cập vị trí của bạn.',
            buttonNeutral: 'Hỏi Lại Sau',
            buttonNegative: 'Hủy Bỏ',
            buttonPositive: 'OK',
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Quyền truy cập vị trí đã được cấp');
          getCurrentLocation();
        } else {
          console.log('Quyền truy cập vị trí bị từ chối');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const getCurrentLocation = () => {
    setIsLoading(true);
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
        getNearByChargingStation(latitude, longitude);
      },
      (error) => {
        console.warn(`Lỗi khi lấy vị trí: ${error.message}`);
        setIsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const getNearByChargingStation = async (latitude: number, longitude: number) => {
    setIsLoading(true);
    const res = await getNearestChargingStations(latitude, longitude, 100000)
    setIsLoading(false);
    setChargingStation(res);
    if (res.length > 0) {
      focusOnSearchLocation(res[0].geometry.coordinates[1], res[0].geometry.coordinates[0]);
    }
  };
  

  const handleMarkerPress = (station: any) => {
    setSelectedStation(station);
  };

  const handleUpdateLocation = () => {
    getCurrentLocation();
    setSelectedStation(null); 
  };

  const handleSearch = async () => {
    setIsLoading(true);
    setSelectedStation(null); 
    if (longitude && latitude) {
       const res = await getNearByChargingStationSearchText( latitude, longitude, searchText);
    setChargingStation(res); 
    setIsLoading(false)
    if (res.length > 0) {
      focusOnSearchLocation(res[0].geometry.coordinates[1], res[0].geometry.coordinates[0]);
    }
   
    }
   
  };
  const focusOnSearchLocation = (lat: number, lng: number) => {
    if (mapRef.current) {
      const region = {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      };
      setMapRegion(region);
    }
  };
  if (latitude === null || longitude === null) {
    return <LoadingComponent />;
  }

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? <LoadingComponent /> :
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={{ flex: 1 }}
          region={mapRegion}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{ latitude, longitude }}
            title="Vị trí hiện tại"
            description="Đây là vị trí của bạn"
            pinColor='red'
          />
          <Circle
            center={{
              latitude: latitude,
              longitude: longitude
            }}
            radius={100}
            fillColor="rgba(0, 0, 255, 0.2)"
            strokeColor="rgba(0, 0, 255, 0.5)"
          />
          {
            chargingStation.map((station) => (
              <Marker
                key={station._id}
                coordinate={{
                  latitude: station.geometry.coordinates[1],
                  longitude: station.geometry.coordinates[0]
                }}
                title={station.name}
                description={station.compound_code}
                onPress={() => handleMarkerPress(station)}
                pinColor='#66CCFF'
                 
              >
              <Image source={require('../../../asset/image/location.png')} style={styles.markerImage} />
             
            </Marker>
            ))
          }
        
        </MapView>
      }
      <View style={styles.searchBar}>
        <SearchBar onChangeText={(searchText) => setSearchText(searchText)} onSubmitEditing={handleSearch} value={searchText}/>
      </View>
      <TouchableOpacity onPress={handleUpdateLocation}
        style={[styles.location, { bottom: selectedStation || chargingStation.length > 0 ? 320 : 40 }]}>
        <IconLocation />
      </TouchableOpacity>
      <View style={styles.flatlist}>
        {!selectedStation ? (
          <FlatList
            initialScrollIndex={0}
            data={chargingStation}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <CardStation
              _id={item._id}
              nameCharging={item.properties.stationName}
              location={item.properties.address}
              power={'_ _'}
              star={item?.properties.rating}
              totalSlot={item?.properties.totalChargingPorts}
              open_status={item?.properties.openingHours}
              distance={item?.dist.calculated}
              action={() =>handleNavDetail(item)}
            />}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
          />
        ) : (<View style={{justifyContent: 'center', alignItems: 'center'}}>
          <CardStation
            _id={selectedStation?.place_id}
            nameCharging={selectedStation?.properties.stationName}
            location={selectedStation.properties.address}
            power={'90'}
            star={selectedStation?.properties.rating}
            fillSlot={0}
            totalSlot={selectedStation?.properties.totalChargingPorts}
            open_status={selectedStation?.properties.openingHours}
            distance={selectedStation?.dist.calculated}
            action={() =>handleNavDetail(selectedStation)}
          /></View>
        )}
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  
  markerImage: {
    width: 35,
    height: 35,
  },
  searchBar: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 20,
  },
  location: {
    position: 'absolute',
    right: 16,
  },
  flatlist: {
    position: 'absolute',
    bottom: 20,
    right: 0,
    left: 0,
  },
  flatListContent: {
    paddingHorizontal: 10,
  },
 
});
