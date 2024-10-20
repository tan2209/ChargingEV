import React, { useEffect } from "react";
import { View, } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { checkLoginStatus } from "../../utils/checkLogin";
import { NAVIGATIONS_ROUTE } from "../../navigation/Routes";
import LoadingComponent from "../../shared/ui/Loading";
import Logo from '../../shared/icons/image 5.svg';


const SplashScreen = ({ navigation } : any) => {
  useEffect(() => {
    const checkStatus = async () => {
      const isLoggedIn = await checkLoginStatus();
      if (isLoggedIn) {
        navigation.dispatch(CommonActions.navigate({ name: NAVIGATIONS_ROUTE.BOTTOM_NAVIGATION }));
      } else {
        navigation.dispatch(CommonActions.navigate({ name: NAVIGATIONS_ROUTE.SCREEN_LOGIN}));
      }
    };
    checkStatus();
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Logo />
    </View>
  );
};

export default SplashScreen;
