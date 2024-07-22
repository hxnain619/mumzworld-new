import React from 'react';
import { Text, View } from 'react-native';

export default function Divider() {
  return (
    <View testID='divider-component' className={`h-1 my-2 w-full bg-gray-200 rounded-full`}>
      <Text>&nbsp;</Text>
    </View>
  );
}
