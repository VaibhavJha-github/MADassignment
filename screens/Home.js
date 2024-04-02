import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from "@react-navigation/native";
//import {Board} from "./components/Board";
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';

const Stack = createStackNavigator();
let ct = 0;

export const Home = () => {
  const navigation = useNavigation();
  const gotoDetailHandler = () => {
      navigation.navigate('AddNewTodo')
  }
  const todolist = ["Buy Whey", "Buy Something Unnecessary", "Buy Creatine"];

  return (
    
    <View style={styles.container}>
      <View style={styles.topContent}>
        <Text style={styles.title}>My Todo List</Text>
        <Text style={styles.title2}>_________________________________________</Text>
      </View>
      <View style={styles.middleContent}>
        {todolist.map((todo, index) => (
          <Text key={index} style={styles.todoItem}>
            {todo}
          </Text>
        ))}
      </View>
      <View style={styles.bottomContent}>
      <Text style={styles.title2}>_________________________________________</Text>
        <Pressable style={styles.button} onPress={gotoDetailHandler}>
          <View style={styles.buttonContent}>
            <AntDesign name="pluscircle" size={24} color="green" />
            <Text style={styles.buttonText}>Add New Todo</Text>
          </View>
        </Pressable>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}
  
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'space-between', 
  },
  topContent: {
    alignItems: 'center', 
    marginTop: 70, 
  },
  middleContent: {
    flex: 1,
    alignItems: 'flex-start', 
    borderRadius: 5,
    
    marginTop: 10, 
  },
  bottomContent: {
    alignItems: 'center',
    marginBottom: 50, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  title2: {
    marginBottom: 10, 
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 20, 
    marginRight: 20, 
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 200,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  todoItemContainer: {
    marginBottom: 5,
  },
  todoItem: {
    color: 'black',
    borderWidth: 1,
    borderColor: 'lightblue',
    backgroundColor: 'lightblue',
    width: '100%', 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    marginBottom: 5,
  },  
});
