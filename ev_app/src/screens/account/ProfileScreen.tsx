import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import BoxProfile from './component/BoxProfile'
import ButtonBase from '../../shared/ui/ButtonBase'
import IconLogout from '../../shared/icons/ic_logout.svg'
import { CommonActions } from '@react-navigation/native'
import { NAVIGATIONS_ROUTE } from '../../navigation/Routes'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function ProfileScreen({ navigation }: any) {
    const [user, setUser] = useState<any>(null);
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
    const handleNavBack = () => {
        navigation.dispatch(CommonActions.goBack)
    }
    const handleNav = async () => {
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('userRole');
        navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: NAVIGATIONS_ROUTE.SCREEN_LOGIN }], }))
    }
    const handleNavUseScreen = () => {
        navigation.dispatch(CommonActions.navigate(NAVIGATIONS_ROUTE.SCREEN_USER))
    }
    const handleNavPolicyScreen = () => {
        navigation.dispatch(CommonActions.navigate(NAVIGATIONS_ROUTE.SCREEN_POLICY))
    }
    const handleNavSupportScreen = () => {
        navigation.dispatch(CommonActions.navigate(NAVIGATIONS_ROUTE.SCREEN_SUPPORT))
    }
    const handleNavSettingScreen = () => {
        navigation.dispatch(CommonActions.navigate(NAVIGATIONS_ROUTE.SCREEN_SETTING))
    }
    const handleNavHistoryScreen = () => {
        navigation.dispatch(CommonActions.navigate(NAVIGATIONS_ROUTE.SCREEN_HISTORY_CHARGING))
    }
    const handleNavNotificationScreen = () => {
        navigation.dispatch(CommonActions.navigate(NAVIGATIONS_ROUTE.SCREEN_NOTIFICATION))
    }
    const handleNavChangePassScreen = () => {
        navigation.dispatch(CommonActions.navigate(NAVIGATIONS_ROUTE.SCREEN_CHANGE_PASSWORD))
    }
    return (
        <View style={styles.container}>
            <View style={styles.avatar}>
                <Image source={require('../../../asset/image/avatar.jpg')} style={styles.image} />
                <Text style={styles.userName}>{user?.name}</Text>
                <Text>{user?.phoneNumber}</Text>

            </View>
            <View style={[styles.box, { height: 96 }]}>
                <BoxProfile title='Thông tin cá nhân' action={handleNavUseScreen} />
                <BoxProfile title='Lịch sử sạc' action={handleNavHistoryScreen} />
            </View>
            <View style={[styles.box, { height: 144 }]}>
                <BoxProfile title='Cài đặt' action={handleNavSettingScreen}/> 
                <BoxProfile title='Thông báo' action={handleNavNotificationScreen}/>
                <BoxProfile title='Đổi mật khẩu' action={handleNavChangePassScreen} />
            </View>
            <View style={[styles.box, { height: 96 }]}>
                <BoxProfile title='Hướng dẫn' action={handleNavSupportScreen} />
                <BoxProfile title='Chính sách bảo mật' action={handleNavPolicyScreen} />
            </View>
            <ButtonBase titleStyle={styles.button} title='Đăng xuất' icon={IconLogout} action={handleNav} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 10,
    },
    avatar: {
        height: '25%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userName: {
        color: '#231F21',
        fontSize: 16,
        fontWeight: '500'
    },
    image: {
        marginVertical: 10,
        height: 83,
        width: 83,
        borderRadius: 50

    },
    box: {
        marginVertical: 10,
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
    }
})
