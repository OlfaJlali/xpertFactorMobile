import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, Animated, Platform } from 'react-native';
import { useSearch } from '../../hooks/useSearch';
import { SearchList } from '../../components/SearchList';
import { BuyerDatatype } from '../../types/buyersDataTypes';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigationTypes';
import { COLOR_BLACK, COLOR_MAIN, globalStyles, H2_SIZE, H3_SIZE } from '../../styles/globalStyles';
import { useShow } from '../../context/ShowContext';
import Icon from '../../utils/Icons';
import { DIContainer } from '../../di/container';
import { useGetCurrentUser } from '../../hooks/useGetCurrentUser';

type BuyerLitigeProps = {
  handlePress : (item : any) => void
  pageTitle : string
}

const BuyerList: React.FC<BuyerLitigeProps> = ({ handlePress, pageTitle }) => {
  type BuyerListnNavigationProp = StackNavigationProp<RootStackParamList, 'LitigeDocument'>;
  const navigation = useNavigation<BuyerListnNavigationProp>();
  const {fetchUser } = useGetCurrentUser();

  const [buyers, setBuyers] = useState<BuyerDatatype[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1); 
  const slideAnim = useRef(new Animated.Value(50)).current; 
  const { setShow } = useShow();
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setPage(1);
    }
  };

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);
  useFocusEffect(
    useCallback(() => {
      setShow(true);
    }, [setShow])
  );
  // Fetch buyers from the backend
  const fetchBuyers = useCallback(async (page: number, search: string) => {
    try {
      setLoading(true);
      const user = await fetchUser()
      if(user?.identifier){
        const { buyers: fetchedBuyers, currentPage, totalPages, totalBuyers } =
        await DIContainer.getBuyersUseCase.execute(user?.identifier, page, 5, search);
        setBuyers(prevBuyers => (page === 1 ? fetchedBuyers : [...prevBuyers, ...fetchedBuyers])); 
      setPagination({ currentPage, totalPages, totalBuyers });
      }else {
        console.error(user ,'no identifier provided')
      }
    } catch (err) {
      setError('Failed to fetch buyers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);
  
  const { filteredData } = useSearch<BuyerDatatype>(
    buyers,
    ['firstname', 'lastname'],
    searchQuery,
    fetchBuyers
  );
  useEffect(() => {
    fetchBuyers(1, ''); 
  }, [searchQuery, fetchBuyers]);

  const handleLoadMore = () => {
    if (loading || pagination.currentPage >= pagination.totalPages) return;
    setPage(prevPage => prevPage + 1); 
    fetchBuyers(page + 1, searchQuery);
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={globalStyles.PageTitle}>{pageTitle}</Text>
        <TouchableOpacity onPress={() => {
          setShow(false);
          navigation.navigate('BordoreauxStarter');
        }}>
          <Icon name="Info" color={COLOR_MAIN} size={24} />
        </TouchableOpacity>
      </View>

      <SearchList
        text="Please select a buyer"
        data={filteredData}
        searchQuery={searchQuery}
        onSearch={handleSearch}
        renderItem={({ item }) => (
          <Animated.View style={[styles.itemContainer, { transform: [{ translateY: slideAnim }] }]}>
            <TouchableOpacity onPress={() => handlePress(item.id)} style={styles.itemContent}>
              <Image source={require('../../assets/profile.png')} style={styles.profileImage} />
              <Text style={styles.nameText}>
                {item.firstname} {item.lastname}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}
        onEndReached={handleLoadMore} 
        onEndReachedThreshold={0.25} 
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
  header: {
    paddingBottom: 30,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between', // Distributes items to the edges
    alignItems: 'center',           // Vertically centers items
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

export default BuyerList;
