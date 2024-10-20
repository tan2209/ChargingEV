import React from 'react'
import IconVector from '../../../shared/icons/ic_arrowSearch.svg'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as Colors from '../../../shared/theme/Colors';

type GatewayPaymentCardProps = {
    icon?: React.ComponentType,
    title?: string,
    action?: () => void
}
export default function GatewayPaymentCard(props: GatewayPaymentCardProps) {
    const Icon = props.icon;
    return (
            <TouchableOpacity style={styles.container} onPress={props.action}>
                <View style={styles.icon}>{Icon && <Icon/>}</View> 
                 <Text style={styles.text}>{props.title}</Text>
            </TouchableOpacity>
      
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
    },
    text: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.black,
        alignSelf: 'center'
    },
    icon: {
       flex: 0.3, 
       paddingVertical: 10,
       justifyContent: 'center',
       alignItems: 'center'
    }
})
