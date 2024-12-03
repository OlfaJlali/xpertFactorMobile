import { SharedValue } from "react-native-reanimated";
export type CardsDataType = {
    id:string ,
    title:string,
    amount:string,
  }
export type CardsSliderItems = {
    item: CardsDataType;
    index: number;
    scrollX:SharedValue<number>
};