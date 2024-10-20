import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ImageStation from '../../../shared/icons/imageStation.svg';

type SearchChargingCardProps = {
  _id?: string;
  nameCharging?: string;
  location?: string;
  distance?: number;
  timePeriod?: number;
  transportation?: string;
  power?: string;
  fillSlot?: number;
  totalSlot?: number;
  action?: () => void;
};

const SearchChargingCard = (props: SearchChargingCardProps) => {
  const distanceText = useMemo(
    () => `${props.distance?.toFixed(2)} km`,
    [props.distance]
  );

  return (
    <TouchableOpacity style={styles.container} onPress={props.action}>
      <View style={styles.content}>
        <View style={styles.rowFirst}>
          <View style={styles.image}>
            <ImageStation />
          </View>
          <View style={styles.detailStation}>
            <Text style={styles.name} numberOfLines={1}>
              {props.nameCharging}
            </Text>
            <Text style={styles.location} numberOfLines={1}>
              {props.location}
            </Text>
            <Text style={styles.distance}>{distanceText}</Text>
          </View>
        </View>
        <View style={styles.rowSecond}>
          <View style={styles.typeStation}>
            <Text style={styles.transportation}>Loại sạc</Text>
            <Text style={styles.detail}>{props.transportation} Ô tô</Text>
          </View>
          <View style={styles.boxMini}></View>
          <View style={styles.power}>
            <Text style={styles.transportation}>Công suất</Text>
            <Text style={styles.detail}>{props.power} kW</Text>
          </View>
          <View style={styles.boxMini}></View>
          <View style={styles.slot}>
            <Text style={styles.transportation}>Khả dụng</Text>
            <Text style={styles.detail}>
              {props.fillSlot}/{props.totalSlot}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SearchChargingCard;


const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: 'row',
    borderWidth: 1,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 20,
    borderColor: '#C4C4C4',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 5,
    shadowOpacity: 0.4,
    elevation: 10,
  },
  content: {
    marginTop: 15,
    flex: 1,
    marginHorizontal: 15,
  },
  rowFirst: {
    marginHorizontal: 5,
    flexDirection: 'row',
  },
  name: {
    fontSize: 14,
    color: '#139372',
    fontWeight: '700',
  },
  location: {
    fontSize: 12,
    color: '#959595',
    fontWeight: '400',
    flexShrink: 1,
    flex: 1,
  },
  distance: {
    fontSize: 12,
    color: '#139372',
    fontWeight: '400',
  },
  image: {
    flexDirection: 'column',
  },
  detailStation: {
    justifyContent: 'center',
    marginHorizontal: 16,
    flex: 1,
  },
  rowSecond: {
    paddingVertical: 2,
    marginVertical: 15,
    flexDirection: 'row',
    backgroundColor: '#EBEFFC',
    marginHorizontal: 5,
    borderRadius: 12,
    borderColor: '#4184F2',
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typeStation: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxMini: {
    width: 1,
    backgroundColor: '#4184F2',
    height: '60%',
    marginHorizontal: 5,
  },
  power: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transportation: {
    fontSize: 14,
    color: '#000000',
    paddingHorizontal: 10,
    fontWeight: '500',
  },
  detail: {
    fontSize: 14,
    color: '#4184F2',
    paddingHorizontal: 10,
    fontWeight: '500',
    marginVertical: 4,
  },
});
