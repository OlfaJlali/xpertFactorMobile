import React from "react";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigationTypes";
import BuyerLitige from "../screens/BuyerLitige";
import LitigeDocument from "../screens/LitigeDocument";
import LitigeDate from "../screens/LitigeDate";
import CongratulationsScreen from "../screens/CongratulationScreen";
import { BuyerDatatype } from "../types/buyersDataTypes";
import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import RequestLimit from "../screens/RequestLimit";

const Stack = createStackNavigator<RootStackParamList>();

type LimitNavigationProp = StackNavigationProp<RootStackParamList, "LimitBuyer">;

export const LimitStackNavigator = () => {
  // Use navigation inside the function component
  const navigation = useNavigation<LimitNavigationProp>();

  const handlePress = (buyer: BuyerDatatype) => {
    navigation.navigate("LimitForm", buyer);
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="LimitBuyer"
        component={() => <BuyerLitige handlePress={handlePress} />}
      />
      <Stack.Screen name="LimitForm" component={() => 
        <RequestLimit />
        
        } />

  <Stack.Screen name="Congratulations" component={CongratulationsScreen} />

    </Stack.Navigator>
  );
};
