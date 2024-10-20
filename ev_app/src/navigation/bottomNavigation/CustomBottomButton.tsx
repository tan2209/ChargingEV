import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import IconScan from '../../shared/icons/ic_scan.svg';

const CustomTabBarButton = () => {
  return (
    <View style={styles.outerCircle}>
      <View style={styles.btnWrapper}>
        <LinearGradient
          colors={['#139372', '#B5E8DB']}
          style={styles.linearGradient}
        >
          <IconScan />
        </LinearGradient>
      </View>
    </View>
  );
};

export default CustomTabBarButton;

const styles = StyleSheet.create({
  outerCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60, 
    height: 60,
    borderRadius: 35,
    backgroundColor: 'transparent',
    marginTop: -40, 
  },
  btnWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,  
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  linearGradient: {
    width: '100%',  
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
});
