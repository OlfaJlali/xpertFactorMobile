import React from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigationTypes";
import { BuyerDatatype } from "../types/buyersDataTypes";
import BuyerLitige from "./BuyerLitige";

type ProrogationBuyerRouteProp = RouteProp<RootStackParamList, "Prorogation">;

interface ProrogationBuyerScreenProps {
  route: ProrogationBuyerRouteProp;
  navigation: any; // Adjust this type if you have a specific navigation type
}

const ProrogationBuyerScreen: React.FC<ProrogationBuyerScreenProps> = ({ navigation }) => {
  const handlePress = (buyer: BuyerDatatype) => {
    navigation.navigate("ProrogationDocument", buyer);
  };

  return <BuyerLitige handlePress={handlePress} pageTitle={"Prorogation"} />;
};

export default ProrogationBuyerScreen;
