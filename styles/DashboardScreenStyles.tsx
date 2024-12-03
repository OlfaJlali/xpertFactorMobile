import { Dimensions, StyleSheet } from 'react-native';
const { height } = Dimensions.get('window');

export const DashboardScreenStyles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 16,
    height:height * 0.25,
  },
  card: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 10,
    marginRight: 8,
  },
  cardBlue: {
    backgroundColor: '#007bff',
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
  },
  cardAmount: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    alignSelf:'center',
    gap:16,
    marginVertical: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: '#282534', borderWidth: 1, backgroundColor: 'transparent',
    borderRadius: 5
  },
  activeTab: {
    borderWidth: 0,
    backgroundColor:'#3E77BC',
    borderRadius: 5,

    // borderBottomWidth: 2,
    // borderBottomColor: '#007bff',


  },
  tabText: {
    fontWeight: 'bold',
    fontSize: 15,
    color:'#282534'
  },
  tabTextSelected: {
    fontWeight: 'bold',
    fontSize: 16,
    color:'#fff'
  },
  // C6C4CA
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    backgroundColor: '#',
    padding: 10,
    borderRadius: 5,
    height: 45,
    width: 45,
    marginRight: 10,
    alignItems:'center',
    borderColor: '#000', borderWidth: 1
  },
  
  iconText: {
    fontSize: 20,
    color: '#3E77BC',
    fontWeight: 'bold',
  },
  itemLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color:'#1C162E'
  },
  itemAmount: {
    padding: 12,
    fontSize: 12,
    fontWeight: 'bold',
  },
  itemAmountContainer:{
    backgroundColor: '#F2F2F2',
    borderRadius: 56 ,
  }
});