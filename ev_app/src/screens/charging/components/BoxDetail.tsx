import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type BoxDetailProps = {
  icon?: React.ComponentType,
  title?: string,
}
export default function BoxDetail(props: BoxDetailProps) {
  const Icon = props.icon;
  return (
    <View>
      <View style={styles.containerDetail}>
        {Icon && <Icon />}
        <Text style={styles.textDetal} numberOfLines={1}>{props.title}</Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({

  containerDetail: {
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textDetal: {
    color: '#73656C',
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 5,
    paddingRight: 5,
  }
})
