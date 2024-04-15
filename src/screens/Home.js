import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, FlatList, SafeAreaView, Button, TextInput, ScrollView, Modal} from 'react-native';
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { loadData, saveData } from '../datamodel/mydata';
import { useNavigation, useFocusEffect, useRoute } from "@react-navigation/native"; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { deleteTask } from '../datamodel/mydata';



const TaskItem = ({ task }) => {
  const { title, description } = task;
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const handleCompleted = () => {
    // Perform action for completing the task here
    console.log("Task completed:", title);
  };

  const handleDelete = () => {
    deleteTask(task); // Call deleteTask function from your data model
  };


  return (
    <View style={[styles.taskItemContainer, { backgroundColor: 'lightblue' }]}>
    <Pressable onPress={toggleExpansion} style={styles.taskHeader}>
      <Text style={styles.taskItemTitle}>{title}</Text>
      <Ionicons name={expanded ? 'chevron-up-outline' : 'chevron-down-outline'} size={24} color="black" />
    </Pressable>
    {expanded && (
      <View style={styles.taskDetails}>
        <Text style={styles.taskItemDescription}>{description}</Text>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handleCompleted}>
            <Ionicons name="cloud-done-outline" size={24} color="black" />
          </Pressable>
          <Pressable style={styles.button} onPress={handleDelete}>
            <Ionicons name="trash-outline" size={24} color="black" />
          </Pressable>
        </View>
      </View>
    )}
  </View>
);
};

export const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

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
    navigation.navigate('AddNewTodo');
  };

  const saveTask = async (task) => {
    await saveData(task);
    loadTasks(); // Refresh tasks after saving
    setShowPopup(true); // Show the pop-up message
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContent}>
        <Text style={styles.title}>My Todo List</Text>
        <Text style={styles.titleDivider}>_________________________________________</Text>
      </View>

      <FlatList
        data={tasks}
        renderItem={({ item }) => <TaskItem task={item} />}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.taskListContainer}
      />

      <View style={styles.bottomContent}>
        <Text style={styles.titleDivider}>_________________________________________</Text>
        <Pressable style={styles.addButton} onPress={gotoDetailHandler}>
          <View style={styles.addButtonContent}>
            <AntDesign name="pluscircle" size={24} color="green" />
            <Text style={styles.addButtonText}>Add New Todo</Text>
          </View>
        </Pressable>
      </View>

      {/* Pop-up message */}
      <Modal visible={showPopup} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Todo Added Successfully</Text>
            <Button title="OK" onPress={() => setShowPopup(false)} />
          </View>
        </View>
      </Modal>
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
    alignItems: 'center',
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
  },
  buttonText: {
    marginLeft: 5,
  },
});

export default Home;
