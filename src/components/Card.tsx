import React from 'react';
import { View } from 'react-native';
import tailwind from 'twrnc';

export default function CardWrapper({
  children,
}: {
  children: React.JSX.Element;
}) {
  return (
    <View style={tailwind`bg-white py-2 mb-2 rounded-md shadow-md`}>
      {children}
    </View>
  );
}
