import React, { useLayoutEffect } from "react";
import { useNavigation } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";

import { Ionicons } from "@expo/vector-icons";
import RTLView from "@components/RTLView";

export default function Setting() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  const navigation = useNavigation();
  const lang = i18n.language;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Settings",
      headerLeft: () => (
        <Ionicons
          name="arrow-back-outline"
          onPress={() => navigation.goBack()}
          size={24}
        />
      ),
    });
  }, [navigation]);

  return (
    <RTLView style={`justify-around items-center shadow-md p-2`}>
      <>
        <Ionicons
          className={`text-sm font-bold`}
          name="language-outline"
          size={26}
        />
        <View className={`flex flex-row  justify-center gap-3 mx-2`}>
          {["ar", "en"].map((btn) => (
            <TouchableOpacity
              key={btn}
              className={` flex flex-row justify-center items-center p-2 ${btn === lang ? "bg-red-400" : "bg-slate-200"} min-w-[80px] rounded-full shadow-md`}
              onPress={() => {
                const changedLang = btn === "en" ? "en" : "ar";
                changeLanguage(changedLang);
              }}
            >
              <Text className={`text-xs mr-2`}>{btn}</Text>
              {btn === lang && (
                <Ionicons
                  color={"#C30045"}
                  name="checkmark-done-outline"
                  size={18}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </>
    </RTLView>
  );
}
