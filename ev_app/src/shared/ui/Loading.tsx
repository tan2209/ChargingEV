import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import * as Colors from '../theme/Colors'

const LoadingComponent = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color={Colors.primaryGreen} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
});

export default LoadingComponent;
