import { router } from "expo-router";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { DiscountOffTags } from "./DiscountTag";

interface CardProps {
  id: string;
  img: ImageSourcePropType;
  title: string;
  price: string;
  discount: string;
  regularPrice: string;
  className?: string;
}
export default function Card(props: CardProps) {
  const { img, title, className, discount, regularPrice, price, id } = props;
  const isDiscount = parseInt(discount) > 0;
  return (
    <TouchableOpacity
      onPress={() => router.push(`/products/${id}`)}
      className={`w-1/2 p-2 border-4 border-transparent bg-white rounded-sm shadow-lg  ${className ?? ""}`}
    >
      <View
        className={`mb-2 relative mx-auto my-0 max-h-[200px] max-w-[180px]`}
      >
        {isDiscount && <DiscountOffTags percent={discount} />}
        <Image
          className={`rounded-lg min-h-[200px] min-w-[180px] max-w-[180px] w-full h-auto p-2`}
          source={{ uri: img as any }}
          resizeMode="cover"
        />
      </View>
      <View className={`flex-start p-1 mx-auto my-0 min-h-14`}>
        <Text
          className={`text-xs font-semibold text-gray-500 tracking-tight`}
        >
          {title}
        </Text>
      </View>
      <View className={`flex flex-row justify-between items-center`}>
        <View className={`flex flex-col items-center`}>
          <Text className={`text-primaryPink text-xs font-semibold `}>
            AED {parseFloat(price).toFixed(2)}
          </Text>
          {isDiscount && (
            <Text
              className={` h-full line-through text-[#828282] text-xs font-semibold `}
            >
              AED {parseFloat(regularPrice).toFixed(2)}
            </Text>
          )}
        </View>

        <View
          className={`flex items-center justify-center bg-white border border-transparent rounded-full shadow-lg h-7 relative w-7`}
        >
          <Ionicons name="cart-outline" size={20} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
