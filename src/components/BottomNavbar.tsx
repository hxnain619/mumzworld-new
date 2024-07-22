import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { View, Text } from "react-native";

const BottomTabBar = (props: { currentPage: string }) => {
  const { currentPage } = props;

  return (
    <View
      className={`z-50 w-[95%] h-[60px] max-w-lg shadow-lg left-2.5 bg-white border border-gray-200 rounded-full bottom-3 `}
    >
      <View
        className={`flex flex-row items-center h-full max-w-lg mx-auto gap-1`}
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
            className={` flex items-center rounded-full ${currentPage === page.title ? `text-primaryPink` : "text-gray-500"} text-xs mt-1 text-center`}
          >
            <View className={`flex px-2 content-center items-center flex-col `}>
              <Ionicons
                color={currentPage === page.title ? 'text-primaryPink' : "gray"}
                name={page.icon}
                size={currentPage === page.title ? 24 : 20}
              />
              <Text className={`mt-1 `}>{page.title}</Text>
            </View>
          </Link>
        ))}
      </View>
    </View>
  );
};

export default BottomTabBar;
