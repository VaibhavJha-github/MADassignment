import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';

let ct = 0;

export default function App() {
  const todolist = ["Buy Whey", "Buy Something Unnecessary", "Buy Creatine"];
  const getButStyle = ({pressed}) => 
    pressed ? [styles.pressed, styles.button] : [styles.button];
  return (
    <View style={styles.container}>
      <View style={styles.topContent}>
        <Text style={styles.title}>My Todo List</Text>
        <Text style={styles.title2}>_______________________________________________</Text>
      </View>

      <View style={styles.middleContent}>
        {todolist.map((todo, index) => (
          <Text key={index} style={styles.todoItem}>
            {todo}
          </Text>
        ))}
      </View>
      
      <View style={styles.bottomContent}>
        <Text style={styles.title2}>_______________________________________________</Text>
        <Pressable
          style={getButStyle}
          onPress={() => {
            ct++;
            console.log('I am clicked ${ct} times');
          }}
        >
          <Text style={styles.buttonText}>Add New Todo</Text>
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
