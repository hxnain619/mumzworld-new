import React from "react";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { View, Text } from "react-native";
import Colors from "@constants/Colors";

const BottomTabBar = (props: { currentPage: string }) => {
   const { currentPage } = props;

   return (
      <View
         style={[
            tw`z-50 w-[95%] h-17 max-w-lg shadow-lg left-2.5 bg-white border border-gray-200 rounded-full bottom-3 `,
         ]}
      >
         <View
            style={tw`flex flex-row items-center mt-3 h-full max-w-lg mx-auto gap-1`}
         >
            {[
               { title: "Home", icon: "home-outline", to: "/" },
               {
                  title: "Categories",
                  icon: "layers-outline",
                  to: "/categories",
               },
               { title: "Sale", icon: "pricetag-outline", to: "/sale" },
               { title: "My Account", icon: "person-outline", to: "/settings" },
            ].map((page: { icon: any; title: string; to: string }) => (
               <Link
                  href={page.to}
                  key={page.title}
                  style={tw` flex items-center rounded-full ${currentPage === page.title ? `text-[${Colors.pink}]` : "text-gray-500"} text-xs mt-1 text-center`}
               >
                  <View
                     style={tw`flex px-2 content-center items-center flex-col `}
                  >
                     <Ionicons
                        color={
                           currentPage === page.title ? Colors.pink : "gray"
                        }
                        name={page.icon}
                        size={currentPage === page.title ? 24 : 20}
                     />
                     <Text style={tw`mt-1 `}>{page.title}</Text>
                  </View>
               </Link>
            ))}
         </View>
      </View>
   );
};

export default BottomTabBar;
