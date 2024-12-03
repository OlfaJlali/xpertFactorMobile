import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  subtitle: {
    marginTop: 10,
    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: 23,

  },
  title: {
    color: '#282534',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#3E77BC',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
