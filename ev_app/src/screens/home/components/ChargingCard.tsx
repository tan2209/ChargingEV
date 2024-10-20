import React, { useEffect, useRef, useState } from 'react'
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Iconstation from '../../../shared/icons/ic_charging-station.svg'
import IconElectric from '../../../shared/icons/ic_electricCharging.svg'
import * as Colors from '../../../shared/theme/Colors';

type ChargingCardProps = {
    action: any,
}
export default function ChargingCard(props: ChargingCardProps) {
    const [progress, setProgress] = useState(0.5);
    const [dots, setDots] = useState('');
    const dotAnimation = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prevProgress => (prevProgress + 0.01 > 1 ? 1 : prevProgress + 0.01));
        }, 1000);

        const dotInterval = setInterval(() => {
            setDots(prevDots => {
                if (prevDots.length === 3) {
                    return '';
                } else {
                    return prevDots + '.';
                }
            });
        }, 500);

        Animated.loop(
            Animated.sequence([
                Animated.timing(dotAnimation, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(dotAnimation, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        return () => {
            clearInterval(interval);
            clearInterval(dotInterval);
        };
    }, []);

    return (
        <TouchableOpacity style={styles.boxMapContainer} onPress={props.action}>
            <View style={styles.imageViewCar}>
                <Image source={require('../../../../asset/image/carCharging.png')} style={styles.imageCar} />
            </View>
            <View style={styles.charging}>
                <IconElectric />
                <Text style={styles.textCharging}>Đang sạc </Text>
                <View style={{ width: 20 }}><Text style={styles.textDots}>{dots}</Text></View>
            </View>

        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    boxMapContainer: {
        height: 200,
        marginVertical: 12,
        marginHorizontal: 16,
        borderRadius: 20,
        backgroundColor: '#EEEEEE',
        shadowColor: '#222222',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 8,
        shadowOpacity: 1,
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center'

    },
    imageViewCar: {
        height: 140,
        width: 240
    },
    imageCar: {
        height: 140,
        width: 240
    },
    charging: {
        flexDirection: 'row',
        marginTop: 10
    },
    textCharging: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.primaryGreen,
        marginLeft: 10
    },
    textDots: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.primaryGreen,
    }
})