import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Loader() {
  return (
    <View testID='loader-component' className={`flex-1 justify-center items-center`}>
      <ActivityIndicator size="large" color='#C30045' />
    </View>
  );
}
