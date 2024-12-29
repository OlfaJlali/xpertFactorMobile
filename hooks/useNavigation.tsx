import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigationTypes";
import { useShow } from "../context/ShowContext";
import { useCallback } from "react";

export const useNavigationHook = (
  toScreen: any,
  params?: any
) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  
  const navigateToTarget = () => {
    // Conditional navigation based on whether params are required
    if (params !== undefined) {
      navigation.navigate(toScreen, params); // If params exist
    } else {
      navigation.navigate(toScreen); // If no params
    }
    // setShow(true);
  };

  return { navigateToTarget };
};
