import React from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { COLOR_MAIN, globalStyles } from '../styles/globalStyles';
import SearchInput from './SearchInput';
import Icon from '../utils/Icons';

interface SearchListProps<T> {
  data: T[];
  searchQuery: string;
  onSearch: (query: string) => void;
  text: string
  renderItem: ({ item }: { item: T }) => JSX.Element;
  addIcon? : boolean
}

export const SearchList = <T,>({
  data,
  searchQuery,
  onSearch,
  renderItem,
  text,
  addIcon = false
}: SearchListProps<T>) => (
  <View style={styles.container}>
         
        {addIcon ? ( <View style={{    flexDirection: 'row',
          justifyContent: 'space-between',
      }}>
          <Text style={globalStyles.inputTitle}>{text}</Text>
          <TouchableOpacity onPress={() => console.log('Plus button pressed')}>
              <Icon name='CirclePlus' size={24} color={COLOR_MAIN} />
              </TouchableOpacity>
      </View>)  :  <Text style={globalStyles.inputTitle}>{text}</Text>
        }
    <SearchInput 
    searchQuery={searchQuery}
    onSearch={onSearch}
    />
    
    {data.length > 0 ? (
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    ) : (
      <View style={styles.emptyContainer}>
        <Text>No results found.</Text>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,

  },
  emptyContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
