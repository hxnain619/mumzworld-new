import Colors from '@constants/Colors';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import tailwind from 'twrnc';

export default function Loader() {
  return (
    <View style={tailwind`flex-1 justify-center items-center`}>
      <ActivityIndicator size="large" color={Colors.pink} />
    </View>
  );
}
