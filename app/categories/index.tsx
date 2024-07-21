import React, { useEffect, useLayoutEffect, useState } from "react";
import tw from "twrnc";

import {
   View,
   FlatList,
   Text,
   Image,
   ActivityIndicator,
   TouchableOpacity,
} from "react-native";

import BottomTabBar from "@components/BottomNavbar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useGetCategoriesQuery } from "@api/productSlice";
import { generateItems, ITEMS_PER_LOAD } from "./helper";
import Colors from "@constants/Colors";
import tailwind from "twrnc";
import Loader from "@components/Loader";
import RTLView from "@components/RTLView";

export default function () {
   const [items, setItems] = useState([]);
   const [loadedItemsCount, setLoadedItemsCount] = useState(ITEMS_PER_LOAD);

   const { data, isLoading } = useGetCategoriesQuery("");
   const navigation = useNavigation<any>();
   const router = useRouter();

   const loadMoreItems = () => {
      const newLoadedCount = loadedItemsCount + ITEMS_PER_LOAD;
      setItems(generateItems(data as any).slice(0, newLoadedCount) as any);
      setLoadedItemsCount(newLoadedCount);
   };

   useLayoutEffect(() => {
      navigation.setOptions({
         title: "Categories",
      });
   }, [navigation]);

   useEffect(() => {
      if (data) {
         setItems(generateItems(data as any).slice(0, ITEMS_PER_LOAD) as any);
      }
   }, [data, isLoading]);

   if (isLoading) {
      return <Loader />;
   }

   return (
      <View style={tailwind` flex flex-1`}>
         <FlatList
            style={tw` max-w-md pb-[70px]`}
            data={(items ?? []) as any}
            renderItem={({ item }) => (
               <TouchableOpacity
                  onPress={() => router.push(`/products?category=${item}`)}
                  style={tw` p-4 sm:pb-4 shadow-md`}
               >
                  <RTLView style={tw`items-center`}>
                     <>
                        <View style={tw`flex-shrink-0 mr-2`}>
                           <Image
                              source={require("@assets/images/icon.png")}
                              style={tw`w-8 h-8 rounded-full`}
                           />
                        </View>
                        <View style={tw`flex-1 min-w-0`}>
                           <Text style={tw` text-sm font-medium text-gray-900`}>
                              {item}
                           </Text>
                        </View>
                        <View
                           style={tw`items-center text-base font-semibold text-gray-900`}
                        >
                           <Ionicons
                              color="gray"
                              name="chevron-forward-outline"
                              size={20}
                           />
                        </View>
                     </>
                  </RTLView>
               </TouchableOpacity>
            )}
            ListFooterComponent={() => (
               <TouchableOpacity
                  onPress={loadMoreItems}
                  style={tw`text-center p-2`}
               >
                  <Text
                     style={tw`${loadedItemsCount === (data as any)?.length ? "hidden" : ""}  text-sm text-gray-500 text-center`}
                  >
                     Load More
                  </Text>
               </TouchableOpacity>
            )}
         />
         <BottomTabBar currentPage="Categories" />
      </View>
   );
}
