import Colors from '@constants/Colors';
import React from 'react';
import { Text, View } from 'react-native';
import tailwind from 'twrnc';

export const DiscountOffTags = ({ percent }: { percent: number | string }) => {
  return (
    <View
      style={tailwind` h-9 w-9 absolute flex flex-col gap-0 items-center justify-center z-10 top-4 right-2 rounded-full bg-[${Colors.pink}] text-white p-1 m-0 text-center`}
    >
      <Text style={tailwind`text-[10px] text-white p-0 m-0`}>{percent}</Text>
      <Text
        style={tailwind`text-[10px] text-white font-bold uppercase p-0 m-0`}
      >
        OFF
      </Text>
    </View>
  );
};
