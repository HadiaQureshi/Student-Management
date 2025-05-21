import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ActivityIndicator}from 'react-native';
const StudentCard = React.memo(({student, onDelete, onEdit}) => (
    <View style={styles.StudentBox}>
        <Text style={styles.datatext}>
            Name: {student.Name} | Age: {student.Age} | Email: {student.Email}
          </Text>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={() => onEdit(student)}>
              <Text style= {styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => onDelete(student.id)}>
              <Text style= {styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
    </View>
));
const EnrollScreen = ({navigation}) => {
    const [stud, setStud] = useState([]);
      const [loading, setLoading] = useState(true);
      const url = "http://192.168.100.127:3000/students";
      const GetAPI = async () => {
        try {
          let result = await fetch(url);
          result = await result.json();
          console.log("Fetched data: ", result);
          setStud(result);
        } catch (error) {
          console.error("Error fetching data: ", error);
        } finally {
          setLoading(false);
        }
      };

      const DeleteData = async (id) => {
        try {
          await fetch(`${url}/${id}`, {method: 'DELETE'});
          Alert.alert("Success", "Student deleted!")
          GetAPI();
        } catch (error) {
          console.error("Error deleting student: ", error);
        }
      };

      const EditData = (student) => {
        navigation.navigate("Add Student", {student});
      };
      useEffect(() => {
        GetAPI();
      }, []);

      return (
        <View style={styles.container}>
            <Text style={styles.heading}>Enrolled Students</Text>
    {loading ? (
      <ActivityIndicator size='small' color='#0000ff'/>
    ) : (
        <FlatList contentContainerStyle={styles.container}
        data={stud}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
            <StudentCard student={item} onEdit={EditData} onDelete={DeleteData}/>
        )}
        refreshing={loading}
        onRefresh={GetAPI}/>
    )}
        </View>
);
};

const styles = StyleSheet.create ({
    container: {
      backgroundColor: '#E6FFE2',
      alignItems: 'center', flexWrap: 'wrap'},
    datatext: {
      fontSize: 18, color: 'red', paddingBottom: 10,
      paddingRight: 20, paddingLeft: 20 },
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
      StudentBox: {
      backgroundColor: "#fff", borderRadius: 10,padding: 10,
      marginVertical: 5, width: "90%", borderWidth: 1,
      borderColor: "#ccc", margin: 20},
      row: {
        flexDirection: "row", justifyContent: "space-between", marginTop: 5, },
  });
export default EnrollScreen;