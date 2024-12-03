import { useState, useRef, useEffect } from 'react';
import { FlatList } from 'react-native';

export const useBordereauxForm = () => {
  const [totalAmount, setTotalAmount] = useState('1000000000');
  const [selectedYear, setSelectedYear] = useState(2024);
  const [documentCount, setDocumentCount] = useState('1');
  const [date, setDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const flatListRef = useRef<FlatList<number>>(null);

  // const incrementCount = () => setDocumentCount(prev => prev + 1);
  // const decrementCount = () => setDocumentCount(prev => Math.max(1, prev - 1));

  const years = Array.from({ length: 21 }, (_, i) => selectedYear - 10 + i);

  useEffect(() => {
    const selectedYearIndex = years.findIndex(year => year === selectedYear);
    if (selectedYearIndex !== -1) {
      flatListRef.current?.scrollToIndex({
        index: selectedYearIndex,
        animated: false,
        viewPosition: 0.5,
      });
    }
  }, [selectedYear]);

  const openDatePicker = () => setIsDatePickerOpen(true);
  const closeDatePicker = () => setIsDatePickerOpen(false);

  return {
    totalAmount,
    setTotalAmount,
    selectedYear,
    setSelectedYear,
    documentCount,
    // incrementCount,
    // decrementCount,
    date,
    isDatePickerOpen,
    closeDatePicker,
    setDate,
    flatListRef,
    years,
    setDocumentCount
  };
};
