import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "../utils/Icons";

const SearchInput = ({ searchQuery, onSearch }: any) => {
  return (
    <View style={styles.container}>
      {/* Search Icon */}
      <View style={styles.icon}>
        <Icon name="Search" size={20} color="#3E77BC" />
      </View>

      {/* TextInput */}
      <TextInput
        placeholder="Search"
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
        value={searchQuery}
        onChangeText={onSearch}
      />

      {/* Clear Button */}
      {searchQuery.length > 0 && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => onSearch("")} // Clear the search query
        >
          <Icon name="CircleX" size={20} color="#888" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    position: "relative",
  },
  icon: {
    position: "absolute",
    left: 10,
    zIndex: 1,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    paddingLeft: 40, // Prevent text overlap with the search icon
    paddingRight: 40, // Prevent text overlap with the clear button
  },
  clearButton: {
    position: "absolute",
    right: 10,
    zIndex: 1,
  },
});

export default SearchInput;
