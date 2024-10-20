import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ViewStyle, 
  Text
} from 'react-native';

type ButtonBasicProps = {
    titleStyle?: ViewStyle;
    title?: string;
    action?:any;
}
const ButtonBasic = (props: ButtonBasicProps) => {
    return (
        <TouchableOpacity style={[styles.container,props.titleStyle]}
                            onPress={props.action}>
            <Text style={styles.login}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default ButtonBasic;

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        height: 54,
        borderRadius: 15.17,
        borderColor: '#FAF7F5',
        justifyContent: 'center',
        alignItems : 'center',
    },
    login:{
        
        justifyContent: 'center',
        alignItems : 'center',
        color: '#FFFFFF',
        fontSize: 16,
       fontWeight: '700',
    }
    
});