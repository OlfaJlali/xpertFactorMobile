import React from "react";
import { Dimensions, Text, View } from "react-native";
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from "react-native-reanimated";
import { CardsSliderItemStyles } from '../styles/cardsSliderItemStyles';
import { CardsSliderItems } from "../types/cardsSliderItems";
import SVGComponent from "./SvgCard";

const { width ,height} = Dimensions.get('window');

const CardsSliderItem = ({ index, item, scrollX }: CardsSliderItems) => {
    const rnAimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: interpolate(
                        scrollX.value,
                        [(index - 1) * width, index * width, (index + 1) * width],
                        [0.5, 1, 0.5],
                        Extrapolation.CLAMP
                    )
                }
            ]
        }
    });

    return (
        <Animated.View style={[rnAimatedStyle, { position: 'relative', width: width * 0.9, height: height * 0.3 }]}>
            <SVGComponent  style={{shadowColor: "#3E77BC",
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: 0.7,
            shadowRadius: 8,
            elevation: 10,
            }}/>
            <View style={{ position: 'absolute', top: '10%', left: '10%', }}>
                <Text style={CardsSliderItemStyles.title}>{item.title}</Text>
            </View>
            <View style={{ position: 'absolute', bottom:'40%', left: '25%', transform: [{ translateX: -50 }] }}>
                <Text style={CardsSliderItemStyles.amount}>{item.amount}</Text>
            </View>
        </Animated.View>
    );
};

export default CardsSliderItem;
