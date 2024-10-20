import React, { useCallback, useState } from 'react'
import { StyleSheet, View, Dimensions, Image, Text, TouchableOpacity, Linking, Alert } from 'react-native'
import IconElectric from '../../shared/icons/ic_electric.svg'
import IconElectricity from '../../shared/icons/ic_electricity.svg'
import IconStar from '../../shared/icons/ic_star.svg'
import IconLocation from '../../shared/icons/ic_locations.svg'
import IconStaion from '../../shared/icons/ic_charging-station.svg'
import IconClock from '../../shared/icons/ic_time.svg'
import IconHeart from '../../shared/icons/ic_favarite.svg'
import BoxDetail from './components/BoxDetail'
import ListStation from './components/ListStation'
import { CommonActions, useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LoadingComponent from '../../shared/ui/Loading'


export default function DetailStationScreen({ navigation, route }: any) {
  const screen = Dimensions.get('screen')
  const station = route?.params?.station;
  const stationName = station?.properties.stationName;
  const [isCheckCharging, setIsCheckCharging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleOTP = (stationName: string) => {
    navigation.dispatch(CommonActions.navigate({ name: "Mycharge", params: { stationName: stationName } }));
  };
  
  useFocusEffect(
    useCallback(() => {
      const fetchCharging = async () => {
        setIsLoading(true)
        try {
          const values = await AsyncStorage.multiGet(['currentTime', 'stationName']);
          const currentTime = values[0][1];
          if (currentTime) {
            setIsCheckCharging(true);
          } else {
            setIsCheckCharging(false);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false)
        }
      };

      fetchCharging();
    }, [])
  );
  const fetchDataStatus = async () => {
    if (stationName == 'Box Test 1' || stationName == 'Box Test 2' || stationName == 'Box Test 3') {
      try {
        if (!station.properties.status) {
          if (isCheckCharging) {
            Alert.alert('Bạn đang có phiên sạc ngay lúc này!');
          } else {
            handleOTP(stationName)
          }
        } else {
          Alert.alert('Trạm sạc hiện đang có phiên sạc!')
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      Alert.alert('Chức năng tạm thời đang đóng!')
    }
  };

  const handleDirections = (station: any) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${station.geometry.coordinates[1]},${station.geometry.coordinates[0]}`;
    Linking.openURL(url).catch(err => console.error('Error opening Google Maps:', err));
  };
  return (
    isLoading ? <LoadingComponent /> :
      <View style={{ flex: 1 }}>
        <Image source={require('../../../asset/image/image_station.png')}
          style={{ width: screen.width }} />
        <View style={[styles.container, { height: screen.height }]}>
          <View style={styles.info}>
            <View style={styles.box}>
              <Text style={styles.name}>{station?.properties.stationName}</Text>
              <TouchableOpacity>
                <IconHeart />
              </TouchableOpacity>
            </View>
            <BoxDetail icon={IconLocation} title={station.properties.address} />
            <BoxDetail icon={IconStar} title={station.properties.rating} />
            <View style={styles.box}>
              <BoxDetail icon={IconElectric} title='_ _ kw' />
              <BoxDetail icon={IconElectricity} title='Công tắc sạc ô tô' />
              <BoxDetail icon={IconStaion} title={`${station.properties.totalChargingPorts} cổng sạc`} />
            </View>
            <View>
            </View>
            <BoxDetail icon={IconClock} title={station?.properties.openingHours == 'Open' || 'open' ? 'Đang mở cửa' : 'Đã đóng cửa'} />
          </View>
          <View style={styles.button}>

            <TouchableOpacity style={styles.checkBox}>
              <Text style={styles.textCheck}>Thông tin</Text>
            </TouchableOpacity >
            <TouchableOpacity style={styles.Box}>
              <Text style={styles.text}>Trụ sạc</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Box}>
              <Text style={styles.text}>Đánh giá</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.intro}>Danh sách trụ sạc</Text>
          <View style={{ flex: 1, }}>
            <ListStation action2={fetchDataStatus} action1={() => handleDirections(station)} />
          </View>
        </View>
      </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: -20,
    backgroundColor: '#FFFFFF',
    borderRadius: 27,
  },
  info: {
    marginHorizontal: 16,
    marginVertical: 10,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopWidth: 0.5,
    borderTopColor: 'FAF7F5',
  },
  name: {
    color: '#344054',
    fontSize: 16,
    fontWeight: '700'
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5
  },
  text: {
    marginVertical: 10,
    marginHorizontal: 35,
    color: '#969799',
    fontSize: 14,
    fontWeight: '500'
  },
  textCheck: {
    marginVertical: 10,
    marginHorizontal: 35,
    color: '#4184F2',
    fontSize: 14,
    fontWeight: '500'
  },
  checkBox: {
    marginTop: 10,
    backgroundColor: '#EBEFFC',
    borderRadius: 20,
  },
  Box: {
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },
  intro: {
    marginVertical: 10,
    color: '#344054',
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 16,
  },

})