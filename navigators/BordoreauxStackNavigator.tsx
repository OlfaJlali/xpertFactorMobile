import { createStackNavigator } from "@react-navigation/stack";
import BordoreauxFormScreen from "../screens/BordoreauxForm";
import BordoreauxScreen from "../screens/BordoreauxScreen";
import CongratulationsScreen from "../screens/CongratulationScreen";
import { RootStackParamList } from "../types/navigationTypes";
import BordoreauxStarter from "../screens/BordoreauxStarter";
import { useTab } from "../context/TabContext";
import { useShow } from "../context/ShowContext";
import { useRendering } from "../context/RenderingContext";

const Stack = createStackNavigator<RootStackParamList>();

export const BordereauxStackNavigator = () => {
  // const navigation = useNavigation<LitigieNavigationProp>();

  // const handlePress = (buyer: BuyerDatatype) => {
  //   navigation.navigate("LitigeDocument", buyer);
  // };

  const { setSelectedIndex } = useTab();
  const { setShow } = useShow();  
  // const {selectedIndexBis , setSelectedIndexBis} = useAdditionalTab()
  const { setRenderingCurrent} = useRendering()
  const goToDashboard = () => {
    //TO-CHANGE
    setRenderingCurrent(true)
    setSelectedIndex(0); 
    setShow(true);
    };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='BordoreauxStarter' component={BordoreauxStarter} />
      <Stack.Screen name='Bordoreaux' component={BordoreauxScreen} />
      <Stack.Screen name="BordoreauxForm" component={BordoreauxFormScreen} />
      {/* <Stack.Screen name="Congratulations" component={CongratulationsScreen} /> */}
          <Stack.Screen name="Congratulations">
      {() => <CongratulationsScreen onPress={goToDashboard} text="your request is successfully sent" />}
    </Stack.Screen>
    </Stack.Navigator>
  );
};