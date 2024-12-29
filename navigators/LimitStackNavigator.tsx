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
import { useTab } from "../context/TabContext";
import { useShow } from "../context/ShowContext";
import { useRendering } from "../context/RenderingContext";
import LimitBuyerScreen from "../screens/LimitBuyerScreen";
import BordoreauxStarter from "../screens/BordoreauxStarter";
import { useNavigationHook } from "../hooks/useNavigation";

const Stack = createStackNavigator<RootStackParamList>();

type LimitNavigationProp = StackNavigationProp<RootStackParamList, "LimitBuyer">;

export const LimitStackNavigator = () => {
  // Use navigation inside the function component
  const navigation = useNavigation<LimitNavigationProp>();

  const handlePress = (buyer: BuyerDatatype) => {
    navigation.navigate("LimitForm", buyer);
  };
  const { setSelectedIndex } = useTab();
  const { setShow } = useShow();  
  const { navigateToTarget} = useNavigationHook('LimitBuyer')

  // const {selectedIndexBis , setSelectedIndexBis} = useAdditionalTab()
  const { setRenderingCurrent} = useRendering()
  const goToDashboard = () => {
    //TO-CHANGE
    setRenderingCurrent(true)
    setSelectedIndex(0); 
    setShow(true)
    };

  return (
    <Stack.Navigator initialRouteName={/*showOnboarding ? "BordoreauxStarter" : "Bordoreaux" */ "BordoreauxStarter"} >
      <Stack.Screen
        name="LimitBuyer"
        component={LimitBuyerScreen}
        options={{ headerShown: false }}
      />
       <Stack.Screen name="BordoreauxStarter" options={{ headerShown: false }}>
      {() => <BordoreauxStarter buttonAction={navigateToTarget}  title="About limit request" descriptions={["You need to select a buyer and  the desired document" , "Fill up the given form with valid data" , "After submit your request would be under review"]}/>}
    </Stack.Screen>

      <Stack.Screen name="LimitForm" component={RequestLimit} options={{ headerShown: false }} />

      <Stack.Screen name="Congratulations" options={{ headerShown: false }}>
        {() => <CongratulationsScreen onPress={goToDashboard} text="your request is successfully sent" />}
      </Stack.Screen>


    </Stack.Navigator>
  );
};
