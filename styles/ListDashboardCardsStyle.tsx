import { Dimensions, StyleSheet } from "react-native";
const { height } = Dimensions.get('window');
export const ListDashboardsStyle = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 16,
        height:height * 0.25,
      },
    
})
