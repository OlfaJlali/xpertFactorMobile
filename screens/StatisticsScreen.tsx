import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;

const StatisticsScreen = () => {
  return (
    <SafeAreaView style={{flex: 1 , backgroundColor: '#FFF' , paddingVertical: 20}}>
  <ScrollView style={styles.container}>
      <Text style={[globalStyles.PageTitle,]}>Statistics</Text>

      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Sales</Text>
          <Text style={styles.cardValue}>$24,000</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>New Users</Text>
          <Text style={styles.cardValue}>1,234</Text>
        </View>
      </View>

      {/* Bar Chart */}
      <Text style={styles.chartTitle}>Monthly Sales</Text>
      <BarChart
  data={{
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        data: [5000, 7000, 8000, 6000, 9000],
      },
    ],
  }}
  width={screenWidth - 32}
  height={220}
  yAxisLabel="$"
  yAxisSuffix="" // Add this property to resolve the error
  chartConfig={{
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#f5f5f5',
    backgroundGradientTo: '#f5f5f5',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  }}
  style={styles.chart}
/>


      {/* Line Chart */}
      <Text style={styles.chartTitle}>Active Users</Text>
      <LineChart
        data={{
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
            {
              data: [200, 300, 500, 400, 600, 700, 800],
              strokeWidth: 2,
            },
          ],
        }}
        width={screenWidth - 32}
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#f5f5f5',
          backgroundGradientTo: '#f5f5f5',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(34, 139, 34, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        bezier
        style={styles.chart}
      />
    </ScrollView>
    </SafeAreaView>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333333',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  card: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    color: '#666666',
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 8,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#444444',
  },
  chart: {
    marginBottom: 24,
    borderRadius: 8,
  },
});

export default StatisticsScreen;
