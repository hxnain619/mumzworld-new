import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default function RTLView({
  style,
  children,
}: {
  style?: any;
  children: React.JSX.Element;
}) {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <View
      className={`flex ${lang === "en" ? "flex-row" : "flex-row-reverse"} ${style}`}
    >
      {children}
    </View>
  );
}
