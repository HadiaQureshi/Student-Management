import React, {useState, useEffect} from "react";
import { Text, TextInput, TouchableOpacity, 
    ScrollView, Alert, StyleSheet} from "react-native";
const AddStudent = ({navigation, route}) => {
    const [form, setForm] = useState({Name: "", Age: "", Email: ""});
    const [selectedStud, setSelectedStud] = useState(null);
    const [edit, setEdit] = useState(false);

    const url = "http://192.168.100.127:3000/students";

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const student = route.params?.student;
        if(student) {
            const {id, Name, Age, Email} = route.params.student;
            setForm({Name, Age: Age.toString(), Email});
            setSelectedStud(id);
            setEdit(true);
        } else {
            setForm({Name: "", Age: "", Email: ""});
            setEdit(false);
            setSelectedStud(null);
        }
    });
    return unsubscribe;
    }, [navigation, route.params?.student]);
    const InputValue = (key, value) => {
        setForm({...form, [key] : value});
      };

    const handleSubmit = async () => {
        if(!form.Name || !form.Age || !form.Email) {
            Alert.alert("Validation", "Please fill all fields!");
            return;
    }
    try {
        const method = edit ? 'PUT' : 'POST';
        const endpoint = edit ? `${url}/${selectedStud}` : url;
        let result = await fetch(endpoint, {method,
        headers: {"content-type": "application/json"},
        body: JSON.stringify(form),
        } );
        const data = await result.json();
        console.log(edit ? "Updated student's data" : "New student added:", data);
        Alert.alert("Success", edit ? "Student's data updated" : "Student added!");
        setForm({Name: "", Age: "", Email: ""});
        navigation.navigate("Enrolled Students");
        navigation.setParams({student: undefined});
        }
      catch (error) {
        console.error(edit ? "Error updatin student's data: " : "Error adding new student: ", 
            error);
      } };
      return (
        <ScrollView contentContainerStyle={styles.container}>
        
            <Text style={styles.title}>Welcome to Project API!</Text>
            <Text style={styles.heading}>{edit ? "Edit Student" : "Add Student"}</Text>
        
            <TextInput 
            style={styles.input} placeholder="Name" value={form.Name}
            onChangeText={(text) => InputValue("Name", text)} />
            
            <TextInput 
            style={styles.input} placeholder="Age" value={form.Age}
            onChangeText={(text) => InputValue("Age", text)}
            keyboardType="numeric" />
        
            <TextInput style={styles.input}
            placeholder="Email" value={form.Email} onChangeText={(text) => 
            InputValue("Email", text)}/>
        
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>{edit ? "Update Student" : "Add Student"}</Text>
            </TouchableOpacity>
        </ScrollView>
      );
}; 

const styles = StyleSheet.create ({
    container: {
      backgroundColor: '#E6FFE2', justifyContent: 'center',
      alignItems: 'center', flexWrap: 'wrap' },
      title: {
        fontWeight: 'bold', fontSize: 28, alignContent: 'flex-start', 
        paddingBottom: 20, paddingTop: 80, paddingLeft: 30,
      paddingRight: 30 },
      heading: {
        fontSize: 24, fontWeight: 'bold', paddingBottom: 30,
      paddingTop: 20 },
      button: {
        width: '40%', backgroundColor: '#fff', borderRadius: 25,
        padding: 10, marginVertical: 10, borderWidth: 1,
        borderColor: '#000',  alignItems: 'center',
      marginRight: 10 },
        buttonText: {
        fontWeight: 'bold', },
        input: {
        width: '70%', backgroundColor: '#fff', borderRadius: 25,
        padding: 10, marginVertical: 10, borderWidth: 1,
        borderColor: '#000' },
    })
export default AddStudent;