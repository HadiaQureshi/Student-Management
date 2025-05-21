import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./Components/HomeScreen";
import EnrollScreen from "./Components/EnrolledStudents";
import AddStudent from "./Components/AddStudent";
const Drawer = createDrawerNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen}/>
        <Drawer.Screen name="Enrolled Students" component={EnrollScreen}/>
        <Drawer.Screen name="Add Student" component={AddStudent}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
export default App;