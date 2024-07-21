import React from 'react';
import { Text, View } from 'react-native';
import tailwind from 'twrnc';

export default function Divider() {
  return (
    <View style={tailwind`h-1 my-2 w-full bg-gray-200 rounded-full`}>
      <Text>&nbsp;</Text>
    </View>
  );
}
