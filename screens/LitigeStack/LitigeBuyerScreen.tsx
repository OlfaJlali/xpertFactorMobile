import React from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigationTypes";
import BuyerList from "../ListStack/BuyerList";
import { BuyerDatatype } from "../../types/buyersDataTypes";
import { Buyer } from "../../domain/entities/Buyer";

type LitigeBuyerRouteProp = RouteProp<RootStackParamList, "Litige">;

interface LitigeBuyerScreenProps {
  route: LitigeBuyerRouteProp;
  navigation: any; // Adjust this type if you have a specific navigation type
}

const LitigeBuyerScreen: React.FC<LitigeBuyerScreenProps> = ({ navigation }) => {
  const handlePress = (id: string) => {
    navigation.navigate("LitigeDocument", {id});
  };

  return <BuyerList handlePress={handlePress} pageTitle={"Litige"} />;
};

export default LitigeBuyerScreen;
