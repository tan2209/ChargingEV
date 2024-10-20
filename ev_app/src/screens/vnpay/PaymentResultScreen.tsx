import React from 'react'
import IconSuccess from '../../shared/icons/ic_checkSuccessPayment.svg'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as Colors from '../../shared/theme/Colors';
import BaseButton from '../../shared/ui/BaseButton';
import { CommonActions } from '@react-navigation/native';
import { NAVIGATIONS_ROUTE } from '../../navigation/Routes';
import { postUpdateOrder } from '../../api/payment';


export default function PaymentResultScreen({ navigation, route }: any) {
    const  transactionData  = route.params.transactionData;
    const orderId = route.params.orderId;
    const formattedAmount = new Intl.NumberFormat('vi-VN').format(transactionData.vnp_Amount/100);
    const handleNavSuccess = () => {
        try {
            const res = postUpdateOrder(orderId, 'success')
        }catch (error) {
            console.error()
        } finally {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: NAVIGATIONS_ROUTE.BOTTOM_NAVIGATION }],
            })
        );}
    }
    const formatDate = (dateString: any) => {
        const year = dateString.substring(0, 4);
        const month = dateString.substring(4, 6);
        const day = dateString.substring(6, 8);
        const hour = dateString.substring(8, 10);
        const minute = dateString.substring(10, 12);
        const second = dateString.substring(12, 14);

        return `${year}/${month}/${day}  ${hour}:${minute}:${second}`;
      };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <IconSuccess />
                <Text style={styles.text}>Giao dịch thành công!</Text>
                <Text style={styles.textMoney}>VND {formattedAmount}</Text></View>
            <View style={styles.content}>
                <View style={styles.border}>
                    <View style={styles.headerBoder}>
                        <Text style={styles.headerText}>Chi tiết giao dịch</Text>
                    </View>
                    <View style={styles.viewBoder}>
                        <Text style={styles.contentBoder}>Mã giao dịch</Text>
                        <Text style={styles.contentBoder1}>{transactionData.vnp_TransactionNo}</Text>
                    </View>
                    <View style={styles.viewBoder}>
                        <Text style={styles.contentBoder}>Thời gian giao dịch</Text>
                        <Text style={styles.contentBoder1}>{formatDate(transactionData.vnp_PayDate)}</Text>
                    </View>
                    <View style={styles.viewBoder}>
                        <Text style={styles.contentBoder}>Ngân hàng</Text>
                        <Text style={styles.contentBoder1}>{transactionData.vnp_BankCode}</Text>
                    </View>
                    <View style={styles.viewBoder}>
                        <Text style={styles.contentBoder}>Tống tiền</Text>
                        <Text style={styles.contentBoder1}>{formattedAmount}</Text>
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
        color: Colors.primaryGreen,
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
