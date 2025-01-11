import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, View, StyleSheet } from 'react-native';
import { useTabState } from '../../hooks/useTabState';
import { ListItem } from '../../components/ListItem';
import { dashboardData } from '../../data/Dashboard';
import { globalStyles } from '../../styles/globalStyles';
import ListDashboardCards from '../../containers/dashboard/ListDashboardCards';
import ListDashboardTabs from '../../containers/dashboard/ListDashboardTabs';
import { ContractItemSkeleton } from '../../components/ContractItemSkeleton';
import CardsSliderItemSkeleton from '../../components/CardsSliderItemSkeleton';
import { TransformedDataItem } from '../../domain/usecases/transformData';
import { useFetchContracts } from '../../hooks/useFetchContracts';
import { useTransformData } from '../../hooks/useTransformData';

const DashboardScreen = () => {
  const { selectedTab, setSelectedTab } = useTabState<'available' | 'available2'>('available');
  const {contracts , loading} = useFetchContracts();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [source,setSource] = useState<TransformedDataItem[]>([]);
  const details = useTransformData(contracts, currentIndex);

  useEffect(() => {
    setSource(selectedTab === 'available' ? details : dashboardData.available2data);
  }, [selectedTab, details]);

  return (
    <SafeAreaView style={globalStyles.safeAreaContainer}>
      {loading ?(
        <View style={styles.skeletonContainer}>
          <CardsSliderItemSkeleton />
      </View>
       ):(
        <ListDashboardCards setCurrentIndex={setCurrentIndex} contracts={contracts}  />
       )}
      <ListDashboardTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {loading ? (
        <View>
        {[...Array(4)].map((_, index) => (
          <ContractItemSkeleton key={index} />
        ))}
      </View>
    ): (
      <FlatList      
      style={styles.flatList}
        data={source}
        renderItem={({ item }) => <ListItem item={item} />}
        keyExtractor={(item) => item.id}
      />)}
    </SafeAreaView>

  );
};
const styles = StyleSheet.create({

  skeletonContainer: {
    alignSelf:'center',
    paddingTop:10
   },
  flatList: {
    backgroundColor: '#FCFFFE',
    elevation: 5,
  },
});

export default DashboardScreen;
