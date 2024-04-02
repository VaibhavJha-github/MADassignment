import React from 'react';
import { View, Text } from 'react-native';

export const Board = ({ steps }) => (
  <View>
    {steps.map((step, index) => (
      <Text key={index}>{step}</Text>
    ))}
  </View>
);
