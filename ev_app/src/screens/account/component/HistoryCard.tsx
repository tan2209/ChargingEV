import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ImageStation from '../../../shared/icons/imageStation.svg';
import { formatCurrency } from '../../../utils/formatMoney';
import { formatTime } from '../../../utils/formatTime';

type HistoryCardProps = {
    nameCharging?: string;
    location?: string;
    time?: string;
    timePeriod: number;
    price: number;
    status?: string;
};

const HistoryCard = memo((props: HistoryCardProps) => {
    const totalTime = props?.timePeriod;

    const formatDate = (dateString: any) => {
        const year = dateString.substring(0, 4);
        const month = dateString.substring(5, 7);
        const day = dateString.substring(8, 10);
        return `${day} - ${month} - ${year}`;
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.rowFirst}>
                    <View style={styles.image}>
                        <ImageStation />
                    </View>
                    <View style={styles.detailStation}>
                        <Text style={styles.name}>{props.nameCharging}</Text>
                        <Text style={styles.location}>{props?.location} Khu công nghệ cao Hòa Lạc</Text>
                        <Text style={styles.distance}>{formatDate(props.time)}</Text>
                    </View>
                </View>
                <View style={styles.rowSecond}>
                    <View style={styles.typeStation}>
                        <Text style={styles.transportation}>Thời gian sạc</Text>
                        <Text style={styles.detail}>{formatTime(totalTime)}</Text>
                    </View>
                    <View style={styles.boxMini}></View>
                    <View style={styles.power}>
                        <Text style={styles.transportation}>Giá tiền</Text>
                        <Text style={styles.detail}>{formatCurrency(props?.price)}</Text>
                    </View>
                    <View style={styles.boxMini}></View>
                    <View style={styles.slot}>
                        <Text style={styles.transportation}>Tình trạng</Text>
                        <Text style={styles.detail}>{props.status}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10,
        flexDirection: 'row',
        height: 174,
        borderWidth: 1,
        backgroundColor: '#fff',
        marginHorizontal: 16,
        borderRadius: 20,
        borderColor: '#C4C4C4',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowRadius: 7,
        shadowOpacity: 0.4,
        elevation: 12,
    },
    content: {
        marginVertical: 15,
        flex: 1,
        paddingHorizontal: 15,
    },
    rowFirst: {
        marginHorizontal: 10,
        flexDirection: 'row',
    },
    name: {
        fontSize: 14,
        color: '#139372',
        paddingHorizontal: 10,
        fontWeight: '700',
    },
    location: {
        fontSize: 12,
        color: '#959595',
        paddingHorizontal: 10,
        fontWeight: '400',
    },
    distance: {
        fontSize: 12,
        color: '#139372',
        paddingHorizontal: 10,
        fontWeight: '400',
    },
    image: {
        flexDirection: 'column',
    },
    detailStation: {
        justifyContent: 'center',
        marginHorizontal: 20,
    },
    rowSecond: {
        marginVertical: 15,
        flexDirection: 'row',
        height: 62,
        borderWidth: 1,
        backgroundColor: '#EBEFFC',
        marginHorizontal: 10,
        borderRadius: 12,
        borderColor: '#4184F2',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowRadius: 7,
        shadowOpacity: 0.4,
        elevation: 12,
    },
    typeStation: {
        flexDirection: 'column',
        width: 110,
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxMini: {
        marginVertical: 20,
        flexDirection: 'row',
        borderColor: '#4184F2',
        borderRightWidth: 1,
    },
    power: {
        flexDirection: 'column',
        borderColor: '#4184F2',
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slot: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    transportation: {
        fontSize: 12,
        color: '#000000',
        paddingHorizontal: 10,
        fontWeight: '500',
    },
    detail: {
        fontSize: 12,
        color: '#4184F2',
        paddingHorizontal: 10,
        fontWeight: '500',
    },
});

export default HistoryCard;
