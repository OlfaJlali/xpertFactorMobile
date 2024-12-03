import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import DatePicker from 'react-native-date-picker';

const { width } = Dimensions.get('window');

const BordorauxDates = () => {
    const [isOpenDate, setIsOpenDate] = useState(false);
    const [dueDate, setDueDate] = useState(new Date());

  return (
    <View style={styles.container}>

      <View style={styles.contentContainer}>
      <Text style={styles.title}>Due date</Text>

        {/* Token Information */}
        <TouchableOpacity onPress={() => setIsOpenDate(!isOpenDate)}>
{/* <View style={[styles.card, styles.plainCard]}> */}
{/* <MaterialCommunityIcons name="download" size={30} color="#2E2E3A" /> */}

{/* <Text style={styles.percentageTextDark}>17.7%</Text> */}
{/* <Text style={styles.subtitleDark}>due date</Text> */}
<View style={{flexDirection: 'row'}} >
<Text style={styles.DateTextDark}>{`${dueDate.getDate()}.${dueDate.getMonth() + 1}`}</Text>
<Text style={styles.YearTextDark}>.{dueDate.getFullYear()}</Text>
</View>
<DatePicker
modal
open={isOpenDate}
date={dueDate}
mode="date"
onConfirm={(date: Date) => {
setDueDate(date);
setIsOpenDate(false);
}}
onCancel={() => setIsOpenDate(false)}
/>
{/* </View> */}
</TouchableOpacity>
<Text style={styles.title}>Due date</Text>

        {/* Token Information */}
        <TouchableOpacity onPress={() => setIsOpenDate(!isOpenDate)}>
{/* <View style={[styles.card, styles.plainCard]}> */}
{/* <MaterialCommunityIcons name="download" size={30} color="#2E2E3A" /> */}

{/* <Text style={styles.percentageTextDark}>17.7%</Text> */}
{/* <Text style={styles.subtitleDark}>due date</Text> */}
<View style={{flexDirection: 'row'}} >
<Text style={styles.DateTextDark}>{`${dueDate.getDate()}.${dueDate.getMonth() + 1}`}</Text>
<Text style={styles.YearTextDark}>.{dueDate.getFullYear()}</Text>
</View>
<DatePicker
modal
open={isOpenDate}
date={dueDate}
mode="date"
onConfirm={(date: Date) => {
setDueDate(date);
setIsOpenDate(false);
}}
onCancel={() => setIsOpenDate(false)}
/>
{/* </View> */}
</TouchableOpacity>

        {/* Circular Progress */}
        {/* <AnimatedCircularProgress
          size={width / 3}
          width={8}
          fill={12} // 12% progress
          tintColor="#50E3C2"
          backgroundColor="#E6E6E6"
          rotation={0} // Starts from the top
        >
          {fill => <Text style={styles.percentageText}>{`${fill.toFixed(0)}%`}</Text>}
        </AnimatedCircularProgress> */}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
    subtitleDark: {
        fontSize: 14,
        color: '#2E2E3A',
        fontWeight: 'bold'
      },
    
      YearTextDark: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#3E77BC',
      },
      DateTextDark: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#2E2E3A',
      },
  container: {
    marginVertical: 20,
    borderRadius:20,
    padding: 20,
    backgroundColor: '#ffffff',
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity:  0.19,
    shadowRadius: 5.62,
    elevation: 6
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FDC830',
    marginBottom: 10,
  },
  contentContainer: {
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoContainer: {
    flex: 1,
  },
  tokenAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E2E3A',
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

export default BordorauxDates;
