import { StyleSheet } from 'react-native';

export const COLOR_BLACK = '#000'
export const FONTWEIGHT_BOLD = 'bold'
export const H1_SIZE = 25
export const H2_SIZE = 18
export const H3_SIZE = 16


export const globalStyles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1, 
    backgroundColor: '#fff',
  },
  button: {
    
  },
  title : {
    fontSize: H2_SIZE,
    fontWeight: FONTWEIGHT_BOLD,
    paddingVertical: 20 ,
    color: COLOR_BLACK

  },
  inputTitle: {
    fontSize: H3_SIZE,
    fontWeight: FONTWEIGHT_BOLD,
    paddingBottom: 10 ,
    color: COLOR_BLACK
  },
  HorizontalScrollView: {
    flexDirection: 'row',
    alignSelf:'center',
    gap:16,
    marginVertical: 10,
  },
  dateInput : {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    color: '#000',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,

  },
  searchInput: {
    borderBlockColor: COLOR_BLACK ,
    borderWidth: 1, 
    borderRadius: 8,
    flex:1,
    height: 40,
    // backgroundColor:'#fff',

  }

  

 
});
