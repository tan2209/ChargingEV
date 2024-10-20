import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ButtonBasic from '../../../shared/ui/ButtonBasic';
import ButtonBase from '../../../shared/ui/ButtonBase';

type ListStationProps = {
    action1?: () => void,
    action2?: () => void,
  }
export default function ListStation(props: ListStationProps) {
  return (
      <View style={styles.button}>
        <ButtonBase titleStyle={styles.buttonMap} title='Chỉ đường' action={props.action1}/>
        <ButtonBasic titleStyle={styles.buttonBooking} title='Kết nối' action={props.action2} />
      </View>
    
  );
}

const styles = StyleSheet.create({

  button: {
    flexDirection: 'row',
    marginHorizontal: 5,
    justifyContent: 'space-around',
    flex: 1,
    alignItems: 'flex-end', 
    marginBottom: 20,
  },
  buttonMap: {
    width: 180,
    marginRight: 10,
  },
  buttonBooking: {
    backgroundColor: '#139372',
    width: 180,
  },
});
