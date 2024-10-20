import React, { useState, useCallback, useMemo } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import IconQr from '../../shared/icons/ic_scanButton.svg';
import IconQr2 from '../../shared/icons/ic_scanButton2.svg';
import IconCode from '../../shared/icons/ic_codeBar.svg';
import IconCode2 from '../../shared/icons/ic_codeBar2.svg';
import * as Colors from '../../shared/theme/Colors';
import { NAVIGATIONS_ROUTE } from '../../navigation/Routes';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import BaseModal from '../../shared/ui/BaseModal';
import { postStatus, postVerifiableCode } from '../../api/bookingApi';
import LoadingComponent from '../../shared/ui/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateStatus } from '../../api/stationApi';
import { useUserRole } from '../../context/UserRoleContext';

const QRCodeScannerScreen = ({ navigation, route } : any) => {
    const [isCheck, setIsCheck] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [isRepeat, setIsRepeat] = useState(true);
    const stationName = useMemo(() => route?.params?.stationName || null, [route]);
    const { role } = useUserRole()
    
    useFocusEffect(
        useCallback(() => {
            const postStatusSent = async () => {
                try {
                    const statusKey = stationName === 'Box Test 1' ? 'sent1' : 
                                      stationName === 'Box Test 2' ? 'sent2' : 
                                      'sent3';
                    await postStatus(statusKey);
                } catch (error) {
                    console.error('Error posting status:', error);
                }
            };

            setIsCheck(true);
            setIsRepeat(true);
            setIsLoading(false);
            postStatusSent();
        }, [stationName])
    );

    const handleNavSuccess = useCallback(() => {
        setIsVisible(false);
        saveCurrentTimeAndStation(startTime, stationName);
        navigation.dispatch(CommonActions.navigate({ name: NAVIGATIONS_ROUTE.SCREEN_STATUS_STATION }));
    }, [navigation, startTime, stationName]);

    const isNumeric = useCallback((str : any) => {
        return /^\d+$/.test(str);
    }, []);

    const saveCurrentTimeAndStation = useCallback(async (currentTime : any, stationName : any)  => {
        try {
            await AsyncStorage.multiSet([
                ['currentTime', currentTime],
                ['stationName', stationName]
            ]);
            console.log('Lưu thời gian hiện tại và tên trạm thành công!');
        } catch (error) {
            console.error('Lỗi khi lưu thời gian hiện tại và tên trạm:', error);
        }
    }, []);

    const handleNav = useCallback(() => {
        navigation.dispatch(CommonActions.navigate({ name: NAVIGATIONS_ROUTE.SCREEN_CHARGING_CODE, params: { stationName } }));
    }, [navigation, stationName]);

    const handleQRCodeRead = useCallback(async ({ data  } : any) => {
        if (stationName) {
        if (isNumeric(data) && data.length === 6) {
            setIsLoading(true);
            try {
                const res = await postVerifiableCode(data, stationName);
                if (res.success) {
                    setIsLoading(true);
                    setStartTime(res.currentTime);
                    setIsVisible(true);
                    setIsRepeat(false); 
                    await updateStatus(stationName, true);
                } else {
                    Alert.alert('Mã Qr không hợp lệ!');
                }
            } catch (error) {
                Alert.alert('Lỗi khi xử lý mã QR!');
                console.error('Error processing QR code:', error);
            } 
        } else {
            Alert.alert('Mã Qr không hợp lệ!');
        }} else {
            Alert.alert('Vui lòng chọn trạm sạc trước khi quét mã!')
        }
    }, [isNumeric, stationName]);

    return (
        <View style={{ flex: 1 }}>
            {isLoading ? <LoadingComponent /> :
                <QRCodeScanner
                    onRead={handleQRCodeRead}
                    showMarker
                    reactivate={isRepeat}
                    reactivateTimeout={3000}
                    cameraTimeout={8000}
                    topContent={<Text style={styles.centerText}></Text>}
                    bottomContent={
                        <View style={styles.footer}>
                            <TouchableOpacity style={[styles.buttonTouchable, { borderColor: isCheck ? Colors.subLightGray : Colors.primaryGreen }]} onPress={handleNav}>
                                {isCheck ? <IconCode /> : <IconCode2 />}
                                <Text style={[styles.buttonText, { color: isCheck ? Colors.subLightGray : Colors.primaryGreen }]}>Nhập mã</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.buttonTouchable, { borderColor: !isCheck ? Colors.subLightGray : Colors.primaryGreen }]} onPress={() => setIsCheck(true)}>
                                {isCheck ? <IconQr /> : <IconQr2 />}
                                <Text style={[styles.buttonText, { color: !isCheck ? Colors.subLightGray : Colors.primaryGreen }]}>Quét QR</Text>
                            </TouchableOpacity>
                        </View>
                    }
                />
            }
            <BaseModal
                action={handleNavSuccess}
                isVisible={isVisible}
                title={role == 'technical' ? 'Kích hoạt thành công' : 'Xác nhận thành công'}
                information={role == 'technical' ? 'Chỉnh sửa thông tin trạm sạc' : 'Hãy theo dõi quá trình sạc'}
                textButton={role == 'technical' ? 'Setting' : 'My charging'}
            />
        </View>
    );
};

export default QRCodeScannerScreen;

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonTouchable: {
        flexDirection: 'row',
        height: 40,
        width: 150,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginVertical: 30,
    },
    buttonText: {
        fontWeight: '500',
        fontSize: 14,
        marginLeft: 10
    },
    footer: {
        height: 400,
        backgroundColor: Colors.white,
        width: '100%',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});
