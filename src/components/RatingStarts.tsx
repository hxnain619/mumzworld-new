import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, Text, View } from "react-native";
import tailwind from "twrnc";
import RTLView from "./RTLView";

interface RatingStarProps {
  stars?: number;
  rating: number;
  total_reviews: number;
}
export default function RatingStars({
  stars = 5,
  rating,
  total_reviews,
}: RatingStarProps) {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={tailwind`flex flex-1`}>
      <RTLView>
        <>
          {Array.from(Array(stars).keys()).map((star) => (
            <Ionicons
              key={star}
              name={rating <= star ? "star-outline" : "star"}
              color="#FFE234"
              size={16}
            />
          ))}
          <Text style={tailwind`text-xs text-slate-400 ml-2 `}>{rating}</Text>
          <Text style={tailwind`text-xs text-slate-400 ml-2`}>
            ({total_reviews} {t("reviews")})
          </Text>
        </>
      </RTLView>
    </SafeAreaView>
  );
}
