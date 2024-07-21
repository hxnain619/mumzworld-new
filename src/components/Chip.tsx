import Colors from '@constants/Colors';
import React from 'react';
import { Text } from 'react-native';
import tailwind from 'twrnc';

export default function Chip({ text }: { text: string }) {
  return (
    <Text
      style={tailwind`rounded-full mx-2 text-[8px] bg-[${Colors.pink}] p-1 text-white`}
    >
      {text}
    </Text>
  );
}
