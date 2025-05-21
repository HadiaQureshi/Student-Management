import React from "react";
import { View, Text, StyleSheet } from "react-native";
const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Project API</Text>
        </View>
    );
};
const styles = StyleSheet.create ({
  container: {
    backgroundColor: '#E6FFE2', flex: 1, justifyContent: 'center',
    alignItems: 'center' },
  title: {
    fontWeight: 'bold', fontSize: 28, alignContent: 'flex-start', 
    paddingBottom: 90,  paddingLeft: 30,
  paddingRight: 30 },
});
export default HomeScreen;