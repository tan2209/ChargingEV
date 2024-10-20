import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, PermissionsAndroid, Platform, Animated } from 'react-native';
import Logo from '../../shared/icons/image 5.svg';
import IconBell from '../../shared/icons/ic_bell.svg';
import IconGPS from '../../shared/icons/ic_gps.svg';
import IconVector from '../../shared/icons/ic_link.svg';
import BoxBrand from './components/BoxBrand';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { NAVIGATIONS_ROUTE } from '../../navigation/Routes';
import LinearGradient from 'react-native-linear-gradient';
import * as Colors from '../../shared/theme/Colors';
import Geolocation from 'react-native-geolocation-service';
import { useLocation } from '../../context/LocationContext';
import { RunningText } from './components/RunningText';

import ChargingRecommend from './components/ChargingRecommend';
import LoadingComponent from '../../shared/ui/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChargingCard from './components/ChargingCard';
import axios from 'axios';
import { getNearestChargingStationsRecommend } from '../../api/stationApi';
import { useUserRole } from '../../context/UserRoleContext';

const HomeScreen = ({ navigation }: any) => {
    const { latitude, longitude, setLatitude, setLongitude } = useLocation();
    const [address, setAddress] = useState('');
    const [data, setData] = useState<any>(null);
    const [isAddressLoading, setIsAddressLoading] = useState(true);
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [isCheckCharging, setIsCheckCharging] = useState(false);
    const { role } = useUserRole();

    useEffect(() => {
        requestLocationPermission();
    }, []);

    useEffect(() => {
        if (latitude && longitude) {
            getAddressFromCoordinates(latitude, longitude);
            fetchDataRecommend();
        }
    }, [latitude, longitude]);

    useFocusEffect(
        useCallback(() => {
            const fetchCharging = async () => {
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
                }
            };

            fetchCharging();
        }, [])
    );

    const handleCharging = () => {
        navigation.dispatch(CommonActions.navigate({ name: NAVIGATIONS_ROUTE.SCREEN_STATUS_STATION }));
    };

    const requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Quyền Truy Cập Vị Trí',
                        message: 'Ứng dụng cần truy cập vị trí của bạn.',
                        buttonNeutral: 'Hỏi Lại Sau',
                        buttonNegative: 'Hủy Bỏ',
                        buttonPositive: 'OK',
                    }
                );

                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    getCurrentLocation();
                }
            } catch (err) {
                console.warn(err);
            }
        } else {
            getCurrentLocation();
        }
    };

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLatitude(latitude);
                setLongitude(longitude);
            },
            (error) => {
                console.warn(`Lỗi khi lấy vị trí: ${error.message}`);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    const getAddressFromCoordinates = async (latitude: number, longitude: number) => {
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
        try {
            const response = await axios.get(url);
            if (response.data && response.data.address) {
                const address = response.data.display_name;
                setAddress(address)
                setIsAddressLoading(false)
            } else {
                console.log('No address found');
            }
        } catch (error) {
            console.error('Error fetching address:', error);
        }
    };

    const fetchDataRecommend = async () => {
        try {
            if (latitude && longitude) {
                const res = await getNearestChargingStationsRecommend(latitude, longitude, 5000)
                setData(res);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsDataLoading(false);
        }
    };

    const handleNavUser = () => {
        navigation.dispatch(CommonActions.navigate(NAVIGATIONS_ROUTE.SCREEN_PROFILE));
    };

    const handleNavNotification = () => {
        navigation.dispatch(CommonActions.navigate(NAVIGATIONS_ROUTE.SCREEN_NOTIFICATION));
    };

    const handleNavSearchStation = (nameCharging: string) => {
        navigation.dispatch(CommonActions.navigate({ name: NAVIGATIONS_ROUTE.SCREEN_SEARCH_STATION, params: { nameCharging } }));
    };

    const handleNavDetail = (station: any) => {
        navigation.dispatch(CommonActions.navigate({ name: NAVIGATIONS_ROUTE.SCREEN_DETAIL_STATION, params: { station } }));
    };

    if (isAddressLoading || isDataLoading) {
        return <LoadingComponent />;
    }

    return (
        <ScrollView style={styles.container}>
            <LinearGradient colors={['rgba(19, 147, 114, 0.4)', '#FFFDFC']}>
                <View style={styles.topBox}>
                    <Logo height={50} width={50} />
                    <View style={styles.boxButton}>
                        <TouchableOpacity onPress={handleNavNotification}>
                            <IconBell height={50} width={50} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleNavUser}>
                            <Image source={require('../../../asset/image/avatar.jpg')} style={styles.image} />
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    role == 'technical' ? <Text style={styles.textSub}> Techical Support, Xin Chào! </Text>
                        : <Text style={styles.textSub}> VietEV, Xin Chào! </Text>
                }

                <View style={styles.boxGPS}>
                    <View style={styles.buttonGPS}>
                        <View style={styles.iconGPS}>
                            <IconGPS />
                        </View>
                        <View style={styles.marqueeContainer}>
                            <RunningText text={address} />
                        </View>
                    </View>
                </View>

                {!isCheckCharging ? (
                    <ChargingRecommend
                        _id={data?._id}
                        nameCharging={data?.properties.stationName}
                        location={data?.properties.address}
                        power={'_ _'}
                        star={data?.properties.rating}
                        totalSlot={role == 'technical' ? 'NEED ACTIVE' : `${data?.properties.totalChargingPorts} cổng sạc`}
                        open_status={data?.properties.openingHours}
                        distance={data?.dist.calculated}
                        action={() => handleNavDetail(data)}
                    />
                ) : (
                    <ChargingCard action={handleCharging} />
                )}
                <View style={{ height: 20 }}></View>
            </LinearGradient>
            <View style={styles.brandBox}>
                <View>
                    {
                        role == 'technical' ? <Text style={styles.textBrand}>Các trạm sạc cần sửa</Text> :

                            <View><Text style={styles.textBrand}>Các hãng sạc đề xuất</Text>
                                <Text>Các hãng sạc bạn có thể biết</Text>
                            </View>
                    }

                </View>
                <View>
                    <IconVector height={22} width={22} />
                </View>
            </View>
            {
                role == 'technical' ? <View style={{ marginRight: 15, marginLeft: 20 }}>
                    <BoxBrand
                        uri={require('../../../asset/image/image_fpt.jpg')}
                        title='VietEV'
                        action={() => handleNavSearchStation('VietEV')}
                        count={'3'}
                    />
                </View> :
                    <ScrollView horizontal style={{ marginHorizontal: 16, marginBottom: 20 }}>
                        <View style={{ marginRight: 15 }}>
                            <BoxBrand
                                uri={require('../../../asset/image/image_fpt.jpg')}
                                title='VietEV'
                                action={() => handleNavSearchStation('VietEV')}
                                count={'3'}
                            />
                        </View>
                        <View style={{ marginRight: 15 }}>
                            <BoxBrand
                                uri={require('../../../asset/image/vinfast.png')}
                                title='VinFast'
                                action={() => handleNavSearchStation('Vinfast charging station')}
                                count={'20'}
                            />
                        </View>
                        <View style={{ marginRight: 15 }}>
                            <BoxBrand
                                uri={require('../../../asset/image/EVOne.jpg')}
                                title='EV One'
                                action={() => handleNavSearchStation('EV ONE Charging Station')}
                                count={'2'}
                            />
                        </View>
                        <View style={{ marginRight: 15 }}>
                            <BoxBrand
                                uri={require('../../../asset/image/charge++.jpg')}
                                title='Ever Charge'
                                action={() => handleNavSearchStation('EverCharge')}
                                count={'1'}
                            />
                        </View>
                    </ScrollView>
            }

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topBox: {
        marginTop: 12,
        marginHorizontal: 16,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    boxButton: {
        flexDirection: 'row',
    },
    image: {
        marginLeft: 16,
        width: 50,
        height: 50,
        borderRadius: 50,
    },

    iconGPS: {
        flex: 0.1,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    textSub: {
        color: Colors.black,
        fontSize: 20,
        marginHorizontal: 16,
        fontWeight: '700',
        marginVertical: 10,
    },
    textBrand: {
        marginVertical: 10,
        color: 'black',
        fontSize: 18,
        fontWeight: '600',
    },
    buttonGPS: {
        marginHorizontal: 16,
        marginVertical: 10,
        alignItems: 'center',
        flexDirection: 'row',
    },
    brandBox: {
        marginHorizontal: 16,
        marginVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    boxGPS: {
        justifyContent: 'center',
        marginHorizontal: 16,
        marginTop: 25,
        marginBottom: 15,
        height: 45,
        borderWidth: 1,
        borderColor: '#EEEEEE',
        backgroundColor: '#FFFDFC',
        borderRadius: 12,
        shadowColor: '#333333',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 6,
        shadowOpacity: 0.8,
        elevation: 14,
    },
    marqueeContainer: {
        flex: 1,
        overflow: 'hidden',
        height: 20,
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
});

export default HomeScreen;
