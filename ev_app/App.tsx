import React, { useEffect, useRef, useState } from "react";
import { CommonActions, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
import { NAVIGATIONS_ROUTE } from "./src/navigation/Routes";
import LoginScreen from "./src/screens/login/LoginScreen";
import HomeScreen from "./src/screens/home/HomeScreen";
import BottomNavigation from "./src/navigation/bottomNavigation/BottomNavigation";
import ChargingHistoryScreen from "./src/screens/account/ChargingHistory";
import RegisterScreen from "./src/screens/login/RegisterScreen";
import ForgetPasswordScreen from "./src/screens/login/ForgetPasswordScreen";
import OtpScreen from "./src/screens/login/OtpScreen";
import NewPasswordScreen from "./src/screens/login/NewPasswordScreen";
import ProfileScreen from "./src/screens/account/ProfileScreen";
import ChangePasswordScreen from "./src/screens/account/ChangePasswordScreen";
import UserScreen from "./src/screens/account/UserScreen";
import StationStatus from "./src/screens/reservation/StationStatus";
import ChargingCodeScreen from "./src/screens/charging/ChargingCodeScreen";
import SearchChargingStation from "./src/screens/charging/SearchChargingStation";
import { LocationProvider } from "./src/context/LocationContext";
import DetailStationScreen from "./src/screens/charging/DetailStationScreen";
import VnpayScreen from "./src/screens/vnpay/VnpayScreen";
import PaymentResultScreen from "./src/screens/vnpay/PaymentResultScreen";
import PaymentFailScreen from "./src/screens/vnpay/PaymentFailScreen";
import { checkLoginStatus } from "./src/utils/checkLogin";
import SplashScreen from "./src/screens/login/SplashScreen";
import QRCodeScannerScreen from "./src/screens/qrScan/QrScannerScreen";
import NotificationScreen from "./src/screens/notifications/NotificationScreen";
import SettingScreen from "./src/screens/setting/SettingScreen";
import PolicyScreen from "./src/screens/policy/PolicyScreen";
import SupportScreen from "./src/screens/policy/Support";
import { UserRoleProvider } from "./src/context/UserRoleContext";

const Stack = createNativeStackNavigator();

export default function App() {

  return ( 
    <UserRoleProvider>
    <LocationProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName={NAVIGATIONS_ROUTE.SCREEN_SPLASH} screenOptions={{ headerShown: false}}>
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_SPLASH} component={SplashScreen} />
        <Stack.Screen name={NAVIGATIONS_ROUTE.BOTTOM_NAVIGATION} component={BottomNavigation} />
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_LOGIN} component={LoginScreen} />
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_HOME} component={HomeScreen} />
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_REGISTER} component={RegisterScreen} />
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_OTP} component={OtpScreen} />
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_NEW_PASSWORD} component={NewPasswordScreen} />
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_FORGET_PASSWORD} component={ForgetPasswordScreen} />
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_USER} component={UserScreen} />
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_CHANGE_PASSWORD} component={ChangePasswordScreen} />
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_CHARGING_CODE} component={ChargingCodeScreen} />
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_STATUS_STATION} component={StationStatus} />
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_HISTORY_CHARGING} component={ChargingHistoryScreen} /> 
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_PROFILE} component={ProfileScreen} /> 
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_SEARCH_STATION} component={SearchChargingStation} /> 
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_DETAIL_STATION} component={DetailStationScreen} /> 
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_VNPAY} component={VnpayScreen} /> 
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_PAYMENT_RESULT} component={PaymentResultScreen} /> 
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_PAYMENT_FAIL} component={PaymentFailScreen} /> 
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_NOTIFICATION} component={NotificationScreen} /> 
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_SETTING} component={SettingScreen} /> 
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_POLICY} component={PolicyScreen} /> 
        <Stack.Screen name={NAVIGATIONS_ROUTE.SCREEN_SUPPORT} component={SupportScreen} /> 
        
      </Stack.Navigator>
    </NavigationContainer>
    </LocationProvider>
    </UserRoleProvider>

  )
}