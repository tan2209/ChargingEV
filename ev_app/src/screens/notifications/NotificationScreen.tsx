import React, { useCallback, useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { getPaymentHistory } from '../../api/payment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingComponent from '../../shared/ui/Loading';
import IconNotFound from '../../shared/icons/ic_fileNotFound.svg';
import Header from '../account/component/Header';

export default function NotificationScreen({ navigation }: any) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<{ userId: string } | null>(null);

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

  // useFocusEffect(
  //   useCallback(() => {
  //     const fetchData = async () => {
  //       if (user) {
  //         setIsLoading(true);
  //         try {
  //           const res = await getPaymentHistory(user.userId);
  //           setData(res?.data);
  //         } catch (error) {
  //           console.error('Error fetching payment station data:', error);
  //           Alert.alert('Thông báo', 'Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau!');
  //         } finally {
  //           setIsLoading(false);
  //         }
  //       }
  //     };

  //     fetchData();
  //   }, [user])
  // );

  const handleNavBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };

  return (
    <View style={styles.container}>
      <Header title='Thông báo' action={handleNavBack} />
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <View style={styles.contentContainer}>
          {data.length > 0 ? (
            <ScrollView style={{ flex: 1 }}>
  
            </ScrollView>
          ) : (
            <View style={styles.iconContainer}>
              <IconNotFound height={150} width={150} />
              <Text style={styles.notFoundText}>Không có dữ liệu</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  notFoundText: {
    marginTop: 10,
    fontSize: 16,
    color: '#999'
  }
});
