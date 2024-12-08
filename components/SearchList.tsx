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
import { globalStyles } from '../styles/globalStyles';
import SearchInput from './SearchInput';

interface SearchListProps<T> {
  data: T[];
  searchQuery: string;
  onSearch: (query: string) => void;
  text: string
  renderItem: ({ item }: { item: T }) => JSX.Element;
}

export const SearchList = <T,>({
  data,
  searchQuery,
  onSearch,
  renderItem,
  text
}: SearchListProps<T>) => (
  <View style={styles.container}>
          <Text style={globalStyles.inputTitle}>{text}</Text>

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
