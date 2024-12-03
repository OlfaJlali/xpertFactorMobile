import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width , height } = Dimensions.get('window');

const TransactionList = () => {
  const [selectedItem, setSelectedItem] = useState<number | null>(6); // Set initial selected item

  // Generate numbers from 1 to 10
  const data = Array.from({ length: 10 }, (_, i) => i + 1);

  const renderItem = ({ item }: { item: number }) => {
    const isSelected = selectedItem === item;

    return (
      <TouchableOpacity
        style={[styles.itemContainer, isSelected && styles.selectedItemContainer]}
        onPress={() => setSelectedItem(item)}
      >
        <Text style={[styles.itemText, isSelected && styles.selectedItemText]}>
          {item}
        </Text>
        {/* {isSelected && <Text style={styles.checkmark}>✓</Text>} */}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Documents number</Text>
      <FlatList
        style={{height:height * 0.1}}
        data={data}
        horizontal
        renderItem={renderItem}
        keyExtractor={(item) => item.toString()}
        contentContainerStyle={styles.listContainer}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2E2E3A',
  },
  listContainer: {
    alignItems: 'center',

  },
  itemContainer: {
    width: width / 6,
    height: width / 6,
    borderRadius: 10,
    backgroundColor: '#F1F1F3',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000000",
shadowOffset: {
  width: 0,
  height: 4,
},
shadowOpacity:  0.19,
shadowRadius: 5.62,
elevation: 6


    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
  },
  selectedItemContainer: {
    backgroundColor: '#1A152B',
    shadowColor: "#A29BFE",
shadowOffset: {
  width: 0,
  height: 4,
},
shadowOpacity:  0.5,
shadowRadius: 5.62,
elevation: 6


  },
  itemText: {
    fontSize: 18,
    color: '#2E2E3A',
  },
  selectedItemText: {
    color: '#FFFFFF',
  },
//   checkmark: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     position: 'absolute',
//     bottom: -5,
//   },
});

export default TransactionList;
