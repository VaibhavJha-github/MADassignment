import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';

import { Home } from "./screens/Home";
import { AddNewTodo } from "./screens/AddNewTodo";

const Stack = createStackNavigator();
let ct = 0;

export default function App() {
  return (
    <View style={styles.container}>    
      <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="AddNewTodo" component={AddNewTodo}/>
          </Stack.Navigator>
      </NavigationContainer>
     
      

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
