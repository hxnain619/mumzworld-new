import React from 'react';
import { Text, View } from 'react-native';

export const DiscountOffTags = ({ percent }: { percent: number | string }) => {
  return (
    <View
      className={`h-9 w-9 absolute flex flex-col gap-0 items-center justify-center z-10 top-4 right-2 rounded-full bg-primaryPink text-white p-1 m-0 text-center`}
    >
      <Text className={`text-[10px] text-white p-0 m-0`}>{percent}</Text>
      <Text
        className={`text-[10px] text-white font-bold uppercase p-0 m-0`}
      >
        OFF
      </Text>
    </View>
  );
};
