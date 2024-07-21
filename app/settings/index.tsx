import tw from "twrnc";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";

import { loadLanguage } from "@api/languageStorage";
import Colors from "@constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { changeLanguage } from "@utils/changeLanguage";
import tailwind from "twrnc";
import RTLView from "@components/RTLView";

export default function Setting() {
   const [lang, setLanguage] = useState("");

   const navigation = useNavigation();

   useLayoutEffect(() => {
      navigation.setOptions({
         title: <Text style={tw`text-black`}>Settings</Text>,
         headerLeft: () => (
            <Ionicons
               name="arrow-back-outline"
               onPress={() => navigation.goBack()}
               size={24}
            />
         ),
      });
   }, [navigation]);

   useEffect(() => {
      loadLanguage().then((_lang) => setLanguage(_lang));
   }, []);

   useEffect(() => {
      navigation.goBack()
   }, [lang])
   return (
      <RTLView style={tw`justify-around items-center shadow-md p-2`}>
         <>
            <Ionicons
               style={tw`text-sm font-bold`}
               name="language-outline"
               size={26}
            />
            <View style={tw`flex flex-row  justify-center gap-3 mx-2`}>
               {["ar", "en"].map((btn) => (
                  <TouchableOpacity
                     key={btn}
                     style={tw` flex flex-row justify-center items-center p-2 ${btn === lang ? "bg-red-400" : "bg-slate-200"} min-w-[80px] rounded-full shadow-md`}
                     onPress={() => {
                        const changedLang = btn === "en" ? "en" : "ar";
                        changeLanguage(changedLang);
                        setLanguage(changedLang);
                     }}
                  >
                     <Text style={tailwind`text-xs mr-2`}>{btn}</Text>
                     {btn === lang && (
                        <Ionicons
                           name="checkmark-done-outline"
                           color={Colors.pink}
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
