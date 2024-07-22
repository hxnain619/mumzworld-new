import React from 'react';
import { View } from 'react-native';

export default function CardWrapper({
  children,
}: {
  children: React.JSX.Element;
}) {
  return (
    <View className={`bg-white py-2 mb-2 rounded-md shadow-md border border-solid border-gray-200`}>
      {children}
    </View>
  );
}
