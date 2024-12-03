import { Dimensions, StyleSheet } from 'react-native';
const { height , width} = Dimensions.get('window');

export const CardsSliderItemStyles = StyleSheet.create({

    contract:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        paddingLeft: 10,
        paddingBottom:20
    },
    contractText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
    itemContainer: {
        justifyContent: 'center',
        height: 200,
        borderRadius:20,
        width: width * 0.9,
        backgroundColor:'#3E77BC',
        // shadowColor: '#7D64FF', 
        // shadowOffset: { width: 0, height: 8 }, 
        // shadowOpacity: 0.5, 
        // elevation: 10, 
        // shadowRadius: 5,

    },
    textContainer: {
        // backgroundColor: 'rgba(244, 215, 63, 0.5)', 
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold'
    },
    amount: {
        paddingLeft: 20,
        color: '#fff',
        fontSize:26,
        fontWeight: 'bold',

    },
});