import React from 'react'
import { StyleSheet, View, Dimensions, Image, Text, TouchableOpacity } from 'react-native'
import IconElectric from '../../../shared/icons/ic_electric.svg'
import IconElectricity from '../../../shared/icons/ic_electricity.svg'
import IconStar from '../../../shared/icons/ic_star.svg'
import IconLocation from '../../../shared/icons/ic_locations.svg'
import IconStaion from '../../../shared/icons/ic_charging-station.svg'
import IconClock from '../../../shared/icons/ic_time.svg'
import BoxDetail from '../../charging/components/BoxDetail'
import * as Colors from '../../../shared/theme/Colors'
import IconDirection from '../../../shared/icons/ic_direction.svg'

type CardStationProps = {
    _id?: string,
    nameCharging?: string,
    location?: string,
    power?: string,
    star?: string,
    fillSlot?: number,
    totalSlot?: string,
    open_status?: boolean,
    distance: number,
    action?: () => any,
}

const ChargingRecommend = React.memo((props: CardStationProps) => {
    const distance = props.distance/1000
    return (
        <TouchableOpacity style={styles.container} onPress={props.action} >
            <View style={styles.image}>
                <Image source={require('../../../../asset/image/eVCharge.jpg')}
                    style={{ resizeMode: 'cover', height: '92%', width: '80%', borderRadius: 8 }} />
            </View>
            <View style={styles.info}>
              
                <Text style={styles.name} numberOfLines={1}>{props.nameCharging}</Text>
                
                <Text style={styles.textLocation} numberOfLines={1}>{props.location}</Text>
                
                <BoxDetail icon={IconLocation} title={`${distance.toFixed(2)} km`} />              
                    <BoxDetail icon={IconElectric} title={`${props.power} kw`} />
                    <BoxDetail icon={IconStaion} title={`${props.totalSlot}`} />
             <View>
                </View>
            </View>
        </TouchableOpacity>

    )
})

export default ChargingRecommend;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 12,
        marginHorizontal: 16,
        borderRadius: 12,
        backgroundColor: '#FFFDFC',
        shadowColor: '#222222',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 8,
        shadowOpacity: 1,
        elevation: 10,
        paddingVertical: 12,
    },
    image: {
        flex: 0.3,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    info: {
        flex: 0.7,
        marginLeft: 4
    },
    name: {
        color: Colors.primaryGreen,
        fontSize: 16,
        fontWeight: '700',
        marginRight: 10,
    },
    box: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        marginVertical: 10,
        marginHorizontal: 35,
        color: '#969799',
        fontSize: 14,
        fontWeight: '500'
    },
    textCheck: {
        marginVertical: 10,
        marginHorizontal: 35,
        color: '#4184F2',
        fontSize: 14,
        fontWeight: '500'
    },
    checkBox: {
        marginTop: 10,
        borderRadius: 20,
    },
    Box: {
        marginTop: 10,
        borderRadius: 20,
    },
    distance: {
        fontSize: 12,
        color: Colors.primaryGreen,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 5,
    }, 
    textLocation: {
        fontSize: 12,
        color:'#959595',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 5,
    }
})