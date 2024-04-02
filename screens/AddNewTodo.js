import React, { useState } from "react";
import { Text, View, StyleSheet, Button, TextInput, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export const AddNewTodo = () => {
    const navigation = useNavigation();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSave = () => {
        // Add your save logic here
        console.log("Title:", title);
        console.log("Description:", description);
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.title}>Add New Todo</Text>
                <Text style={styles.title2}>_________________________________________</Text>
                <Text style={styles.label}>Title:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter title"
                    onChangeText={(text) => setTitle(text)}
                    value={title}
                />
                <Text style={styles.label}>Description:</Text>
                <TextInput
                    style={[styles.input, styles.descriptionInput]}
                    placeholder="Enter description"
                    multiline
                    onChangeText={(text) => setDescription(text)}
                    value={description}
                />
            </ScrollView>
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Ionicons name="backspace-sharp" size={24} color="green" />
                    <Button title="Cancel" onPress={() => navigation.goBack()} color="black" />
                </View>
                <View style={styles.button}>
                    <Ionicons name="save" size={24} color="green" />
                    <Button title="Save"  color="black" />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50, 
    },
    scrollContainer: {
        flex: 1,
        width: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center', 
    },
    title2: {
        marginBottom: 0,
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    descriptionInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 60,
        marginBottom: 60, 
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'lightblue',
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'lightblue',
    },
});
