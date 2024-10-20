import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ButtonBasic from '../../../shared/ui/ButtonBasic'
import ButtonBase from '../../../shared/ui/ButtonBase'

export default function Introduction() {
    return (
        <View style={styles.container}>
            <View style={styles.company}>
                <Text style={styles.intro}>Giới thiệu</Text>
                <Text style={styles.detail}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labe et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ullamco labis nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</Text>
            </View>
            <View style={styles.map}>
                <Text></Text>
            </View>
            <View style={styles.duringTime}>
                <Text style={styles.intro}>Thời gian hoạt động</Text>
                <View style={styles.time}>
                    <Text style={styles.detail}>Thứ 2</Text>
                    <Text style={styles.detail}>7:00 Am - 20:00 PM</Text>
                </View>
                <View style={styles.time}>
                    <Text style={styles.detail}>Thứ 3</Text>
                    <Text style={styles.detail}>7:00 Am - 20:00 PM</Text>
                </View>
                <View style={styles.time}>
                    <Text style={styles.detail}>Thứ 4</Text>
                    <Text style={styles.detail}>7:00 Am - 20:00 PM</Text>
                </View>
                <View style={styles.time}>
                    <Text style={styles.detail}>Thứ 5</Text>
                    <Text style={styles.detail}>7:00 Am - 20:00 PM</Text>
                </View>
                <View style={styles.time}>
                    <Text style={styles.detail}>Thứ 6</Text>
                    <Text style={styles.detail}>7:00 Am - 20:00 PM</Text>
                </View>
                <View style={styles.time}>
                    <Text style={styles.detail}>Thứ 7</Text>
                    <Text style={styles.detail}>7:00 Am - 20:00 PM</Text>
                </View>
                <View style={styles.time}>
                    <Text style={styles.detail}>Chủ nhật</Text>
                    <Text style={styles.detail}>7:00 Am - 20:00 PM</Text>
                </View>
                <View style={styles.time}>
                    <Text style={styles.detail}>Ngày lễ</Text>
                    <Text style={styles.detail}>7:00 Am - 20:00 PM</Text>
                </View>
                <View style={styles.company}>
                    <Text style={styles.intro}>Chủ sở hữu</Text>
                    <Text style={styles.detail}>CÔNG TY CỔ PHẦN GIẢI PHÁP THÔNG MINH ZIOT</Text>
                </View>
                <View style={styles.button}>
                    <ButtonBase titleStyle={styles.buttonBooking} title='Chỉ đường' />
                    <ButtonBasic titleStyle={styles.buttonBooking} title='Đặt chỗ' />
                </View>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 10,
    },
    intro: {
        marginVertical: 10,
        color: '#344054',
        fontSize: 18,
        fontWeight: '700'
    },
    detail: {
        color: '#73656C',
        fontSize: 12,
        fontWeight: '400',
        flexWrap: 'wrap',
    },
    map: {
        marginVertical: 15,
        flexDirection: 'column',
        backgroundColor: 'red',
        borderRadius: 12,
        borderColor: 'FAF7F5',
        height: 119,
    },
    duringTime: {
        marginVertical: 15,
        flexDirection: 'column',
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
        borderColor: 'FAF7F5',
        height: 262,
    },
    time: {
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    company: {
        marginTop: 10,
    },
    button: {
        marginVertical: 20,
        flexDirection: 'row',

    },
    buttonBooking: {
        backgroundColor: '#139372',
        width: '50%',
        marginRight: 10,
    }
})
