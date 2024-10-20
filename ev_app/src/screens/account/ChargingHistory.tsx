import React, { useCallback, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import HistoryCard from './component/HistoryCard';
import Header from './component/Header';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { getPaymentHistory } from '../../api/payment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingComponent from '../../shared/ui/Loading';
import IconNotFound from '../../shared/icons/ic_fileNotFound.svg';
import { FlashList } from '@shopify/flash-list';

interface PaymentHistory {
  stationName: string;
  chargeDate: string;
  totalChargeTime: number;
  price: number;
  paymentStatus: string;
  _id: string;
}

export default function ChargingHistory({ navigation }: any) {
  const [data, setData] = useState<PaymentHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [user, setUser] = useState<{ _id: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userJSON = await AsyncStorage.getItem('user');
      if (userJSON) {
        setUser(JSON.parse(userJSON));
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = useCallback(async () => {
    if (user && user._id) {
      setIsLoading(true);
      try {
        const res = await getPaymentHistory(user._id);
        if (res?.data) {
          setData(res.data);
        } else {
          Alert.alert('Thông báo', 'Không tìm thấy dữ liệu lịch sử thanh toán.');
        }
      } catch (error) {
        console.error('Error fetching payment station data:', error);
        Alert.alert('Thông báo', 'Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau!');
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false); 
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      setData([]);
    }, [])
  );

  const handleNavBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };

  const renderItem = ({ item }: { item: PaymentHistory }) => (
    <HistoryCard
      nameCharging={item.stationName}
      time={item.chargeDate}
      timePeriod={item.totalChargeTime || 0}
      price={item.price}
      status={item.paymentStatus}
    />
  );

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <View style={styles.container}>
      <Header title="Lịch sử sạc" action={handleNavBack} />
      {data.length > 0 ? (
        <FlashList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          estimatedItemSize={174}
        />
      ) : (
        <View style={styles.iconContainer}>
          <IconNotFound height={150} width={150} />
          <Text style={styles.notFoundText}>Không có dữ liệu</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  notFoundText: {
    marginTop: 10,
    fontSize: 16,
    color: '#999',
  },
});
