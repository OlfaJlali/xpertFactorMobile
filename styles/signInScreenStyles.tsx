import { StyleSheet } from 'react-native';
import { COLOR_BLACK, FONTWEIGHT_BOLD, H1_SIZE } from './globalStyles';

export const signInScreenStyles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1, 
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: H1_SIZE,
    fontWeight: FONTWEIGHT_BOLD,
    padding: 20,
    textAlign: 'center',
    color: COLOR_BLACK
  },
  centeredContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '100%', 
    paddingHorizontal: 20,
    gap: 20,
  },
  forgotPasswordHint: {
  },
});
