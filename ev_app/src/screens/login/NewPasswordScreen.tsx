import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import BoxDetail from './components/BoxDetail';
import ButtonBasic from '../../shared/ui/ButtonBasic';
import IconEye from '../../shared/icons/ic_eye.svg';
import BaseModal from '../../shared/ui/BaseModal';
import { CommonActions } from '@react-navigation/native';
import { NAVIGATIONS_ROUTE } from '../../navigation/Routes';
import * as Colors from '../../shared/theme/Colors';
import IconEyeHidden from '../../shared/icons/ic_eye_hiden.svg';
import { changePassword } from '../../api/auth';

export default function NewPasswordScreen({ navigation, route }: any) {
    const [isLoading, setIsLoading] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [password, setPassword] = useState('')
    const [isPassword, setIsPassword] = useState(true);
    const [repeatPassword, setRepeatPassword] = useState('')
    const [isRepeatPassword, setIsRepeatPassword] = useState(true);
    const { phone } = route.params;

    const handleModal = async () => {
        if (password?.length >= 6 && password == repeatPassword) {
            try{
                setIsLoading(true)
            const res = await changePassword (phone, password )
            if (res.status == 200) {
                setIsVisible(true)
            } else {
                Alert.alert ('Thay đổi không thành công!')
            }
        } catch (error) {
            console.error()
            Alert.alert("Lỗi dữ liệu!")
        } finally {
            setIsLoading(false)
        }
        }else {
            Alert.alert ('Mật khẩu chưa trùng khớp hoặc sai định dạng!!!')
        }
    }

    const handleConfirm = () => {
        navigation.dispatch(CommonActions.navigate({ name: NAVIGATIONS_ROUTE.SCREEN_LOGIN }))
    }
    const handlePass = () => {
        setIsPassword(!isPassword);
    };
    const handleRepeatPass = () => {
      setIsRepeatPassword(!isRepeatPassword);
    };
    return (
        <View style={styles.container}>
            <View style={styles.newPassContainer}>
                <Text style={styles.newPassword}>Đặt lại mật khẩu</Text>
                <View style={styles.boxNewPass}>
                <View style={styles.boxPassword}>
            <BoxDetail
              title='Mật khẩu'
              placeholder='Mật khẩu gồm ít nhất 6 kí tự'
              onChangeText={(text: string) => setPassword(text)}
              isPassword={isPassword}
            />
            <TouchableOpacity onPress={handlePass}>
              {!isPassword ? <IconEye style={styles.eye} /> : <IconEyeHidden style={styles.eye} />}
            </TouchableOpacity>
          </View>
          <View style={styles.boxPassword}>
            <BoxDetail
              title='Xác nhận mật khẩu'
              placeholder='Nhập lại mật khẩu của bạn'
              onChangeText={(text: string) => setRepeatPassword(text)}
              isPassword={isRepeatPassword}
            />
            <TouchableOpacity onPress={handleRepeatPass}>
              {!isRepeatPassword ? <IconEye style={styles.eye} /> : <IconEyeHidden style={styles.eye} />}
            </TouchableOpacity>
          </View>
                </View>
                <ButtonBasic
                    action={handleModal}
                    titleStyle={styles.button}
                    title='Đổi mật khẩu'
                />
            </View>
            <BaseModal
                action={handleConfirm}
                isVisible={isVisible}
                title='Đặt lại mật khẩu thành công'
                information='Bạn đã đặt lại mật khẩu thành công.  Quay trở lại đăng nhập để vào app.'
                textButton='Đăng nhập' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    newPassContainer: {
        width: '90%',
    },
    newPassword: {
        marginVertical: 30,
        fontSize: 22.75,
        color: 'black',
        paddingHorizontal: 10,
        fontWeight: '700',
    },
    boxNewPass: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowRadius: 7,
        shadowOpacity: 0.4,
        elevation: 12,
        width: '100%',
        height: 156,
    },
    boxPassword: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    eye: {
        marginRight: 10,
        width: 24,
        height: 24,
    },
    button: {
        backgroundColor: '#139372',
        paddingVertical: 10,
        paddingHorizontal: 30,

        marginTop: 40,
        textAlign: 'center',
    },

});
