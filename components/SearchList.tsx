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
  onEndReached? : ((info: {distanceFromEnd: number}) => void) | null | undefined;
  onEndReachedThreshold? : number | null | undefined
}

export const SearchList = <T,>({
  data,
  searchQuery,
  onSearch,
  renderItem,
  text,
  addIcon = false,
  onEndReached,
  onEndReachedThreshold
}: SearchListProps<T>) => (
  <View style={styles.container}>
    <View style={{  flexDirection: 'row' , justifyContent: 'space-between'}}>
    <Text style={globalStyles.inputTitle}>{text}</Text>
         {addIcon &&(
         <TouchableOpacity onPress={() => console.log('Plus button pressed')} style={{backgroundColor: COLOR_MAIN , borderRadius: 20} }>
         <Icon name='CirclePlus' size={37} color={'#FFF'} />
         </TouchableOpacity>
     )}  
    </View>

 
        <SearchInput 
        searchQuery={searchQuery}
        onSearch={onSearch}
        
        />
    
    
    
    {data.length > 0 ? (
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        onEndReached={onEndReached}
        onEndReachedThreshold={onEndReachedThreshold}
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
