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
    topContent: {
      alignItems: 'center', 
      marginTop: 70, 
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    title2: {
      marginBottom: 10, 
    },
  });
  