import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import SearchChargingCard from './components/SearchChargingCard';
import SearchTab from '../../shared/ui/SearchBar';
import { CommonActions } from '@react-navigation/native';
import { NAVIGATIONS_ROUTE } from '../../navigation/Routes';
import { getAllStation, getNearByChargingStationName } from '../../api/stationApi';
import LoadingComponent from '../../shared/ui/Loading';
import { useLocation } from '../../context/LocationContext';
import { FlashList } from '@shopify/flash-list';
import debounce from 'lodash/debounce';

const SearchChargingStation = ({ navigation, route }: any) => {
  const { latitude, longitude } = useLocation();
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const nameCharging = route.params?.nameCharging || '';

  const fetchData = useCallback(async () => {
    setIsLoading(true); 
    try {
      if (latitude && longitude) {
        const fetchFunction = nameCharging === 'VietEV'
          ? getAllStation
          : () => getNearByChargingStationName(nameCharging, latitude, longitude, 50000);

        const res = await fetchFunction(latitude, longitude);

        if (res && Array.isArray(res)) {
          setData(res);
          setFilteredData(res);
        } else {
          throw new Error('Dữ liệu không hợp lệ');
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Lỗi', 'Không thể tải dữ liệu trạm sạc.');
    } finally {
      setIsLoading(false); 
    }
  }, [latitude, longitude, nameCharging]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = useCallback(
    debounce((text) => {
      if (typeof text !== 'string' || text.trim() === '') {
        setFilteredData(data);
      } else {
        const filtered = data.filter(item =>
          item?.properties.address.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(filtered);
      }
    }, 300),
    [data]
  );
  useEffect(() => {
    handleSearch(searchText);
  }, [searchText, handleSearch]);

  const handleNavDetail = useCallback((station: any) => {
    navigation.dispatch(CommonActions.navigate({
      name: NAVIGATIONS_ROUTE.SCREEN_DETAIL_STATION,
      params: { station }
    }));
  }, [navigation]);

  const renderChargingCard = ({ item }: any) => (
    <SearchChargingCard
      key={item._id}
      _id={item._id}
      nameCharging={item.properties.stationName}
      location={item.properties.address}
      power={'_ _'}
      fillSlot={item?.status ? 0 : 1}
      totalSlot={item?.properties.totalChargingPorts}
      distance={item?.distance}
      action={() => handleNavDetail(item)}
    />
  );

  return (
    <View style={styles.container}>
      <SearchTab
        onChangeText={setSearchText}
        value={searchText}
        onSubmitEditing={handleSearch}
      />
      <Text style={styles.search}>Tìm kiếm gần đây</Text>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <>
          {filteredData.length > 0 ? (
            <FlashList
              data={filteredData}
              renderItem={renderChargingCard}  
              keyExtractor={item => item._id}
              estimatedItemSize={150} 
            />
          ) : (
            <Text style={styles.noDataText}>Không tìm thấy trạm sạc nào.</Text>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FAF8',
  },
  search: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 16,
    color: '#333333',
    paddingHorizontal: 10,
    fontWeight: '700',
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#333333',
  },
});

export default SearchChargingStation;
