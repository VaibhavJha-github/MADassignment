import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { saveData } from "../datamodel/mydata";
import { useNavigation } from "@react-navigation/native";

// AddNewTodo component for adding a new todo item
export const AddNewTodo = () => {
  const [title, setTitle] = useState(""); // State for title input
  const [description, setDescription] = useState(""); // State for description input
  const [isSaveDisabled, setIsSaveDisabled] = useState(true); // State to track save button disabled state

  // Handler for title input change
  const titleChangeHandler = (val) => {
    setTitle(val);
    checkSaveButtonState(val, description); // Check button state on title change
  };

  // Handler for description input change
  const descriptionChangeHandler = (val) => {
    setDescription(val);
    checkSaveButtonState(title, val); // Check button state on description change
  };

  // Function to check and update save button state
  const checkSaveButtonState = (title, description) => {
    const isEmpty = !title.trim() || !description.trim();
    setIsSaveDisabled(isEmpty);
  };

  // Handler for submitting a new todo item
  const submitHandler = async () => {
    if (!isSaveDisabled) {
      await saveData({ title, description });
      setTitle("");
      setDescription("");
      setIsSaveDisabled(true); // Disable save button after saving
      showAlert(); // Show the pop-up message
    }
  };
  // Function to show an alert message
  const showAlert = () => {
    Alert.alert("Todo Added Successfully", "", [{ text: "OK", onPress: () => console.log("OK Pressed") }]);
  };

  const navigation = useNavigation(); // Navigation hook for navigation actions

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Todo</Text>
      <Text style={styles.titleDivider}>_________________________________________</Text>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter title"
        onChangeText={titleChangeHandler}
        value={title}
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Enter description"
        multiline
        onChangeText={descriptionChangeHandler}
        value={description}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Ionicons name="backspace-sharp" size={24} color="green" />
          <Button
            title="Back"
            onPress={() => navigation.goBack()}
            color="black"
          />
        </View>
        <View style={styles.button}>
          <Ionicons name="save" size={24} color="green" />
          <Button
            title="Save"
            color="black"
            onPress={submitHandler}
            disabled={isSaveDisabled} // Disable save button based on state
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "lightblue",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "lightblue",
  },
});

export default AddNewTodo;
