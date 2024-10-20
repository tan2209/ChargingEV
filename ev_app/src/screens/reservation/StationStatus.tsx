import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import IconCar from '../../shared/icons/ic_car2.svg';
import IconElectric from '../../shared/icons/ic_elec.svg';
import ButtonBasic from '../../shared/ui/ButtonBasic';
import IconBox from '../../shared/icons/ic_box.svg';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { NAVIGATIONS_ROUTE } from '../../navigation/Routes';
import { postOrder } from '../../api/payment';
import { calculateDurationInSeconds, formatTime, formatTimeDate } from '../../utils/formatTime';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postStatus } from '../../api/bookingApi';
import Header from '../account/component/Header';
import { updateStatus } from '../../api/stationApi';
import LoadingComponent from '../../shared/ui/Loading';

interface Props {
    navigation: any;
    route: any;
}

export default function StationStatus({ navigation, route }: Props) {
    const [user, setUser] = useState<{ _id: string } | null>(null);
    const [endTime, setEndTime] = useState<string | undefined>();
    const [totalTime, setTotalTime] = useState<string>('00:00:00');
    const [currentTime, setCurrentTime] = useState<any>('');
    const [stationName,  setStationName] = useState<any>('');
    const [isLoading, setIsLoading] = useState(false);
console.log(stationName)
    useFocusEffect(
        useCallback(() => {
            const fetchCharging = async () => {
                setIsLoading(true)
                try {
                    const values = await AsyncStorage.multiGet(['currentTime', 'stationName']);
                    setCurrentTime(values[0][1])
                    setStationName(values[1][1])
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setIsLoading(false)
                }
            };
            
            fetchCharging(); 
        }, [])
    );
    
   
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userJSON = await AsyncStorage.getItem('user');
                if (userJSON) {
                    const userData = JSON.parse(userJSON);
                    setUser(userData);
                }
            } catch (error) {
                console.error('Error fetching user data from AsyncStorage:', error);
            }
        };

        fetchUser();
    }, []);


    const handleNavSuccess = async () => {
        await removeCurrentTimeAndStation()
         navigation.dispatch(CommonActions.navigate({ name:"Thanh toán" }));
    };
    const handleNavBack = () => {
        navigation.dispatch(CommonActions.navigate({ name:"Trang chủ" }));
      };
      const removeCurrentTimeAndStation = async () => {
        try {
            await AsyncStorage.multiRemove(['currentTime', 'stationName']);
            console.log('Xóa thời gian hiện tại và tên trạm thành công!');
        } catch (error) {
            console.error('Lỗi khi xóa thời gian hiện tại và tên trạm:', error);
        }
    };
    
    const fetchDataStatus = async () => {
        setIsLoading(true)
        try {
            if (stationName == 'Box Test 1') {
                 const res = await postStatus('off1');
            } else if (stationName == 'Box Test 2') {
                const res = await postStatus('off2');
            } else  {
                const res = await postStatus('off3');
            }
            await updateStatus( stationName, false)
            const currentEndTime = new Date();
            setEndTime(formatTimeDate(currentEndTime));
            const totalTimeNum = calculateDurationInSeconds(currentTime, currentEndTime);
            setTotalTime(formatTime(totalTimeNum));
            if (user) {
                const OrderData = {
                    userId: user._id,
                    totalChargeTime: totalTimeNum,
                    paymentStatus: 'pending',
                };
                const resOrder = await postOrder(OrderData);
                if (resOrder?.status === 201) {
                     handleNavSuccess()
                } else {
                    Alert.alert ('Lỗi dữ liệu!')
                }
               
            } else {
                Alert.alert('Thông báo', 'Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại!');
            }
        } catch (error) {
            console.error('Error while posting order:', error);
            Alert.alert('Thông báo', 'Đã xảy ra lỗi khi xử lý. Vui lòng thử lại sau!');
        } finally {
            setIsLoading(false)
        }
    };

    return (
        isLoading ? <LoadingComponent /> : 
        <View style={styles.container}>
             <Header title='Trạng thái sạc' action={handleNavBack} />
            <View style={styles.content}>

                <View style={styles.image}>
                    <IconCar />
                    <View style={styles.rowBox}>

                        <View style={[styles.box, { backgroundColor: '#65E8AC', width: '50%', flexDirection: 'row' }]}>
                            <IconElectric />
                            <Text style={styles.text}> 10%</Text>
                        </View>

                        <View style={[styles.box, { backgroundColor: '#FFFFFF', width: '50%' }]}>
                            <Text style={styles.time}>{totalTime}</Text>
                            <Text>Tổng thời gian sạc</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.boxText}>
                    <View style={styles.boxTime}>
                        <View style={styles.textTime}>
                            <IconBox />
                            <Text style={styles.textDetail}>Thời gian booking: </Text>
                        </View>
                        <Text></Text>
                    </View>
                    <View style={styles.boxTime}>
                        <View style={styles.textTime}>
                            <IconBox />
                            <Text style={styles.textDetail}>Thời gian bắt đầu phiên sạc: </Text>
                        </View>
                        <Text style={styles.time}>{formatTimeDate(currentTime)}</Text>
                    </View>
                    <View style={styles.boxTime}>
                        <View style={styles.textTime}>
                            <IconBox />
                            <Text style={styles.textDetail}>Thời gian kết thúc phiên sạc: </Text>
                        </View>
                        <Text style={styles.time}>{endTime}</Text>
                    </View>
                </View>
                <Text style={styles.alert}>Vui lòng đợi trong giây lát để thanh chắn hạ trong an toàn: </Text>
                <ButtonBasic
                    titleStyle={styles.button}
                    title="Dừng sạc"
                    action={fetchDataStatus}
                />
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
        marginVertical: 50,
    },
    image: {
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowBox: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    box: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#C4C4C4',
        height: 60,
        paddingHorizontal: 10,
        borderRadius: 12,
    },
    text: {
        color: 'black',
        fontSize: 20,
        fontWeight: '700',
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
    alert: {
        marginVertical: 10,
        marginHorizontal: 15,
        color: '#4184F2',
        fontSize: 12,
    },
    button: {
        marginVertical: 30,
        backgroundColor: '#139372',
    },
    boxTime: {
        marginVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textDetail: {
        color: '#333333',
        fontSize: 14,
        fontWeight: '400',
        alignContent: 'center',
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
