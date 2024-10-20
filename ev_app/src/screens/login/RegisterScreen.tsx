import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, ScrollView, Dimensions, Alert } from 'react-native'
import Sercurity from './components/Sercurity'
import Logo from '../../shared/icons/image 5.svg'
import IconEye from '../../shared/icons/ic_eye.svg'
import BoxDetail from './components/BoxDetail'
import { TouchableOpacity } from 'react-native'
import ButtonBasic from '../../shared/ui/ButtonBasic'
import { CommonActions } from '@react-navigation/native'
import { NAVIGATIONS_ROUTE } from '../../navigation/Routes'
import BaseModal from '../../shared/ui/BaseModal'
import * as Colors from '../../shared/theme/Colors';
import IconEyeHidden from '../../shared/icons/ic_eye_hiden.svg';
import axiosClient from '../../api/axiosClient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LoadingComponent from '../../shared/ui/Loading'

export default function RegisterScreen({ navigation }: any) {
  const [isVisible, setIsVisible] = useState(false)
  const [isPassword, setIsPassword] = useState(true);
  const [isRepeatPassword, setIsRepeatPassword] = useState(true);
  const [phoneNumber, setphoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [isCheckedColor, setIsCheckedColor] = useState(false)
  const Height_Screen = Dimensions.get('screen').height
  const [isLoading, setIsLoading] = useState(false)
  const nameScreen = 'register'
  useEffect(() => {
    if (phoneNumber.length === 10 && password.length >= 6 && repeatPassword === password) {
      setIsCheckedColor(true);
    } else {
      setIsCheckedColor(false);
    }
  }, [phoneNumber, password, repeatPassword]);

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
  const handleRegister = async () => {
    navigation.dispatch(CommonActions.navigate({ name: NAVIGATIONS_ROUTE.SCREEN_OTP, params: { phone: phoneNumber, screen: nameScreen, password: password } }));
  }
  const handleConfirm = async () => {
    navigation.dispatch(CommonActions.navigate({ name: NAVIGATIONS_ROUTE.SCREEN_LOGIN }));
  }
  const handlePass = () => {
    setIsPassword(!isPassword);
  };
  const handleRepeatPass = () => {
    setIsRepeatPassword(!isRepeatPassword);
  };
  return (
    isLoading ? <LoadingComponent /> :
      <ScrollView >
        <View style={{ height: Height_Screen }}>
          <View style={styles.logo}>
            <Logo />
          </View>
          <View style={styles.registerContainer}>
            <Text style={styles.register}>Đăng kí</Text>
            <View style={styles.boxRegister}>
              <BoxDetail
                title='Số điện thoại'
                placeholder='Nhập số điện thoại của bạn'
                onChangeText={(text: string) => setphoneNumber(text)} />
              <View style={styles.boxPassword}>
                <BoxDetail
                  title='Mật khẩu'
                  placeholder='Mật khẩu gồm ít nhất 6 kí tự'
                  onChangeText={(text: string) => setPassword(text)}
                  isPassword={isPassword}
                />
                <TouchableOpacity onPress={handlePass} style={styles.eye} >
                  {!isPassword ? <IconEye  width={40}/> : <IconEyeHidden width={40} />}
                </TouchableOpacity>
              </View>
              <View style={styles.boxPassword}>
                <BoxDetail
                  title='Xác nhận mật khẩu'
                  placeholder='Nhập lại mật khẩu của bạn'
                  onChangeText={(text: string) => setRepeatPassword(text)}
                  isPassword={isRepeatPassword}
                />
                <TouchableOpacity onPress={handleRepeatPass} style={styles.eye}>
                  {!isRepeatPassword ? <IconEye width={40} /> : <IconEyeHidden width={40} />}
                </TouchableOpacity>
              </View>
            </View>

          </View>
          <Sercurity />
          <View style={styles.footer}>
            <ButtonBasic
              action={isCheckedColor ? handleRegisterSuccess : null}
              titleStyle={isCheckedColor ? styles.buttonColor : styles.button}
              title='Đăng ký'
            />
          </View>
          <BaseModal
            action={handleConfirm}
            isVisible={isVisible}
            title='Đăng ký thành công'
            information='Chúc mừng bạn đã tạo tài khoản thành công! Hãy đăng nhập để có những trải nghiệm'
            textButton='Đăng nhập' />
        </View>
      </ScrollView>
  )
}
const styles = StyleSheet.create({
  logo: {
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerContainer: {
    marginVertical: 10,
    marginHorizontal: 16,
  },
  register: {
    marginVertical: 10,
    fontSize: 22.75,
    color: Colors.black,
    paddingHorizontal: 10,
    fontWeight: '700'
  },
  boxPassword: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  eye: {
    marginRight: 5,
   
  },
  boxRegister: {
    marginVertical: 10,
    height: 240,
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
  },
  button: {
    backgroundColor: Colors.lightGray,
    marginHorizontal: 16,
  },
  buttonColor: {
    backgroundColor: Colors.primaryGreen,
    marginHorizontal: 16,
  },
  footer: {
    marginVertical: 20,
  }
})
