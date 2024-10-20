import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import Logo from '../../shared/icons/image 5.svg';
import IconEye from '../../shared/icons/ic_eye.svg';
import IconEyeHidden from '../../shared/icons/ic_eye_hiden.svg';
import IconCheck from '../../shared/icons/ic_check.svg';
import ButtonBasic from '../../shared/ui/ButtonBasic';
import BoxDetail from './components/BoxDetail';
import { CommonActions } from '@react-navigation/native';
import { NAVIGATIONS_ROUTE } from '../../navigation/Routes';
import * as Colors from '../../shared/theme/Colors';
import LoadingComponent from '../../shared/ui/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosClient from '../../api/axiosClient';
import {  useUserRole } from '../../context/UserRoleContext'; 

export default function LoginScreen({ navigation }: any) {
    const [isChecked, setIsChecked] = useState(false);
    const [isPassword, setIsPassword] = useState(true);
    const [phoneNumber, setphoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [isCheckedColor, setIsCheckedColor] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { updateRole } = useUserRole();

    useEffect(() => {
        if (phoneNumber.length === 10 && password.length >= 6) {
            setIsCheckedColor(true);
        } else {
            setIsCheckedColor(false);
        }
    }, [phoneNumber, password]);

    const handleNav = () => {
        navigation.dispatch(CommonActions.navigate({ name: NAVIGATIONS_ROUTE.SCREEN_REGISTER }));
    };

    const handleNavPassword = () => {
        navigation.dispatch(CommonActions.navigate({ name: NAVIGATIONS_ROUTE.SCREEN_FORGET_PASSWORD }));
    };

    const handleConfirm = async () => {
        setIsLoading(true);
        try {
            const response = await axiosClient.post('/auth/login', {
                phoneNumber,
                password,
            });
            if (response.data.success) {
                await saveAccessToken(response.data.access_token);
                await AsyncStorage.setItem('user', JSON.stringify(response.data.user));

                const userRole = response.data.user.role;
                await updateRole(userRole); 
                await AsyncStorage.setItem('userRole', userRole); // Lưu vào AsyncStorage

                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: NAVIGATIONS_ROUTE.BOTTOM_NAVIGATION }],
                    })
                );
            } else {
                Alert.alert('Thông báo', 'Tên người dùng hoặc mật khẩu không đúng. Vui lòng thử lại!');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
    };

    const handlePass = () => {
        setIsPassword(!isPassword);
    };

    const saveAccessToken = async (accessToken: string) => {
        try {
            await AsyncStorage.setItem('accessToken', accessToken);
            console.log('AccessToken đã được lưu vào AsyncStorage.');
        } catch (error) {
            console.error('Lỗi khi lưu AccessToken vào AsyncStorage:', error);
        }
    };

    return isLoading ? (
        <LoadingComponent />
    ) : (
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <View style={styles.logo}>
                        <Logo />
                    </View>
                    <View style={styles.loginContainer}>
                        <Text style={styles.login}>Đăng nhập</Text>
                        <View style={styles.boxLogin}>
                            <BoxDetail
                                title="Số điện thoại"
                                placeholder="Nhập số điện thoại của bạn"
                                onChangeText={(text: string) => setphoneNumber(text)}
                            />
                            <View style={styles.boxPassword}>
                                <BoxDetail
                                    title="Mật khẩu"
                                    placeholder="Mật khẩu gồm ít nhất 6 kí tự"
                                    isPassword={isPassword}
                                    onChangeText={(text: string) => setPassword(text)}
                                />
                                <TouchableOpacity onPress={handlePass} style={styles.eye}>
                                    {!isPassword ? <IconEye width={40} /> : <IconEyeHidden width={40} />}
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.checkBox}>
                            <TouchableOpacity onPress={toggleCheckbox} style={[styles.box, isChecked ? { backgroundColor: Colors.primaryGreen } : null]}>
                                {isChecked ? <IconCheck /> : <></>}
                            </TouchableOpacity>
                            <Text style={styles.save}>Lưu mật khẩu</Text>
                            <TouchableOpacity onPress={handleNavPassword}>
                                <Text style={styles.forgetPassword}>Quên mật khẩu</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.footer}>
                            <ButtonBasic
                                action={isCheckedColor ? handleConfirm : null}
                                titleStyle={isCheckedColor ? styles.buttonColor : styles.button}
                                title="Đăng nhập"
                            />
                            <View style={styles.register}>
                                <Text style={styles.question}>Chưa có tài khoản?</Text>
                                <TouchableOpacity onPress={handleNav}>
                                    <Text style={styles.forgetPassword}>Đăng kí ngay</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    logo: {
        flex: 0.25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginContainer: {
        flex: 0.7,
        marginVertical: 10,
        marginHorizontal: 16,
    },
    login: {
        marginVertical: 10,
        fontSize: 22.75,
        color: Colors.black,
        paddingHorizontal: 10,
        fontWeight: '700',
    },
    boxLogin: {
        marginVertical: 10,
        flexDirection: 'column',
        backgroundColor: Colors.white,
        borderRadius: 20,
        borderColor: Colors.lightGray,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowRadius: 7,
        shadowOpacity: 0.4,
        elevation: 12,
        height: 156,
    },
    boxPassword: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    eye: {
        justifyContent: 'center',
        marginRight: 5,
    },
    checkBox: {
        marginBottom: 40,
        marginVertical: 10,
        flexDirection: 'row',
    },
    box: {
        height: 18,
        width: 18,
        borderColor: Colors.lightGray,
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    forgetPassword: {
        fontSize: 14,
        color: Colors.primaryGreen,
        fontWeight: '500',
        justifyContent: 'center',
    },
    save: {
        width: '60%',
        fontSize: 14,
        color: Colors.black,
        paddingHorizontal: 10,
        fontWeight: '500',
        justifyContent: 'center',
    },
    buttonColor: {
        backgroundColor: Colors.primaryGreen,
        marginHorizontal: 16,
    },
    button: {
        backgroundColor: Colors.lightGray,
        marginHorizontal: 16,
    },
    register: {
        flexDirection: 'row',
        marginVertical: 10,
        alignContent: 'center',
        justifyContent: 'center',
    },
    question: {
        fontSize: 14,
        color: Colors.black,
        paddingHorizontal: 5,
        fontWeight: '400',
    },
    footer: {
        flex: 1,
        justifyContent: 'center',
    },
});
