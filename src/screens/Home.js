import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, FlatList, SafeAreaView, Button, TextInput, ScrollView, Modal} from 'react-native';
import { Ionicons, AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadData, saveData, deleteTask, key } from '../datamodel/mydata';
import { useNavigation, useFocusEffect, useRoute } from "@react-navigation/native"; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

// TaskItem Component to display each task
const TaskItem = ({ task, onUpdate, onDelete }) => {
  const { id, title, description, completed } = task;
  const [expanded, setExpanded] = useState(false); // State to track expansion

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const handleCompleted = () => {
    const updatedTask = { ...task, completed: true };
    onUpdate(updatedTask); // Update task as completed
  };

  const handleDelete = () => {
    onDelete(id); // Delete task from storage and list of tasks
  };

  return (
    <View style={[styles.taskItemContainer, { backgroundColor: 'lightblue' }]}>
      <Pressable onPress={toggleExpansion} style={styles.taskHeader}>
        <Text style={styles.taskItemTitle}>
          {title} {completed ? '(Done)' : ''}
        </Text>
        <Ionicons name={expanded ? 'chevron-up-outline' : 'chevron-down-outline'} size={24} color="black" />
      </Pressable>
      {expanded && (
        <View style={styles.taskDetails}>
          <Text style={styles.taskItemDescription}>{description}</Text>
          <View style={styles.buttonContainer}>
            {!completed && (
              <Pressable style={styles.button} onPress={handleCompleted}>
                <Ionicons name="cloud-done" size={24} color="green" />
              </Pressable>
            )}
            <Pressable style={[styles.button, completed && styles.centeredButton]} onPress={handleDelete}>
              <Ionicons name="trash-outline" size={24} color="red" />
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};
// Home component to manage task list and actions
export const Home = () => {
  const [tasks, setTasks] = useState([]); // State to manage tasks
  const [showPopup, setShowPopup] = useState(false); // State for popup message

  // Function to load tasks from AsyncStorage
  const loadTasks = async () => {
    const data = await loadData();
    if (data && data.length > 0) {
      setTasks(data);
    }
  };

  useEffect(() => {
    loadTasks(); // Load tasks when component mounts
  }, []);

  useFocusEffect(() => {
    loadTasks(); // Load tasks whenever the screen is focused
  });

  const navigation = useNavigation();
  const gotoDetailHandler = () => {
    navigation.navigate('AddNewTodo'); // Navigate to AddNewTodo screen
  };

  // Function to save a new task
  const saveTask = async (task) => {
    await saveData({ ...task, completed: false }); // Ensure new tasks are marked as not finished
    loadTasks(); // Refresh tasks after saving
    setShowPopup(true); // Show the pop-up message
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      let existingData = await loadData(); // Load existing tasks
      existingData = existingData.map(task => {
        if (task.id === updatedTask.id) {
          // Update the task if its ID matches the updated task ID
          return updatedTask;
        }
        return task;
      });
      await AsyncStorage.setItem(key, JSON.stringify(existingData)); // Save updated tasks
      setTasks(existingData); // Update state with updated tasks
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  // Function to handle deleting a task
  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      const updatedTasks = await loadData(); // Load updated tasks after deletion
      setTasks(updatedTasks); // Update state with updated tasks
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContent}>
        <Text style={styles.title}>My Todo List</Text>
        <Text style={styles.titleDivider}>_________________________________________</Text>
      </View>

      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TaskItem task={item} onUpdate={handleUpdateTask} onDelete={handleDeleteTask} />
        )}
        keyExtractor={(item) => item.id} // Use item.id directly as the key
        contentContainerStyle={styles.taskListContainer}
      />


      <View style={styles.bottomContent}>
        <Text style={styles.titleDivider}>_________________________________________</Text>
        <Pressable style={styles.addButton} onPress={gotoDetailHandler}>
          <View style={styles.addButtonContent}>
            <AntDesign name="pluscircle" size={24} color="green" />
            <Text style={[styles.addButtonText, { color: 'black', marginLeft: 5 }]}>Add New Todo</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  topContent: {
    alignItems: 'center',
    marginTop: 70,
  },
  bottomContent: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  titleDivider: {
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskListContainer: {
    flexGrow: 1,
    
    paddingVertical: 10,
  },
  taskItemContainer: {
    width: '100%',
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'lightblue',
  },
  
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  taskDetails: {
    marginTop: 10,
  },
  taskItemDescription: {
    fontSize: 16,
    marginTop: 5,
    textAlign: 'left',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    padding: 5,
    borderRadius: 3,
    marginLeft: 70, 
    marginRight: 70, 
  },
  centeredButton: {
    marginLeft: 'auto', 
    marginRight: 'auto', 
  },
  
  buttonText: {
    marginLeft: 5,
  },
});

export default Home;
