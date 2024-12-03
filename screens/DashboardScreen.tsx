import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, View } from 'react-native';
import { useTabState } from '../hooks/useTabState';
import { ListItem } from '../components/ListItem';
import { CardsData } from '../data/Cards';
import { dashboardData } from '../data/Dashboard';
import { FilteredDataItem } from '../types/dashboardtypes';
import { globalStyles } from '../styles/globalStyles';
import ListDashboardCards from '../containers/ListDashboardCards';
import ListDashboardTabs from '../containers/ListDashboardTabs';

const DashboardScreen = () => {
  const { selectedTab, setSelectedTab } = useTabState<'available' | 'available2'>('available');
  const [filteredData, setFilteredData] = useState<FilteredDataItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const contractNumber = CardsData[currentIndex]?.title;
    const dataSource = selectedTab === 'available' ? dashboardData.availabledata : dashboardData.available2data;
    const foundItem = dataSource.find(item => item.contractNumber === contractNumber);
    const updatedFilteredData = foundItem ? foundItem.data : [];
    setFilteredData(updatedFilteredData);
  }, [currentIndex, selectedTab]);


  return (
    <SafeAreaView style={globalStyles.safeAreaContainer}>
      <ListDashboardCards setCurrentIndex={setCurrentIndex}  />
      <ListDashboardTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <FlatList      
      style={{backgroundColor:'#FCFFFE', elevation: 5 }}
        data={filteredData}
        renderItem={({ item }) => <ListItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default DashboardScreen;
