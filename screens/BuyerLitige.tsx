import React, { useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, Animated } from 'react-native';
import { useSearch } from '../hooks/useSearch';
import { SearchList } from '../components/SearchList';
import { buyersData } from '../data/buyers';
import { BuyerDatatype } from '../types/buyersDataTypes';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigationTypes';
import { COLOR_BLACK, globalStyles, H2_SIZE, H3_SIZE } from '../styles/globalStyles';

type BuyerLitigeProps = {
  handlePress : (item : any) => void
  pageTitle : string
}

const BuyerLitige : React.FC<BuyerLitigeProps>= ({handlePress , pageTitle}) => {
  type BuyerLitigenNavigationProp = StackNavigationProp<RootStackParamList, 'LitigeDocument'>;
  const navigation = useNavigation<BuyerLitigenNavigationProp>();

  const { searchQuery, handleSearch, filteredData } = useSearch<BuyerDatatype>(
    buyersData,
    ['firstname', 'lastname']
  );

  const slideAnim = useRef(new Animated.Value(50)).current; // Start off-screen (50px below)

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={globalStyles.PageTitle}>{pageTitle}</Text>

      <SearchList
        text='please select a buyer'
        data={filteredData}
        searchQuery={searchQuery}
        onSearch={handleSearch}
        renderItem={({ item }) => (
          <Animated.View style={[styles.itemContainer, { transform: [{ translateY: slideAnim }] }]}>
            <TouchableOpacity onPress={() => handlePress(item)} style={styles.itemContent}>
              <Image
                source={require('../assets/profile.png')}
                style={styles.profileImage}
              />
              <Text style={styles.nameText}>
                {item.firstname} {item.lastname}
              </Text>
            </TouchableOpacity>
          </Animated.View>
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
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  nameText: {
    color: COLOR_BLACK,
    fontSize: H2_SIZE,
    fontWeight: '500',
    marginLeft: 10,
  },
});

export default BuyerLitige;
