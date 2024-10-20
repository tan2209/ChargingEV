import React, { useCallback, useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import Header from '../account/component/Header';

export default function SupportScreen({ navigation }: any) {
 

  const handleNavBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };

  return (
    <View style={styles.container}>
      <Header title='Hướng dẫn sử dụng' action={handleNavBack} />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  notFoundText: {
    marginTop: 10,
    fontSize: 16,
    color: '#999'
  }
});
