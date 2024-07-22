import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";


interface SearchBarProps {
   value?: string;
   handleChange: (text: string) => void;
   onClick?: () => void;
 }
const SearchBar: (props: SearchBarProps) => React.JSX.Element = ({
  handleChange,
  value,
}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <View className={`relative px-3 bg-white`}>
      <TextInput
        className={`outline-none ${lang === "en" ? "text-left" : "text-right"} my-2 w-full p-4 px-10 text-sm text-gray-900 border border-transparent rounded-lg bg-gray-50 shadow-md placeholder:text-gray-400`}
        placeholder={t("search")}
        onChangeText={handleChange}
        value={value}
      />
      <TouchableOpacity
        className={`absolute ${lang === "en" ? "left-0" : "right-0"} top-4 text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2`}
      >
        <Ionicons
          className={`w-5 my-1.08 h-5 text-blue-600`}
          name="search"
          size={20}
        />
      </TouchableOpacity>
    </View>
  );
}

export default SearchBar;