import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Header from '../account/component/Header';
import IconCar from '../../shared/icons/ic_car2.svg';
import ButtonBasic from '../../shared/ui/ButtonBasic';
import IconBox from '../../shared/icons/ic_box.svg';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { NAVIGATIONS_ROUTE } from '../../navigation/Routes';
import { getPaymentStation } from '../../api/payment';
import LoadingComponent from '../../shared/ui/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatTime } from '../../utils/formatTime';
import { formatCurrency } from '../../utils/formatMoney';

interface Props {
    navigation: any;
}

export default function PaymentScreen({ navigation }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<any>([]);
    const [user, setUser] = useState<{ _id: string } | null>(null);
    const handleNavBack = () => {
        navigation.dispatch(CommonActions.goBack());
      };
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userJSON = await AsyncStorage.getItem('user');
                if (userJSON) {
                    const userData = JSON.parse(userJSON);
                    setUser(userData);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUser();
    }, []);

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                if (user) {
                    setIsLoading(true);
                    try {
                        const res = await getPaymentStation(user._id, 'pending');
                        setData(res?.data);
                    } catch (error) {
                        console.error('Error fetching payment station data:', error);
                        Alert.alert('Thông báo', 'Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau!');
                    } finally {
                        setIsLoading(false);
                    }
                }
            };

            fetchData();
        }, [user])
    );
    const handleNavSuccess = () => {
        if (data) {
        navigation.dispatch(CommonActions.navigate({ name: NAVIGATIONS_ROUTE.SCREEN_VNPAY, params: { amount: data?.price, orderId: data?._id } }));
        } else {
            Alert.alert('Chưa có đơn hàng cần thanh toán!')
        }
    };

    return (
        isLoading ? <LoadingComponent /> :
        <View style={styles.container}>
            <Header title='Thanh toán' action={handleNavBack} />
            <View style={styles.content}>
                <View style={styles.image}>
                    <IconCar />
                </View>
                <View style={styles.boxText}>
                    <View style={styles.boxTime}>
                        <View style={styles.textTime}>
                            <IconBox />
                            <Text style={styles.textDetail}>Tổng thời gian sạc : </Text>
                        </View>
                        <Text style={styles.time}>{formatTime(data?.totalChargeTime)}</Text>
                    </View>
                    <View style={styles.boxTime}>
                        <View style={styles.textTime}>
                            <IconBox />
                            <Text style={styles.textDetail}>Phí : </Text>
                        </View>
                        <Text style={styles.time}>{formatCurrency(data?.pricePerKwh)}đ /KWh</Text>
                    </View>
                    <View style={styles.boxTime}>
                        <View style={styles.textTime}>
                            <IconBox />
                            <Text style={styles.textDetail}>Tổng phí : </Text>
                        </View>
                        <Text style={styles.time}>{formatCurrency(data?.price)} VNĐ</Text>
                    </View>
                </View>
                <ButtonBasic titleStyle={styles.button} title='Tiến hành thanh toán' action={handleNavSuccess} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        marginHorizontal: 16,
        marginVertical: 40,
    },
    image: {
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxText: {
        marginVertical: 10,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#FFFFFF',
        height: 150,
        paddingHorizontal: 10,
        borderRadius: 12,
    },
    button: {
        marginVertical: 30,
        backgroundColor: '#139372',
    },
    boxTime: {
        marginVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textDetail: {
        color: '#333333',
        fontSize: 14,
        fontWeight: '400',
        marginLeft: 7,
    },
    textTime: {
        flexDirection: 'row',
    },
    time: {
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 1,
    },
});
