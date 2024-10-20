import React from 'react'
import IconVector from '../../../shared/icons/ic_arrowSearch.svg'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type HeaderProps = {
    title?: string
    action?: () => void
}
export default function Header(props: HeaderProps) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={props.action}>
                <IconVector/>
            </TouchableOpacity>
            <Text style={styles.text}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 20,
        borderColor: '#C4C4C4',
    },
    text: {
        flex: 1,
        textAlign: 'center',
        fontSize: 20,
        color: '#333333',
        fontWeight: '700',
    },
})
