import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import IconHome1 from '../../shared/icons/ic_home1.svg'
import IconHome2 from '../../shared/icons/ic_home2.svg'
import IconCharging1 from '../../shared/icons/ic_charging2.svg'
import IconCharging2 from '../../shared/icons/ic_charging3.svg'
import IconPayment1 from '../../shared/icons/ic_payment.svg'
import IconPayment2 from '../../shared/icons/ic_payment2.svg'
import IconProfile1 from '../../shared/icons/ic_profile1.svg'
import IconProfile2 from '../../shared/icons/ic_profile2.svg'
import CustomTabBarButton from './CustomBottomButton';

interface BottomNavigationItemProps {
  isActive: boolean;
  name: String;
}

const BottomNavigationItem = (props: BottomNavigationItemProps) => {
  
  const BottomNavigationIcon = () => {
    if (props.name === 'Trang chủ') {
      return props.isActive ? <IconHome2 /> : <IconHome1 />
    } else if (props.name ==='Mycharge') {
      return props.isActive ? <IconCharging2 /> : <IconCharging1/>
    } 
    else if (props.name ==='Trạm sạc') {
        return <CustomTabBarButton />
    }
    else if (props.name ==='Thanh toán' || props.name === 'Chỉnh sửa') {
        return props.isActive ? <IconPayment2 /> : <IconPayment1/>
    }
    else if (props.name ==='Tài khoản') {
        return props.isActive ? <IconProfile2 /> : <IconProfile1/>
    }
        else {
      throw Error('Unknown tab');
    }
  };

  return (
    <View style={styles.itemStyle}>
      <BottomNavigationIcon />
      <Text style={[styles.textStyle, props.isActive? [styles.textInActive]: [styles.textNoActive] ]}>{props.name}</Text>
    </View>
  );
};

export default BottomNavigationItem;

const styles = StyleSheet.create({
  itemStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    marginTop: 5,
    fontSize: 10,
  },
  textInActive: {
    color: '#139372',
    fontWeight: '500',
    fontSize: 12,
  },
  textNoActive: {
    color: '#B1B1B1'
  }
});