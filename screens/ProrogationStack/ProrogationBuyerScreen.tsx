import React from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigationTypes";
 import BuyerList from "../ListStack/BuyerList";

type ProrogationBuyerRouteProp = RouteProp<RootStackParamList, "Prorogation">;

interface ProrogationBuyerScreenProps {
  route: ProrogationBuyerRouteProp;
  navigation: any; // Adjust this type if you have a specific navigation type
}

const ProrogationBuyerScreen: React.FC<ProrogationBuyerScreenProps> = ({ navigation }) => {
  const handlePress = (id: string) => {
    navigation.navigate("ProrogationDocument", {id});
  };

  return <BuyerList handlePress={handlePress} pageTitle={"Prorogation"} />;
};

export default ProrogationBuyerScreen;
