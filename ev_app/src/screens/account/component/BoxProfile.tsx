import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import IconBox from '../../../shared/icons/ic_box.svg'
import IconLink from '../../../shared/icons/ic_link.svg'
type BoxProfileProps = {
    title?: string,
    action?: any,
}
export default function BoxProfile(props: BoxProfileProps) {

    return (
        <View>
            <TouchableOpacity style={styles.containerDetail} onPress={props.action}>
                <View style= {styles.box}>
                    <IconBox />
                    <Text style={styles.textDetail}>{props.title}</Text>
                    </View>

                <IconLink />
            
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({

    containerDetail: {
        marginHorizontal:16,
        marginVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    box:{
        flexDirection: 'row'
    },
    textDetail: {
        color: '#333333',
        fontSize: 14,
        fontWeight: '400',
        alignContent: 'center',
        marginLeft: 7,
    }
})
