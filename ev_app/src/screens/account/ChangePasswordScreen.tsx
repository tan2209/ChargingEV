import React from 'react'
import { View, StyleSheet} from 'react-native'
import IconEye from '../../shared/icons/ic_eye.svg'
import BoxDetail from '../login/components/BoxDetail'
import { TouchableOpacity } from 'react-native'
import ButtonBasic from '../../shared/ui/ButtonBasic'
import Header from './component/Header'
import { CommonActions } from '@react-navigation/native'
export default function ChangePasswordScreen({navigation} : any) {
    const handleNavBack = () => {
        navigation.dispatch(CommonActions.goBack)
    }
    return (
        
        <View>
            <Header title='Đổi mật khẩu' action={handleNavBack}/>
            <View style={styles.registerContainer}>

                <View style={styles.boxChangePass}>
                    <View style={styles.boxPassword}>
                        <BoxDetail
                            title='Mật khẩu cũ'
                            placeholder='Nhập mật khẩu cũ'
                        />
                        <TouchableOpacity>
                            <IconEye style={styles.eye} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.boxPassword}>
                        <BoxDetail
                            title='Mật khẩu mới'
                            placeholder='Mật khẩu gồm ít nhất 6 kí tự'
                        />
                        <TouchableOpacity>
                            <IconEye style={styles.eye} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.boxPassword}>
                        <BoxDetail
                            title='Xác nhận mật khẩu'
                            placeholder='Nhập lại mật khẩu của bạn'
                        />
                        <TouchableOpacity>
                            <IconEye style={styles.eye} />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
            <ButtonBasic
                titleStyle={styles.button}
                title='Đổi mật khẩu'
            />
        </View>
    )
}
const styles = StyleSheet.create({
    
    registerContainer: {
        marginVertical: 10,
        marginHorizontal: 16,
    },
    boxPassword: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    eye: {
        marginRight: 10,
        width: 10,
    },
    boxChangePass: {
        marginVertical: 10,
        height: 240,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        borderColor: 'FAF7F5',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowRadius: 7,
        shadowOpacity: 0.4,
        elevation: 12,
    },
    button: {
        backgroundColor: '#969799',
        marginHorizontal: 16,
    },

})
