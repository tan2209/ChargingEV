import { View, Text, TouchableOpacity, StyleSheet, Pressable, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import BottomNavigationItem from './BottomNavigationItem';

const TabBar = ({ state, descriptors, navigation }: any) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setVisible(false);
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setVisible(true);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);
    return  visible&&(
        <View style={styles.container}>
            {state.routes.map((route: any, index: number) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <View key={index} style={[styles.mainContainer]}>
                        <Pressable onPress={onPress}>
                            <BottomNavigationItem isActive={isFocused} name={label} />
                        </Pressable>
                    </View>
                );
            })}
        </View>
    )


}

export default TabBar;

const styles = StyleSheet.create({
    container: {
        height: 70,
        alignItems: 'center',
        flexDirection: 'row',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#F7F5F9',
        borderColor: '#C4C4C4',
        borderWidth: 0.5,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 3,
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    }
}) 