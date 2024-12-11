import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SearchList } from '../components/SearchList';
import { COLOR_BLACK, globalStyles, H1_SIZE, H2_SIZE, H3_SIZE } from '../styles/globalStyles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigationTypes';  // Ensure RootStackParamList is correctly typed
import { BuyerDatatype } from '../types/buyersDataTypes';
import { useSearch } from '../hooks/useSearch';
import { documentsDataTypes } from '../types/documentsDataTypes';
import { documentsData } from '../data/Documents';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

const LitigeDocument = ({ route  }: any ) => {
  console.log(route.params)
  const { firstname, lastname, id, picture ,title } = route.params;
  const buyerData: BuyerDatatype = { firstname, lastname, id, picture };

  // Correctly typed navigation prop
  type BuyerLitigeNavigationProp = StackNavigationProp<RootStackParamList, 'LitigeDocument'>;
  const navigation = useNavigation<BuyerLitigeNavigationProp>();

  const { searchQuery, handleSearch, filteredData } = useSearch<documentsDataTypes>(
    documentsData,
    ['number']
  );

  const handlePress = (document: documentsDataTypes) => {
    const LitigeDate = {
      buyerData,
      document
    };

    // Correct navigation with params
    if(title === "Litige") {
      navigation.navigate('LitigeDate', { LitigeDate });

    }else {
      navigation.navigate('ProrogationDate', { ProrogationDate : LitigeDate });

    }
  };

  return (
    <SafeAreaView style={styles.container}>
    <Header padding={false} goBack={() => navigation.pop()} title={title} />
      <SearchList
      text='please select a document'
      
        data={filteredData}
        searchQuery={searchQuery}
        onSearch={handleSearch}
        renderItem={({ item }) => (
          
          <TouchableOpacity onPress={() => handlePress(item)} style={styles.itemContainer}>
            <View style={styles.itemContent}>
              <Image
                source={require('../assets/profile.png')}
                style={styles.profileImage}
              />
              <View style={styles.textContent}>
                <View style={styles.textRow}>
                  <Text style={styles.numberText}>{item.number}</Text>
                  <Text style={styles.retenuText}>retenu: {item.Retenu}</Text>
                </View>
                <Text style={styles.dateText}>{item.date}</Text>
              </View>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsText}>TTC: {item.TTC}</Text>
              <Text style={styles.detailsText}>OUVERT: {item.ouvert}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    paddingTop: 20,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    padding: 15,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  textContent: {
    flex: 1,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  numberText: {
    color: COLOR_BLACK,
    fontSize: H2_SIZE,
    fontWeight: '500',
  },
  retenuText: {
    color: COLOR_BLACK,
    fontSize: H3_SIZE,
    fontWeight: '500',
  },
  dateText: {
    color: COLOR_BLACK,
    fontSize: H3_SIZE,
    fontWeight: '200',
    marginTop: 5,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  detailsText: {
    color: '#3E77BC', 
    fontSize: H3_SIZE,
    fontWeight: '500',
  },
});

export default LitigeDocument;
