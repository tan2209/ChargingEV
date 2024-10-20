import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, Alert, ActivityIndicator, ScrollView } from 'react-native';
import Header from '../account/component/Header';
import ButtonBase from '../../shared/ui/ButtonBase';
import { CommonActions } from '@react-navigation/native';
import * as Colors from '../../shared/theme/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditStationScreen({ navigation, route }: any) {
    const [station, setStation] = useState<any>(null);
    const [stationName, setStationName] = useState('');
    const [bussinessStatus, setBussinessStatus] = useState('');
    const [rating, setRating] = useState(0);
    const [address, setAddress] = useState('');
    const [totalChargingPorts, setTotalChargingPorts] = useState(0);
    const [openingHours, setOpeningHours] = useState('');
    const [loading, setLoading] = useState(false);
  
    const handleNavBack = () => {
        navigation.dispatch(CommonActions.goBack());
    };
  
    
  
    const handleSave = async () => {
        setLoading(true);
        try {
            const updatedStationData = {
                ...station,
                properties: {
                    ...station.properties,
                    stationName,
                    bussinessStatus,
                    rating,
                    address,
                    totalChargingPorts,
                    openingHours
                }
            };
           
            handleNavBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to update charging station');
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
            <Header title='Chỉnh sửa trạm sạc' action={handleNavBack} />
            <View style={styles.container}>
                <View style={styles.box}>
                    <TextInput
                        style={styles.inputBox}
                        placeholder='Tên trạm sạc'
                        value={stationName}
                        onChangeText={setStationName}
                    />
                    <TextInput
                        style={styles.inputBox}
                        placeholder='Trạng thái kinh doanh'
                        value={bussinessStatus}
                        onChangeText={setBussinessStatus}
                    />
                    <TextInput
                        style={styles.inputBox}
                        placeholder='Đánh giá (0-5)'
                        value={String(rating)}
                        keyboardType='numeric'
                        onChangeText={text => setRating(Number(text))}
                    />
                    <TextInput
                        style={styles.inputBox}
                        placeholder='Địa chỉ'
                        value={address}
                        onChangeText={setAddress}
                    />
                    <TextInput
                        style={styles.inputBox}
                        placeholder='Tổng số cổng sạc'
                        value={String(totalChargingPorts)}
                        keyboardType='numeric'
                        onChangeText={text => setTotalChargingPorts(Number(text))}
                    />
                    <TextInput
                        style={styles.inputBox}
                        placeholder='Giờ mở cửa'
                        value={openingHours}
                        onChangeText={setOpeningHours}
                    />
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
    box: {
        marginVertical: 10,
        justifyContent: 'center',
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
        padding: 16,
    },
    inputBox: {
        marginVertical: 10,
        height: 44,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#B1B1B1',
        paddingHorizontal: 10,
    },
    button: {
        marginVertical: 20,
    },
});
