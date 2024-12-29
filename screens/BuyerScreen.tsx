import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Animated,
  FlatList,
  Alert,
} from 'react-native';
import { useSearch } from '../hooks/useSearch';
import { SearchList } from '../components/SearchList';
import { buyersData } from '../data/buyers';
import { BuyerDatatype } from '../types/buyersDataTypes';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigationTypes';
import { COLOR_BLACK, COLOR_MAIN, globalStyles, H2_SIZE } from '../styles/globalStyles';
import Icon from '../utils/Icons';
import { useShow } from '../context/ShowContext';
import { Button } from '../components/Button';
import { Tab } from '../components/Tab';
import { SwipeListView } from 'react-native-swipe-list-view';

const Buyer: React.FC = () => {
  type BuyerNavigationProp = StackNavigationProp<RootStackParamList, 'Buyer'>;
  const navigation = useNavigation<BuyerNavigationProp>();

  const [availableBuyers, setAvailableBuyers] = useState<BuyerDatatype[]>(buyersData);
  const [addedBuyers, setAddedBuyers] = useState<BuyerDatatype[]>([]);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [addBuyerView, setAddBuyersView] = useState(true);
  const [alertTriggeredKey, setAlertTriggeredKey] = useState<string | null>(null);

  const slideAnim = useRef(new Animated.Value(50)).current;

  const { setShow } = useShow();
  const { searchQuery, handleSearch, filteredData } = useSearch<BuyerDatatype>(
    availableBuyers,
    ['firstname', 'lastname']
  );

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setShow(true);
    }, [setShow])
  );

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAddBuyers = () => {
    const selectedBuyers = availableBuyers.filter((buyer) => checkedItems[buyer.id]);
    setAddedBuyers((prev) => [...prev, ...selectedBuyers]);
    setAvailableBuyers((prev) => prev.filter((buyer) => !checkedItems[buyer.id]));
    setCheckedItems({});
    setAddBuyersView(false);
  };

  const confirmDelete = (buyer: BuyerDatatype) => {
    Alert.alert(
      'Delete Buyer',
      `Are you sure you want to delete ${buyer.firstname} ${buyer.lastname}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => handleDeleteBuyer(buyer),
        },
      ]
    );
  };

  const handleDeleteBuyer = (buyer: BuyerDatatype) => {
    setAddedBuyers((prev) => prev.filter((b) => b.id !== buyer.id));
    setAvailableBuyers((prev) => [...prev, buyer]);
    setAlertTriggeredKey(null);
  };

  const handleSwipeDelete = ({ key, value }: { key: string; value: number }) => {
    const threshold = -100; // Swipe threshold
    if (value < threshold && alertTriggeredKey !== key) {
      const buyerToDelete = addedBuyers.find((item) => item.id === key);
      if (buyerToDelete) {
        setAlertTriggeredKey(key);
        
        confirmDelete(buyerToDelete);
      }
    }
  };

  const handleSwipeEnd = () => setAlertTriggeredKey(null);

  const renderAvailableBuyer = ({ item }: { item: BuyerDatatype }) => (
    <Animated.View style={[styles.itemContainer, { transform: [{ translateY: slideAnim }] }]}>
      <TouchableOpacity onPress={() => toggleCheck(item.id)} style={styles.itemParent}>
        <View style={styles.itemContent}>
          <View style={styles.buyerInfoContainer}>
            <Image source={require('../assets/profile.png')} style={styles.profileImage} />
            <Text
              style={[styles.nameText, { color: checkedItems[item.id] ? COLOR_BLACK : '#ccc' }]}
            >
              {item.firstname} {item.lastname}
            </Text>
          </View>
          <Icon name="Check" color={checkedItems[item.id] ? COLOR_MAIN : '#ccc'} size={26} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderAddedBuyer = ({ item }: { item: BuyerDatatype }) => (
    <View style={styles.itemContainer}>
      <View style={styles.buyerInfoContainer}>
        <Image source={require('../assets/profile.png')} style={styles.profileImage} />
        <Text style={[styles.nameText, { color: COLOR_BLACK }]}>
          {item.firstname} {item.lastname}
        </Text>
      </View>
    </View>
  );

  const renderHiddenItem = ({ item }: { item: BuyerDatatype }) => (
    <View style={styles.hiddenContainer}>
      <TouchableOpacity style={styles.hiddenButton} onPress={() => confirmDelete(item)}>
        <Icon name="Trash" color="#fff" size={24} />
        <Text style={styles.hiddenText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={globalStyles.PageTitle}>Buyer</Text>
        <TouchableOpacity
          onPress={() => {
            setShow(false);
            navigation.navigate('BordoreauxStarter');
          }}
        >
          <Icon name="Info" color={COLOR_MAIN} size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <Tab title="Add new buyers" isActive={addBuyerView} onPress={() => setAddBuyersView(true)} />
        <Tab title="Added buyers" isActive={!addBuyerView} onPress={() => setAddBuyersView(false)} />
      </View>

      {addBuyerView ? (
        <View style={styles.addBuyerView}>
          <SearchList
            addIcon={false}
            text="Add buyer view"
            data={filteredData}
            searchQuery={searchQuery}
            onSearch={handleSearch}
            renderItem={renderAvailableBuyer}
          />
          <Button onPress={handleAddBuyers} title="Add Buyers" disabled={!Object.values(checkedItems).includes(true)} />
        </View>
      ) : (
        <SwipeListView
          data={addedBuyers}
          keyExtractor={(item) => item.id}
          renderItem={renderAddedBuyer}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={0}
          rightOpenValue={0} 
          disableRightSwipe
          onSwipeValueChange={handleSwipeDelete}
          swipeGestureEnded={handleSwipeEnd}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  hiddenContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  buyerInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  hiddenButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: '100%',
  },
  hiddenText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
  },
  deleteContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    backgroundColor: 'red',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  deleteText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
  },

  container: {
    flex: 1,
    marginHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    paddingBottom: 30,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    justifyContent: 'space-between',
  },
  itemParent: {
    flex: 1,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  nameText: {
    // color: COLOR_BLACK,
    fontSize: H2_SIZE,
    fontWeight: '500',
    marginLeft: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 16,
    marginVertical: 16,
  },
  addBuyerView: {
    flex: 1,
    maxHeight: '70%',
  },
  addedBuyersView: {
    flex: 1,
  },
  addedBuyerItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  addedBuyerText: {
    fontSize: 16,
  },
  emptyListText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
  
});

export default Buyer;
