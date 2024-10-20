import React from 'react'
import { StyleSheet, View, Dimensions, Image, Text, TouchableOpacity } from 'react-native'
import IconElectric from '../../../shared/icons/ic_electric.svg'
import IconElectricity from '../../../shared/icons/ic_electricity.svg'
import IconStar from '../../../shared/icons/ic_star.svg'
import IconLocation from '../../../shared/icons/ic_locations.svg'
import IconStaion from '../../../shared/icons/ic_charging-station.svg'
import IconClock from '../../../shared/icons/ic_time.svg'
import BoxDetail from '../../charging/components/BoxDetail'
import * as Colors from '../../../shared/theme/Colors'

type CardStationProps = {
  _id?: string,
  nameCharging?: string,
  location?: string,
  power?: string,
  star?: string,
  fillSlot?: number,
  totalSlot?: number,
  open_status?: string,
  distance: number,
  action?: () => any,
}

const CardStation = React.memo((props: CardStationProps) => {
  const distance = props.distance /1000
  return (
    <TouchableOpacity style={styles.container} onPress={props.action} >
      <View style={styles.image}>
        <Image source={require('../../../../asset/image/image_station.png')}
          style={{ resizeMode: 'cover', height: '100%', width: '100%', borderRadius: 8 }} /></View>
      <View style={styles.info}>
        <View style={[styles.box, styles.headerBox]}>
          <Text style={styles.name} numberOfLines={1}>{props.nameCharging}</Text>
          <Text style={styles.distance}>{distance?.toFixed(2)} km</Text>

        </View>
        <BoxDetail icon={IconLocation} title={props.location} />
        <BoxDetail icon={IconStar} title={props.star} />
        <View style={styles.box}>
          <BoxDetail icon={IconElectric} title={props.power} />
          <BoxDetail icon={IconElectricity} title='Công tắc sạc ô tô' />
          <BoxDetail icon={IconStaion} title={`${props.totalSlot} cổng sạc`} />
        </View>
        <View>
        </View>
        <BoxDetail icon={IconClock} title={props.open_status == 'Open' || 'open' ? 'Đang mở cửa' : 'Đã đóng cửa'}/>
      </View>
    </TouchableOpacity>
    
  )
})

export default CardStation;
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    width: Dimensions.get('screen').width - 40,
    marginHorizontal: 10,
    height: 280,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  image: {
    width: '100%', 
    height: 100,
    borderRadius: 8,
  },
  headerBox: {

  },
  info: {
   marginTop: 10,
  },
  name: {
    color: '#344054',
    fontSize: 16,
    fontWeight: '700',
    paddingRight: 10,
    width: '80%',
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between'
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
    borderRadius: 20,
  },
  Box: {
    marginTop: 10,
    borderRadius: 20,
  },
  distance: {
    fontSize: 12,
    color: Colors.primaryGreen,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    backgroundColor: Colors.lightGreen
  }
})