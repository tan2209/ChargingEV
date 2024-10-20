import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View, Alert, ActivityIndicator, ScrollView } from 'react-native';
import Header from './component/Header';
import IconEdit from '../../shared/icons/ic_edit2.svg';
import ButtonBase from '../../shared/ui/ButtonBase';
import { CommonActions } from '@react-navigation/native';
import * as Colors from '../../shared/theme/Colors';
import { updateUser } from '../../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { users } from '../../data/models/data';

export default function UserScreen({ navigation, route }: any) {
    const [user, setUser] = useState<any>(null);
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [carBrand, setCarBrand] = useState('');
    const [loading, setLoading] = useState(false);
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
                    setName(userData.name ? userData.name.split(' ').slice(0, -1).join(' ') : '');
                    setLastName(userData.name ? userData.name.split(' ').slice(-1).join(' ') : '');
                    setPhone(userData.phoneNumber || '');
                    setEmail(userData.email || '');
                    setAddress(userData.address || '');
                    setCarBrand(userData.carBrand || '');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUser();
    }, []);

    const handleSave = async () => {
        setLoading(true);
        try {
            const userData = {
                name: `${name} ${lastName}`,
                phoneNumber : phone,
                email,
                address,
                carBrand
            };
            const updatedUser = await updateUser(user._id, userData);
            const userUpdate = updatedUser.user
            await AsyncStorage.setItem('user', JSON.stringify(userUpdate));
            Alert.alert('Success', 'User updated successfully');
            handleNavBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to update user');
        } finally {
            setLoading(false);
        }
    };
    const confirmSave = () => {
        Alert.alert(
            'Xác nhận',
            'Bạn có chắc chắn muốn lưu thông tin chỉnh sửa?',
            [
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
                {
                    text: 'Lưu',
                    onPress: handleSave,
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <ScrollView>
            <Header title='Thông tin cá nhân' action={handleNavBack} />
            <View style={styles.container}>
                <View style={styles.editImageContainer}>
                    <View style={styles.editImage}>
                        <Image source={require('../../../asset/image/avatar.jpg')} style={styles.image} />
                        <View style={styles.iconEditContainer}>
                            <IconEdit />
                        </View>
                    </View>
                </View>
                <View style={styles.box}>
                    <View style={styles.row}>
                        <TextInput
                            style={[styles.inputBox, { width: 195 }]}
                            placeholder='Họ và tên đệm'
                            value={name}
                            onChangeText={setName}
                        />
                        <TextInput
                            style={[styles.inputBox, { width: 125 }]}
                            placeholder='Tên'
                            value={lastName}
                            onChangeText={setLastName}
                        />
                    </View>
                    
                    <View style={styles.row}>
                        <TextInput
                            style={[styles.inputBox, { width: 325 }]}
                            placeholder='Số điện thoại'
                            value={phone}
                            onChangeText={setPhone}
                        />
                    </View>

                    <View style={styles.row}>
                        <TextInput
                            style={[styles.inputBox, { width: 325 }]}
                            placeholder='Email'
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <View style={styles.row}>
                        <TextInput
                            style={[styles.inputBox, { width: 325 }]}
                            placeholder='Địa chỉ'
                            value={address}
                            onChangeText={setAddress}
                        />
                    </View>

                    <View style={styles.row}>
                        <TextInput
                            style={[styles.inputBox, { width: 325 }]}
                            placeholder='Hãng xe'
                            value={carBrand}
                            onChangeText={setCarBrand}
                        />
                    </View>
                </View>
                {loading ? (
                    <ActivityIndicator size="large" color={Colors.lightBlue} />
                ) : (
                    <ButtonBase title='Lưu chỉnh sửa' titleStyle={styles.button} action={confirmSave} />
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginVertical: 10,
    },
    editImageContainer: {
        height: '22%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    editImage: {
        borderWidth: 10,
        borderRadius: 50,
        borderColor: Colors.lightBlue,
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    iconEditContainer: {
        position: 'absolute',
        bottom: -10,
        right: 2,
        backgroundColor: Colors.white,
        height: 25,
        width: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    },
    inputBox: {
        marginHorizontal: 5,
        height: 44,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#B1B1B1',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    row: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    box: {
        marginVertical: 10,
        justifyContent: 'center',
        height: 360,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        borderColor: '#FAF7F5',
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
        marginVertical: 60
    },
});
