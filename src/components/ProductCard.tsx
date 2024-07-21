import { Link, router } from 'expo-router';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import tailwind from 'twrnc';
import Colors from '@constants/Colors';
import { DiscountOffTags } from './DiscountTag';
import { Ionicons } from '@expo/vector-icons';

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
      style={[
        tailwind`w-1/2 p-2 border-4 border-transparent bg-white rounded-sm shadow-lg  ${className ?? ''}`,
      ]}
    >
      <View
        style={tailwind`mb-2 relative mx-auto my-0 max-h-[200px] max-w-[180px]`}
      >
        {isDiscount && <DiscountOffTags percent={discount} />}
        <Image
          style={tailwind`rounded-lg min-h-[200px] min-w-[180px] max-w-[180px] w-full h-auto p-2`}
          source={{uri: img as any}}
          resizeMode="cover"
        />
      </View>
      <View style={[tailwind`flex p-1 mx-auto my-0 min-h-14`, {
      }]}>
        <Text
          style={tailwind`text-xs font-semibold text-[${Colors.gray}] tracking-tight`}
        >
          {title}
        </Text>
      </View>
      <View style={tailwind`flex flex-row justify-between items-center`}>
        <View style={tailwind`flex flex-col items-center`}>
          <Text
            style={tailwind`text-[${Colors.pink}] text-xs font-semibold `}
          >
            AED {parseFloat(price).toFixed(2)}
          </Text>
          {isDiscount && (
            <Text
              style={tailwind` h-full line-through text-[#828282] text-xs font-semibold `}  
            >
              AED {parseFloat(regularPrice).toFixed(2)}
            </Text>
        )} 
        </View>

        <View
          style={tailwind`flex items-center justify-center bg-white border border-transparent rounded-full shadow-lg h-7 relative w-7`}
        >
          <Ionicons name="cart-outline" size={20} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
