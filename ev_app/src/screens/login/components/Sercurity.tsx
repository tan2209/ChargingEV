import React from 'react'
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import * as Colors from '../../../shared/theme/Colors'

export default function Sercurity() {
  return (
    <View style={styles.reference}>
                <Text >Bằng việc đăng ký, bạn đồng ý với </Text>
                <View >
                   <Text style={styles.sercurity}> Điều khoản sử dụng </Text>
                </View>
                 <Text> và </Text>
                <View>
                    <Text style={styles.sercurity}>Chính sách bảo mật</Text>
                </View>
                <Text> của chúng tôi </Text>
            </View>
  )}
  const styles = StyleSheet.create({
    reference: {
        marginVertical: 10,
        flexWrap: 'wrap',
        marginHorizontal: 20,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
    },
    sercurity: {
        fontSize: 14,
        color: Colors.primaryGreen, 
        fontWeight: '500',
        justifyContent: 'center',
    },
  })

