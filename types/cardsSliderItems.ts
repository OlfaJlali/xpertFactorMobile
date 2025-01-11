import { SharedValue } from "react-native-reanimated";
import { Contract } from "../domain/entities/Contract";
export type CardsSliderItems = {
    item: Contract;
    index: number;
    scrollX:SharedValue<number>
};