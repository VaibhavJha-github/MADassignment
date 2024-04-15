import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { saveData } from "../datamodel/mydata";
import { useNavigation } from "@react-navigation/native";

export const AddNewTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSaveDisabled, setIsSaveDisabled] = useState(true); // State to track save button disabled state

  const titleChangeHandler = (val) => {
    setTitle(val);
    checkSaveButtonState(val, description); // Check button state on title change
  };

  const descriptionChangeHandler = (val) => {
    setDescription(val);
    checkSaveButtonState(title, val); // Check button state on description change
  };

  const checkSaveButtonState = (title, description) => {
    const isEmpty = !title.trim() || !description.trim();
    setIsSaveDisabled(isEmpty);
  };

  const submitHandler = () => {
    saveData({ title, description });
    setTitle("");
    setDescription("");
    setIsSaveDisabled(true); // Disable save button after saving
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Todo</Text>
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
            title="Cancel"
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

