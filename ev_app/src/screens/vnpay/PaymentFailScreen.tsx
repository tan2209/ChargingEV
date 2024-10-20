import React from 'react'
import IconFail from '../../shared/icons/ic_fail.svg'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as Colors from '../../shared/theme/Colors';
import BaseButton from '../../shared/ui/BaseButton';
import { CommonActions } from '@react-navigation/native';
import { NAVIGATIONS_ROUTE } from '../../navigation/Routes';


export default function PaymentFailScreen({ navigation }: any) {
    const handleNavSuccess = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: NAVIGATIONS_ROUTE.BOTTOM_NAVIGATION }],
            })
        );
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <IconFail />
                <Text style={styles.text}>Giao dịch thất bại!</Text>
                <Text style={styles.textMoney}>VND 1,000,000</Text></View>
            <View style={styles.content}>
                <View style={styles.border}>
                    <View style={styles.headerBoder}>
                        <Text style={styles.headerText}>Chi tiết giao dịch</Text>
                    </View>
                    <View style={styles.viewBoder}>
                        <Text style={styles.contentBoder}>Mã giao dịch</Text>
                        <Text style={styles.contentBoder1}>0000857522575</Text>
                    </View>
                    <View style={styles.viewBoder}>
                        <Text style={styles.contentBoder}>THời gian giao dịch</Text>
                        <Text style={styles.contentBoder1}>25-02-2023, 13:22:165</Text>
                    </View>
                    <View style={styles.viewBoder}>
                        <Text style={styles.contentBoder}>Loại giao dịch</Text>
                        <Text style={styles.contentBoder1}>Bank Transfer</Text>
                    </View>
                    <View style={styles.viewBoder}>
                        <Text style={styles.contentBoder}>Người gửi</Text>
                        <Text style={styles.contentBoder1}>Phan Thi Linh Ngan</Text>
                    </View>
                    <View style={styles.viewBoder}>
                        <Text style={styles.contentBoder}>Tống tiền</Text>
                        <Text style={styles.contentBoder1}>1,000,000</Text>
                    </View>
                    <View style={styles.viewBoder}>
                        <Text style={styles.contentBoder}>Phí giao dịch</Text>
                        <Text style={styles.contentBoder1}>0</Text>
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <BaseButton
                        title={'Quay về trang chủ'}
                        titleStyle={styles.titleText}
                        containerStyle={styles.button}
                        action={handleNavSuccess}
                    /></View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5F6F7',
    },
    header: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerBoder: {
        backgroundColor: '#F5F6F7',
        marginVertical: 10,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 12
    },
    content: {
        flex: 1,
        width: '100%'
    },
    headerText: {
        fontSize: 16,
        color: Colors.black,
        fontWeight: '500'
    },

    text: {
        fontSize: 18,
        fontWeight: '500',
        color: '#B51919',
        marginVertical: 10,
    },
    viewBoder: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'space-between',
        marginVertical: 10
    },
    textMoney: {
        fontSize: 28,
        fontWeight: '700',
        color: Colors.black,
        marginVertical: 5
    },
    border: {
        backgroundColor: Colors.white,
        marginHorizontal: 24,
        width: '90%',
        borderRadius: 16,
    },
    contentBoder: {
        fontSize: 13,
        color: '#707070'
    },
    contentBoder1: {
        fontSize: 13,
        color: Colors.black
    },
    titleText: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: '500'
    },
    button: {
        marginHorizontal: 24,
        height: 50,
        backgroundColor: Colors.primaryGreen,
        borderRadius: 16,
        marginBottom: 10
    }

})
