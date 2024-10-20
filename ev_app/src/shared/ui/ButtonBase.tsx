import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    ViewStyle,
    Text,
    View
} from 'react-native';

type ButtonBaseProps = {
    icon?: React.ComponentType,
    titleStyle?: ViewStyle;
    title?: string;
    action?: any;
}
const ButtonBase = (props: ButtonBaseProps) => {
    const Icon = props.icon
    return (
        <TouchableOpacity style={[styles.container, props.titleStyle]}
            onPress={props.action}>
            <View style ={styles.logout}>
                {Icon && <Icon />}
                <Text style={styles.text}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ButtonBase;
const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        height: 54,
        borderRadius: 15.17,
        borderWidth: 1,
        borderColor: '#139372',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        marginLeft: 6,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#139372',
        fontSize: 16,
        fontWeight: '400',
    },
    logout:{
        flexDirection:'row'
    }

});