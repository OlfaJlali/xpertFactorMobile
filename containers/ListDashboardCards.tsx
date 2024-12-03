import React from 'react';
import { View, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import CardsSliderItem from '../components/CardsSliderItem';
import { CardsData } from '../data/Cards';
import { useScrollHandler } from '../hooks/useScrollHandler';
import { ListDashboardsStyle } from '../styles/ListDashboardCardsStyle';

const { width } = Dimensions.get('window');

type ListDashboardCardsProps = {
    setCurrentIndex : React.Dispatch<React.SetStateAction<number>>
}

export function ListDashboardCards({ setCurrentIndex } : ListDashboardCardsProps) {
    const Separator = () => <View style={{ width: 10 }} />;
    const { scrollX, onScrollHandler, onMomentumScrollEnd } = useScrollHandler(setCurrentIndex);

    return (
        <View style={ListDashboardsStyle.cardContainer}>
            <Animated.FlatList
                data={CardsData}
                renderItem={({ item, index }) => (
                    <CardsSliderItem
                        item={item}
                        index={index}
                        scrollX={scrollX}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                ItemSeparatorComponent={Separator}
                onScroll={onScrollHandler as any} 
                onMomentumScrollEnd={onMomentumScrollEnd}
                scrollEventThrottle={16}
            />
        </View>
    );
}

export default ListDashboardCards;
