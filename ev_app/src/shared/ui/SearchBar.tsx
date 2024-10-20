import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '../icons/ic_searchNomal.svg';
import Filter from '../icons/ic_filter.svg';

type SearchBarProps = {
  onChangeText: (text: string) => void;
  value?: string;
  onSubmitEditing: any;
}

const SearchBar = (props: SearchBarProps) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View>
          <Icon style={styles.searchIcon} />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm"
          onChangeText={(text: string)=> props.onChangeText(text)} 
          value={props.value}
          onSubmitEditing={props.onSubmitEditing}
        />
      </View>
      {/* <TouchableOpacity style={styles.filterContainer}>
        <Filter style={styles.filterIcon} />
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'transparent',
  },
  container: {
    marginVertical: 10,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#959595',
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    flex: 1,


  },
  searchIcon: {
    marginRight: 10,
    marginLeft: 5,

  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  filterContainer: {
    marginLeft: 5,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#959595',
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 7,
    shadowOpacity: 0.4,
    elevation: 12,
  },
  filterIcon: {
    width: 24,
    height: 24,
  },
});

export default SearchBar;
