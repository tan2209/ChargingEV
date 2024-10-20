import React from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import * as Colors from '../../../shared/theme/Colors'

type BaseDetailProps = {
    title?: string;
    placeholder?: string;
    isPassword?: boolean;
    onChangeText: (text: string) => void;
}

export default function BoxLogin(props: BaseDetailProps) {
    return (
        <View style={styles.boxAccount}>
            <Text style={styles.header}>{props.title}</Text>
            <TextInput
                style={styles.detail} 
                placeholder={props.placeholder} 
                secureTextEntry={props.isPassword} 
                onChangeText={(text: string)=> props.onChangeText(text)} />
        </View>
    )
}

const styles = StyleSheet.create({
    boxAccount: {
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    header: {
        marginLeft: 5,
        fontSize: 12,
        color: Colors.black,
        paddingHorizontal: 10,
        fontWeight: '700'
    },
    detail: {
        marginLeft: 10,
        marginRight: 10,
    }
})
