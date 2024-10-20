import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert, TextInput } from 'react-native';
import ButtonBasic from '../../shared/ui/ButtonBasic';
import { CommonActions, StackActions } from '@react-navigation/native';
import { NAVIGATIONS_ROUTE } from '../../navigation/Routes';
import BoxOtp from '../login/components/BoxOtp';
import { postStatus, postVerifiableCode } from '../../api/bookingApi';
import BaseModal from '../../shared/ui/BaseModal';
import * as Colors from '../../shared/theme/Colors'
import LoadingComponent from '../../shared/ui/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateStatus } from '../../api/stationApi';

export default function ChargingCodeScreen({ navigation , route}: any) {
    const timeCountDown = 60;
    const [isLoading, setIsLoading] = useState(false)
    const [startTime, setStartTime] = useState()
    const [otpArray, setOtpArray] = useState(Array(6).fill(''));
    const [isVisible, setIsVisible] = useState(false);
    const [timeCount, setTimeCount] = useState(timeCountDown);
    const refs = useRef<Array<TextInput | null>>(Array(6).fill(null));
    const { stationName } = route.params;
   
    useEffect(() => {
        if (timeCount === 0) return;
        const timerId = setTimeout(() => {
            setTimeCount(timeCount - 1);
        }, 1000);

        return () => clearTimeout(timerId);
    }, [timeCount]);
    const callbackFunction = (data: any, index: number) => {
        const newOtpArray = [...otpArray];
        newOtpArray[index] = data;
        setOtpArray(newOtpArray);
        if (data.length === 1 && index < otpArray.length - 1 && refs.current[index + 1]) {
            refs.current[index + 1]?.focus();
        }
    };

    const fetchDataCode = async () => {
        setIsLoading(true)
        try {
            const otpCode = otpArray.join('');
            if (otpCode.length === 6) {
                const res = await postVerifiableCode(otpCode, stationName);
                if (res.success == true) {
                    setStartTime(res.currentTime)
                    setIsVisible(true);
                    await updateStatus (stationName, true)
                } else {
                    Alert.alert('Mã xác nhận chưa đúng!');
                }
            } else {
                Alert.alert('Vui lòng nhập mã gồm 6 chữ số');
            }
        } catch (error) {
            console.error()
        } finally {
            setIsLoading(false)
        }
        
    };
    const saveCurrentTimeAndStation = async (currentTime: any, stationName: string) => {
        try {
            await AsyncStorage.multiSet([
                ['currentTime', currentTime],
                ['stationName', stationName]
            ]);
            console.log('Lưu thời gian hiện tại và tên trạm thành công!');
        } catch (error) {
            console.error('Lỗi khi lưu thời gian hiện tại và tên trạm:', error);
        }
    };
    
    const handleNavSuccess = () => {
        setIsVisible(false);
        saveCurrentTimeAndStation(startTime, stationName);
        navigation.dispatch(
            StackActions.replace(NAVIGATIONS_ROUTE.SCREEN_STATUS_STATION, { currentTime: startTime, stationName: stationName })
        );
    };
    
    const handleSentOtp = async () => {
        if (stationName == 'Box Test 1') {
            const res = await postStatus("sent1");
          } else if (stationName == 'Box Test 2') {
            const res = await postStatus("sent2");
          } else if (stationName == 'Box Test 3') {
            const res = await postStatus("sent3");
          } else {
            const res = await postStatus("sent0");
          }
        setTimeCount(timeCountDown)
    }
    

    return (
        isLoading ? <LoadingComponent /> :
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <View style={styles.containerOtp}>
                            <Text style={styles.otp}>Nhập mã kết nối</Text>
                            <Text style={styles.information}>Vui lòng nhập mã được hiển thị trên màn hình trụ sạc</Text>
                            <View style={styles.otpBox}>
                                {otpArray.map((value, index) => (
                                    <BoxOtp
                                        key={index}
                                        parentCallback={(data: any) => callbackFunction(data, index)}
                                        ref={(ref: TextInput | null) => (refs.current[index] = ref)}
                                    />
                                ))}
                            </View>
                            <View style={styles.sentOtp}>
                                <Text style={styles.sent}>Gửi lại mã sau {timeCount}s  </Text>
                                {timeCount == 0 && <TouchableOpacity onPress={handleSentOtp}>
                                    <Text style={styles.reSent}>Gửi mã</Text>
                                </TouchableOpacity>}
                            </View>

                        </View>
                        <ButtonBasic action={fetchDataCode} titleStyle={styles.button} title='Xác nhận' />
                        <BaseModal
                            action={handleNavSuccess}
                            isVisible={isVisible}
                            title='Xác nhận thành công'
                            information='Hãy theo dõi quá trình sạc'
                            textButton='My charging'
                        />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    containerOtp: {
        marginVertical: 30,
        marginHorizontal: 16,
    },
    otp: {
        marginVertical: 10,
        fontSize: 22.75,
        color: Colors.black,
        paddingHorizontal: 10,
        fontWeight: '700'
    },
    information: {
        fontSize: 12,
        color: Colors.black,
        paddingHorizontal: 10,
        fontWeight: '400'
    },
    otpBox: {
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    sent: {
        fontSize: 14,
        color: Colors.lightGray,
        fontWeight: '500',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: Colors.primaryGreen,
        marginVertical: 20,
        marginHorizontal: 16,
    },
    sentOtp: {
        flexDirection: 'row'
    },
    reSent: {
        fontSize: 15,
        color: Colors.primaryGreen,
        fontWeight: '500',
    }
});
