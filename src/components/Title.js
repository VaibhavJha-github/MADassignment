import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export const Title = () => {
    return (
        <View style={styles.topContent}>
        <Text style={styles.title}>My Todo List</Text>
        <Text style={styles.title2}>_________________________________________</Text>
      </View>
    );
}

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
  

  
  