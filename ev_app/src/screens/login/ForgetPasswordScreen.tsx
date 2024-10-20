import React, { useState } from 'react'
import { View, StyleSheet, Text, Alert } from 'react-native'
import BoxDetail from './components/BoxDetail'
import ButtonBasic from '../../shared/ui/ButtonBasic'
import { CommonActions } from '@react-navigation/native'
import { NAVIGATIONS_ROUTE } from '../../navigation/Routes'
import * as Colors from '../../shared/theme/Colors'
import { checkPhoneNumber } from '../../api/auth'
import LoadingComponent from '../../shared/ui/Loading'
import { Screen } from 'react-native-screens'

export default function ForgetPasswordScreen({navigation} : any) {
    const [phone, setPhone] = useState('')
    const [isLoading, setIsLoading] = useState (false)
    const nameScreen = 'forgetPassword'
    const handleSendCode = async () => {
        setIsLoading(true)
          try {
            const res = await checkPhoneNumber(phone);
            if (res) {
                navigation.dispatch(CommonActions.navigate({ name: NAVIGATIONS_ROUTE.SCREEN_NEW_PASSWORD, params: {phone: phone, screen: nameScreen} }));
            } else {
                Alert.alert('Số điện thoại chưa đăng ký!.');
            }
            
          } catch (error) {
            console.error(error);
          } finally {
                setIsLoading(false)
            }
        };
      
    return (
        isLoading ? <LoadingComponent /> :
        <View> 
            <View style={styles.containerForget}>
                <Text style={styles.forget}>Quên mật khẩu</Text>
                <Text style={styles.information}>Nhập số điện thoại của bạn để nhận OTP</Text>
                <View style={styles.boxForget}>
                    <BoxDetail
                        title='Số điện thoại'
                        placeholder='Nhập số điện thoại của bạn'
                        onChangeText={(text: string) => setPhone(text)}
                    />
                </View>
            </View>
            <ButtonBasic action={handleSendCode} titleStyle={styles.button} title='Gửi mã' />
        </View>
    )
}

const styles = StyleSheet.create({
    containerForget: {
        marginVertical: 30,
        marginHorizontal: 16,
    },
    forget: {
        marginVertical: 10,
        fontSize: 22.75,
        color: Colors.black,
        paddingHorizontal: 10,
        fontWeight: '700'
    },
    information: {
        marginVertical: 10,
        fontSize: 12,
        color: Colors.black,
        paddingHorizontal: 10,
        fontWeight: '400'
    },
    boxForget: {
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
        height: 78,
    },
    button: {
        backgroundColor: Colors.primaryGreen,
        marginVertical: 20,
        marginHorizontal:16,
    },
})
