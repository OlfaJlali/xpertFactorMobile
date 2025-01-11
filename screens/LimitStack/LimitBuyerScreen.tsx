import React from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigationTypes";
import BuyerList from "../ListStack/BuyerList";

type LimitBuyerRouteProp = RouteProp<RootStackParamList, "LimitBuyer">;

interface LimitBuyerScreenProps {
  route: LimitBuyerRouteProp;
  navigation: any; // Adjust this type if you have a specific navigation type
}

const LimitBuyerScreen: React.FC<LimitBuyerScreenProps> = ({ navigation }) => {
  const handlePress = (buyerId: string) => {
    navigation.navigate("LimitForm", buyerId);
  };

  return <BuyerList handlePress={handlePress} pageTitle={"Limit"} />;
};

export default LimitBuyerScreen;
