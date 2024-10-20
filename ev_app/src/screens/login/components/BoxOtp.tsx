import React, { forwardRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import * as Colors from '../../../shared/theme/Colors';

type BoxOtpProps = {
    parentCallback?: (data: string) => void;
};

const BoxOtp = forwardRef<TextInput, BoxOtpProps>((props, ref) => {
    const [number, setNumber] = useState('');

    const sendData = (number: string) => {
        setNumber(number);
        if (props.parentCallback) {
            props.parentCallback(number);
        }
    };

    return (
        <View style={styles.boxOtp}>
            <TextInput
                ref={ref}
                style={styles.inputOtp}
                value={number}
                onChangeText={sendData}
                maxLength={1}
                keyboardType="numeric"
            />
        </View>
    );
});

const styles = StyleSheet.create({
    boxOtp: {
        flex: 1,
        margin: 5,
        backgroundColor: Colors.white,
        borderRadius: 8,
        borderColor: Colors.lightGray,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowRadius: 7,
        shadowOpacity: 0.4,
        elevation: 12,
        height: 54,
    },
    inputOtp: {
        color: Colors.black,
        fontSize: 24,
        fontWeight: '500',
        textAlign: 'center',
    },
});

export default BoxOtp;
