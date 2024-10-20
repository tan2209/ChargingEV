import React, { useEffect, useRef } from 'react';
import { Animated, Text, TouchableOpacity, View, StyleSheet, Dimensions } from 'react-native';

type RunningTextProps = {
  text: string,
}

export const RunningText = (props: RunningTextProps) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 15000,
        useNativeDriver: true,
      })
    ).start();
  }, [animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [screenWidth, -screenWidth * 2]
  });

  return (
    <View style={styles.container}>
    <Animated.Text
      style={[
        styles.marqueeText,
        { transform: [{ translateX }] },
      ]}
      
    >
      {props.text}
    </Animated.Text>
  </View>
  );
};

const styles = StyleSheet.create({
 
  container: {
    overflow: 'hidden',
    width: '100%',
  },
  marqueeText: {
    fontSize: 14,
    width: '400%',
  },
});
