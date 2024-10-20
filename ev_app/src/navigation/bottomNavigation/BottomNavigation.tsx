import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/home/HomeScreen';
import PaymentScreen from '../../screens/payment/PaymentScreen';
import ProfileScreen from '../../screens/account/ProfileScreen';
import * as React from 'react';

import TabBar from './TabBar';
import ChargingCodeScreen from '../../screens/charging/ChargingCodeScreen';
import MapScreen from '../../screens/map/MapScreen';
import QRCodeScannerScreen from '../../screens/qrScan/QrScannerScreen';
import { useUserRole } from '../../context/UserRoleContext';
import EditStationScreen from '../../screens/technical/EditStation';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  const { role } = useUserRole();

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Trang chủ"
      tabBar={(props: any) => <TabBar {...props} />}
    >
      <Tab.Screen name="Trang chủ" component={HomeScreen} />
      <Tab.Screen name="Mycharge" component={QRCodeScannerScreen} />
      <Tab.Screen name="Trạm sạc" component={MapScreen} />
      {role == 'technical' ? <Tab.Screen name="Chỉnh sửa" component={EditStationScreen} /> : <Tab.Screen name="Thanh toán" component={PaymentScreen} />}
      <Tab.Screen name="Tài khoản" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

export default BottomNavigation;