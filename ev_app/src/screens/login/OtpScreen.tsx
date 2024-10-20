import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native'
import ButtonBasic from '../../shared/ui/ButtonBasic'
import BoxOtp from './components/BoxOtp';
import { CommonActions } from '@react-navigation/native';
import { NAVIGATIONS_ROUTE } from '../../navigation/Routes';
import * as Colors from '../../shared/theme/Colors'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import BaseModal from '../../shared/ui/BaseModal';
import axiosClient from '../../api/axiosClient';
import LoadingComponent from '../../shared/ui/Loading';

export default function OtpScreen({ navigation, route }: any) {
    const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | undefined>();
    const [isVisible, setIsVisible] = useState(false)
    const phone = route.params.phone;
    const phoneNumber = phone;
    const password = route?.params?.password;
    const screen = route.params.screen;
    const timeCountDown = 60;
    const [isLoading, setIsLoading] = useState(false)
    const [otpArray, setOtpArray] = useState(Array(6).fill(''));
    const [timeCount, setTimeCount] = useState(timeCountDown);
    const refs = useRef<Array<TextInput | null>>(Array(6).fill(null));

    useEffect(() => {
        const getConfirmation = async () => {
            setIsLoading(true)
            try {
                const standardizedPhone = phone.startsWith('0') ? '+84' + phone.slice(1) : phone;
                const confirmation = await auth().signInWithPhoneNumber(standardizedPhone);
                setConfirm(confirmation);
            } catch (error) {
                console.log(error);
                Alert.alert('Lỗi', 'Gửi mã OTP thất bại. Vui lòng thử lại.');
            } finally {
                setIsLoading(false);
            }
        };
        getConfirmation();
    }, []);

    useEffect(() => {
        if (timeCount === 0) return;
        const timerId = setTimeout(() => {
            setTimeCount(timeCount - 1);
        }, 1000);
        return () => clearTimeout(timerId);
    }, [timeCount]);

    const handleOtpChange = (data: string, index: number) => {
        const newOtpArray = [...otpArray];
        newOtpArray[index] = data;
        setOtpArray(newOtpArray);
        if (data.length === 1 && index < otpArray.length - 1 && refs.current[index + 1]) {
            refs.current[index + 1]?.focus();
        }
    };

    const handleRegisterSuccess = async () => {
        setIsLoading(true);
        try {
            const response = await axiosClient.post('/auth/register', { phoneNumber, password });
            if (!response.data.success) {
                Alert.alert('Thông báo', 'Số điện thoại đã tồn tại!');
            } else {
                setIsVisible(true);
            }
        } catch (error) {
            Alert.alert('Lỗi', 'Đăng ký thất bại. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    }

    const handleConfirm = () => {
        navigation.dispatch(CommonActions.navigate({ name: NAVIGATIONS_ROUTE.SCREEN_LOGIN }));
    }

    const verifyOtpCode = async () => {
        setIsLoading(true);
        try {
            const otpCode = otpArray.join('');
            if (otpCode.length === 6 && confirm) {
                await confirm.confirm(otpCode);
                if (screen === 'register') {
                    handleRegisterSuccess();
                } else {
                    navigation.dispatch(CommonActions.navigate({ name: NAVIGATIONS_ROUTE.SCREEN_NEW_PASSWORD, params: { phone } }));
                }
            } else {
                Alert.alert('Lỗi', 'Mã xác nhận chưa đúng!');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Lỗi', 'Xác thực OTP thất bại. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        isLoading ? <LoadingComponent /> :
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <View style={styles.containerOtp}>
                            <Text style={styles.otp}>Nhập mã xác thực</Text>
                            <Text style={styles.information}>Vui lòng nhập OTP được gửi đến số điện thoại {phone}</Text>
                            <View style={styles.otpBox}>
                                {otpArray.map((value, index) => (
                                    <BoxOtp
                                        key={index}
                                        parentCallback={(data: string) => handleOtpChange(data, index)}
                                        ref={(ref: TextInput | null) => (refs.current[index] = ref)}
                                    />
                                ))}
                            </View>
                        </View>
                        <ButtonBasic action={verifyOtpCode} titleStyle={styles.button} title='Xác nhận' />
                        <BaseModal
                            action={handleConfirm}
                            isVisible={isVisible}
                            title='Đăng ký thành công'
                            information='Chúc mừng bạn đã tạo tài khoản thành công! Hãy đăng nhập để có những trải nghiệm'
                            textButton='Đăng nhập' />
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
        fontWeight: '700',
    },
    information: {
        fontSize: 12,
        color: Colors.black,
        paddingHorizontal: 10,
        fontWeight: '400',
    },
    otpBox: {
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        flexDirection: 'row',
    },
    reSent: {
        fontSize: 15,
        color: Colors.primaryGreen,
        fontWeight: '500',
    },
});
