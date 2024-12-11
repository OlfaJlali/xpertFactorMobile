import React from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigationTypes";
import BuyerLitige from "../screens/BuyerLitige";
import { BuyerDatatype } from "../types/buyersDataTypes";

type LitigeBuyerRouteProp = RouteProp<RootStackParamList, "Litige">;

interface LitigeBuyerScreenProps {
  route: LitigeBuyerRouteProp;
  navigation: any; // Adjust this type if you have a specific navigation type
}

const LitigeBuyerScreen: React.FC<LitigeBuyerScreenProps> = ({ navigation }) => {
  const handlePress = (buyer: BuyerDatatype) => {
    navigation.navigate("LitigeDocument", buyer);
  };

  return <BuyerLitige handlePress={handlePress} pageTitle={"Litige"} />;
};

export default LitigeBuyerScreen;
