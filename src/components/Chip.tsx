import React from "react";
import { Text } from "react-native";

export default function Chip({ text }: { text: string }) {
  return (
    <Text
      className={`rounded-full mx-2 text-[8px] bg-primaryPink p-1 text-white`}
    >
      {text}
    </Text>
  );
}
