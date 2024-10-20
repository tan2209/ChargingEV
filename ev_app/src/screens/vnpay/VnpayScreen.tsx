import React, { useState, useRef } from 'react';
import { View, Button, StyleSheet, ActivityIndicator, Dimensions, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import Header from '../account/component/Header';
import GatewayPaymentCard from './components/GatewayPaymentCard';
import IconVnpay from '../../shared/icons/ic_vnpay.svg';
import { NAVIGATIONS_ROUTE } from '../../navigation/Routes';
import { CommonActions } from '@react-navigation/native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const VnpayScreen = ({ navigation, route }: any) => {
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); 
  const amount = route.params.amount;
  const orderId = route.params.orderId;
  console.log(amount, orderId)
  const createPaymentUrl = async (amount: number, orderId: string) => {
    try {
      setLoading(true);
      const response = await axios.post('https://ev-charging-server-z3gr3glbrq-de.a.run.app/payment/create_payment_url', {
        amount,
        orderId
      });
      const data = response.data;
      if (data.paymentUrl) {
        setPaymentUrl(data.paymentUrl);
      } else {
        console.error('Failed to create payment URL');
      }
    } catch (error) {
      console.error('Error creating payment URL:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleNavigationStateChange = (navState: any) => {
    const { url } = navState;
    if (url.includes('vnpay_return')) {
      const query = url.split('?')[1];
      axios.get(`https://ev-charging-server-z3gr3glbrq-de.a.run.app/2payment/vnpay_return?${query}`)
        .then((response) => {
          const transactionData = response.data;
          if (response.status === 200) {
            navigation.dispatch(CommonActions.navigate({
              name: NAVIGATIONS_ROUTE.SCREEN_PAYMENT_RESULT,
              params: { transactionData : transactionData, orderId : orderId},
            }));
          } else {
            navigation.dispatch(CommonActions.navigate({ name: NAVIGATIONS_ROUTE.SCREEN_PAYMENT_FAIL }));
          }
        })
        .catch((error) => {
          console.error('Error verifying payment:', error);
        });
      return false;
    }
    return true; 
  };

  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      )}
      {paymentUrl ? (
        <WebView
          style={styles.webview}
          source={{ uri: paymentUrl }}
          onShouldStartLoadWithRequest={handleNavigationStateChange}
        />
      ) : (
        <View>
          <Header title='Phương thức thanh toán' />
          <View style={{marginVertical: 20}}>
            <GatewayPaymentCard icon={IconVnpay} title='Cổng VNPAY' action={() =>createPaymentUrl(amount, orderId)} /></View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
    width: deviceWidth,
    height: deviceHeight
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
});

export default VnpayScreen;
