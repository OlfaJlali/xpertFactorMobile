// components/TabSelector.tsx
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Tab } from '../../components/Tab';

interface TypeSelectorProps {
  tabs: { title: string; key: string }[];
  selectedTab: string;
  onSelectTab: (key: string) => void;
  centred?: boolean
}

const TypeSelector: React.FC<TypeSelectorProps> = ({ tabs, selectedTab, onSelectTab, centred = true }) => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.horizontalContainer}
      style={centred ? {alignSelf:'center'}: styles.horizontalScrollView}
    >
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <Tab
            key={tab.key}
            title={tab.title}
            isActive={selectedTab === tab.key}
            onPress={() => onSelectTab(tab.key)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  horizontalContainer: {
    paddingHorizontal: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    alignSelf:'center',
    gap:16,
    marginVertical: 16,
  
  },

  horizontalScrollView: {
    flexGrow: 0,
  },
  horizontalTabWrapper: {
    gap: 16,
    flexDirection: 'row',
  },
  verticalTabWrapper: {
    gap: 8,
  },
});

export default TypeSelector;
