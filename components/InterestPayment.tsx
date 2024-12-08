import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import DatePicker from 'react-native-date-picker';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');
type InterestPaymentProps ={
  selectedYear : number
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>
  date: Date
  setDate: React.Dispatch<React.SetStateAction<Date>>
} 
const InterestPayment = ({selectedYear,  setSelectedYear,  date, setDate} :InterestPaymentProps ) => {
    const [isOpenDate, setIsOpenDate] = useState(false);
    const yearsArray = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  
    const renderYearItem = ({ item } : any) => (
        <TouchableOpacity onPress={() => {
          setSelectedYear(item);
        }} style={styles.yearItem}>
  <Text style={[styles.yearText, item === selectedYear ? styles.selectedYearText : '']}>
        {item}
      </Text>
        </TouchableOpacity>
      );
    return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        {/* TODO : change color */}
        <LinearGradient
          colors={['#ddd', '#3E77BC']}
          style={[styles.card, styles.gradientCard]}
        >
        <Text style={styles.subtitle}>Bordereau year</Text>

            <FlatList
          data={yearsArray}
          renderItem={renderYearItem}
          keyExtractor={(item) => item.toString()}
        showsVerticalScrollIndicator={false}
          nestedScrollEnabled
        />
              </LinearGradient>
        <TouchableOpacity onPress={() => setIsOpenDate(!isOpenDate)}>
        <View style={[styles.card, styles.plainCard]}>
           <Text style={styles.subtitleDark}>Bordereau date</Text>
          <Text style={styles.DateTextDark}>{`${date.getDate()}.${date.getMonth() + 1}`}</Text>
          <Text style={styles.YearTextDark}>{date.getFullYear()}</Text>
          <DatePicker
        modal
        open={isOpenDate}
        date={date}
        mode="date"
        onConfirm={(date: Date) => {
          setDate(date)
            setIsOpenDate(false);
          }}
        onCancel={() => setIsOpenDate(false)}
      />
        </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    backgroundColor: '#ffffff',
  },
  yearText: {
    fontSize: 20,
    textAlign: 'center',
    color:'#FFF'
  },
  selectedYearText: {
    fontWeight: 'bold', 
    fontSize: 25
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2E2E3A',
  },
  cardsContainer: {
    flexDirection: 'row',
    gap: 20
  },
  card: {
    width: width / 2.5,
    height: width / 2,
    borderRadius: 15,
    padding: 15,
    justifyContent: 'space-between',
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity:  0.19,
    shadowRadius: 5.62,
    elevation: 6
  },
  gradientCard: {
    backgroundColor: 'transparent', // Ensures gradient background is visible
  },
  plainCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6E6E6',
  },
  percentageText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  YearTextDark: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#3E77BC',
  },
  DateTextDark: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#2E2E3A',
  },
  subtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
  subtitleDark: {
    fontSize: 14,
    color: '#2E2E3A',
    fontWeight: 'bold'
  },
  yearList: {
    // maxHeight: 300, // Set a maximum height for the year list
    // width: width * 0.8, // Adjust the width of the list
    // backgroundColor: '#fff',
    // borderRadius: 10,
    // marginTop: 10,
    // elevation: 5, // Add some elevation for shadow effect
    fontStyle:'italic'
  },
  yearItem: {
    padding: 10,
    // borderBottomWidth: 0.5,
    // borderBottomColor: '#ddd',
  },

});

export default InterestPayment;
