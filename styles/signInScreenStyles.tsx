import { Dimensions, StyleSheet,  } from 'react-native';
import { COLOR_BLACK, FONTWEIGHT_BOLD, H1_SIZE } from './globalStyles';
const {height } = Dimensions.get('window')
export const signInScreenStyles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1, 
    padding: 20,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  
  title: {
    fontSize: H1_SIZE,
    fontWeight: FONTWEIGHT_BOLD,
    padding: 20,
    textAlign: 'center',
    color: COLOR_BLACK
  },
  centeredContainer: {
    height: height * 0.7,
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '100%', 
    paddingHorizontal: 20,
    gap: 20,
  },
  forgotPasswordHint: {
  },
});
