import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const { width } = Dimensions.get('window');
type ProgressIndicatorProps = {
  documentCount : number,
  progress: number
}
const Progress = ({documentCount , progress} : ProgressIndicatorProps) => {
  return (
    <View style={styles.container}>
<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
<Text style={styles.tokenAmount}>{progress}<Text style={styles.tokenUnit}>/{documentCount} <Text style={styles.title}>Completed docs </Text></Text></Text>
 {/* Circular Progress */}
 <AnimatedCircularProgress
          size={width / 6}
          width={8}
          fill={progress / documentCount * 100} // 12% progress
          tintColor="#50E3C2"
          backgroundColor="#E6E6E6"
          rotation={0} // Starts from the top
        >
          {fill => <Text style={styles.percentageText}>{`${fill.toFixed(0)}%`}</Text>}
        </AnimatedCircularProgress>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius:20,
    padding: 20,
    backgroundColor: '#ffffff',
    // shadowColor: "#000000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity:  0.19,
    // shadowRadius: 2.62,
    // elevation: 4
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoContainer: {
    flex: 1,
  },
  tokenAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#EDC545',
  },
  tokenUnit: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E2E3A',
  },
  tokenPrice: {
    fontSize: 16,
    color: '#B0B0B0',
    marginTop: 5,
  },
  percentageText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E2E3A',
  },
});

export default Progress;
