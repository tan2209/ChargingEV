import React, { useState } from 'react'
import { Modal, View, Text, StyleSheet } from 'react-native'
import ButtonBasic from './ButtonBasic';
import IcSucess from '../icons/ic_successful.svg'
type ModalProps = {
    title?: string,
    information?: string,
    textButton?: string,
    isVisible?: boolean,
    action?: any,
}

export default function BaseModal(props: ModalProps) {

    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={props.isVisible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalContainer}>
                    <View style={styles.icons}><IcSucess /></View>
                    <Text style={styles.modalText}>{props.title}</Text>
                    <Text style={styles.modalInfo}>{props.information}</Text>
                    <ButtonBasic titleStyle={styles.button}
                        action={props.action}
                        title={props.textButton} />
                </View></View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    modalContainer: {
        marginHorizontal: 24,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        paddingHorizontal: 24,
    },
    icons: {
        height: 90,
        width: 90,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FAF8',
        borderRadius: 50,
        borderColor: 'red',
        marginVertical: 24,
    },
    modalText: {
        color: 'black',
        fontSize: 20,
        fontWeight: '700',
    },
    modalInfo: {
        color: '#73656C',
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center',
        marginBottom: 24,
        marginTop: 8
    },
    button: {
        backgroundColor: '#139372',
        paddingHorizontal: 90,
        marginBottom: 24,
    }
})
