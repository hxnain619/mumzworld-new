import React, { useEffect, useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { TextInput, TouchableOpacity, View } from "react-native";
import tailwind from "twrnc";
import { loadLanguage } from "@api/languageStorage";

export default function SearchBar({
   handleChange,
   value,
}: {
   value?: string;
   handleChange: (text: string) => void;
   onClick?: () => void;
}) {
   const [lang, setLanguage] = useState("en");

   useEffect(() => {
      loadLanguage().then((lang) => {
         setLanguage(lang);
      });
   }, []);
   const { t } = useTranslation();

   return (
      <View style={tailwind`relative px-3`}>
         <TextInput
            style={[
               tailwind`${lang === "en" ? "text-left" : "text-right"} my-2 w-full p-4 px-10 text-sm text-gray-900 border border-transparent rounded-lg bg-gray-50 shadow-md placeholder:text-gray-200`,
               { outlineStyle: "none" },
            ]}
            placeholderTextColor={"gray"}
            placeholder={t("search")}
            onChangeText={handleChange}
            value={value}
         />
         <TouchableOpacity
            style={tailwind`absolute ${lang === "en" ? "left-0" : "right-0"} top-4 text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2`}
         >
            <Ionicons
               style={tailwind`w-5 my-1.08 h-5 text-blue-600`}
               name="search"
               size={20}
            />
         </TouchableOpacity>
      </View>
   );
}
