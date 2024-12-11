import React from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigationTypes";
import BuyerLitige from "../screens/BuyerLitige";
import { BuyerDatatype } from "../types/buyersDataTypes";

type LimitBuyerRouteProp = RouteProp<RootStackParamList, "LimitBuyer">;

interface LimitBuyerScreenProps {
  route: LimitBuyerRouteProp;
  navigation: any; // Adjust this type if you have a specific navigation type
}

const LimitBuyerScreen: React.FC<LimitBuyerScreenProps> = ({ navigation }) => {
  const handlePress = (buyer: BuyerDatatype) => {
    navigation.navigate("LimitForm", buyer);
  };

  return <BuyerLitige handlePress={handlePress} pageTitle={"Limit"} />;
};

export default LimitBuyerScreen;
