import Colors from "@constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
   Dimensions,
   Image,
   ImageSourcePropType,
   NativeScrollEvent,
   NativeSyntheticEvent,
   ScrollView,
   Text,
   View,
} from "react-native";
import tailwind from "twrnc";

interface ImageSliderProps {
   images: ImageSourcePropType[];
}

export default function ImageSlider({ images }: ImageSliderProps) {
   const [active, setActive] = useState(0);

   const { width } = Dimensions.get("window");
   const height = width * 0.7;
   const handleImageChange = ({
      nativeEvent,
   }: NativeSyntheticEvent<NativeScrollEvent>) => {
      const slide = Math.ceil(
         nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
      );
      if (slide !== active) {
         setActive(slide);
      }
   };

   return (
      <View style={tailwind`mb-3`}>
         <ScrollView
            pagingEnabled
            horizontal
            onScroll={handleImageChange}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={30000}
            style={{ height, width }}
         >
            {images?.map((image: ImageSourcePropType, index: number) => (
               <Image
                  key={index}
                  style={{ height, width, resizeMode: "cover" }}
                  source={image}
               />
            ))}
         </ScrollView>
         <View
            style={tailwind`flex flex-row absolute -bottom-[20px] w-3/2 self-center items-center`}
         >
            {images.map((_, index) => (
               <View
                  key={index + "dots"}
                  style={tailwind`rounded-full h-2 px-1 ${active === index ? `bg-[${Colors.pink}]` : `bg-gray-200`} mx-1`}
               >
                  <Text>
                  &nbsp;
                  </Text>
               </View>
            ))}
         </View>
      </View>
   );
}
