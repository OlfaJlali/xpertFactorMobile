import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Icon from "../utils/Icons";

const SearchInput = ({ searchQuery, onSearch }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}  >
      <Icon 
        name="Search" 
        size={20} 
        color="#3E77BC" 
        
      />
      </View>
      
      <TextInput
        placeholder="Search"
        clearButtonMode="always"
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
        value={searchQuery}
        onChangeText={onSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
    position: "relative",
  },
  icon: {
    position: "absolute",
    left: 10, // Adjust as needed to position the icon inside the input
    zIndex: 1,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    paddingLeft: 40, // Add padding to prevent text from overlapping the icon
    paddingRight: 10,
  },
});

export default SearchInput;
