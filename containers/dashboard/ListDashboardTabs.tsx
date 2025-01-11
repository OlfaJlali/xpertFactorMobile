import React from 'react';
import { View, Dimensions } from 'react-native';
import { Tab } from '../../components/Tab';
import { listDashboardTabsStyles } from '../../styles/listDashboardTabsStyles';


type ListDashboardTabsProps = {
    selectedTab: string
    setSelectedTab : React.Dispatch<React.SetStateAction<"available" | "available2">>
}

export function ListDashboardTabs({selectedTab , setSelectedTab} : ListDashboardTabsProps) {

    return (
        <View style={listDashboardTabsStyles.tabContainer}>
        <Tab
          title="Available"
          isActive={selectedTab === 'available'}
          onPress={() => setSelectedTab('available')}
        />
        <Tab
          title="Available 2"
          isActive={selectedTab === 'available2'}
          onPress={() => setSelectedTab('available2')}
        />
      </View>
    );
}

export default ListDashboardTabs;
