import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Iconstation from '../../../shared/icons/ic_charging-station.svg'

type BrandBoxProps = {
    uri?: any
    title?: string,
    action?: () => void,
    count?: string,
}

export default function BoxBrand(props: BrandBoxProps) {
    return (
        <TouchableOpacity style={styles.container} onPress={props.action}>
            <View style={styles.imageView}>
                <Image source={props.uri} style={styles.image} /></View>
            <Text style={styles.textDetal}>{props.title}</Text>
            <View style={styles.box}>
                <Iconstation />
                <Text> {props.count} trạm sạc gần nhất</Text>
            </View>

        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        height: 190,
        width: 200,
        borderRadius: 8,
        backgroundColor: "#FFFFFF"
    },
    imageView: {
        height: 120,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    box: {
        paddingHorizontal: 10,
        alignItems: 'center',
        flexDirection: 'row'
    },
    textDetal: {
        paddingHorizontal: 10,
        marginVertical: 5,
        color: '#139372',
        fontSize: 14,
        fontWeight: '400',
        marginLeft: 5,
    }
})