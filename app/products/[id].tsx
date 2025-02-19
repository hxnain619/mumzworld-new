import RenderHTML from "react-native-render-html";
import React, { useEffect, useState } from "react";
import { Link, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Dimensions, ScrollView, Text, View } from "react-native";

import CardWrapper from "@components/Card";
import Chip from "@components/Chip";
import ImageSlider from "@components/ImageSlider";
import RatingStars from "@components/RatingStarts";
import Divider from "@components/Divider";
import Loader from "@components/Loader";
import RTLView from "@components/RTLView";
import { useGetProductByIdQuery } from "@api/productSlice";

import { getProductByLanguage, warnings } from "./helper";
import { LanguageType } from "@assets/translations/language";

const ProductDescription = ({
  description,
  features,
  language,
  t,
  width,
}: any) => {
  const isEnglish = language === "en";
  const textAlign = isEnglish ? "text-left" : "text-right";

  return (
    <View>
      <RTLView style={`gap-1 items-center justify-evenly`}>
        <>
          {warnings.map((warn, i) => (
            <View
              key={warn.icon}
              className={`flex flex-col items-center justify-center px-2 w-30 h-14 text-center`}
            >
              <Ionicons name={warn.icon as any} size={18} />
              <Text className={`text-xs mt-2 text-semibold text-center`}>
                {t(warn.value)}
              </Text>
            </View>
          ))}
        </>
      </RTLView>
      <Divider />
      <View className={`px-2 ${textAlign}`}>
        <Text className={`${textAlign} font-bold text-sm my-2`}>
          {t("product_details")}
        </Text>
        <Text className={`${textAlign} font-bold text-xs my-2`}>
          {t("features")}
        </Text>
        <Text className={`font-normal ${textAlign} text-xs leading-4`}>
          {features}
        </Text>
        <View>
          <Text className={`${textAlign} font-bold text-xs my-2`}>
            {t("description")}
          </Text>
          <Text className={` !font-normal text-xs ${textAlign}`}>
            <RenderHTML
              contentWidth={width}
              source={{html: description}}
              baseStyle={{
                fontSize: 12,
              }}
            />
          </Text>
        </View>
      </View>
    </View>
  );
};

export default function ProductDetailPage() {
  const [currentProduct, setCurrentProduct] = useState<any>({});
  const navigation = useNavigation();

  // will be used to make it dynamic

  // const { category: categId } = useGlobalSearchParams();
  // const { id } = useGlobalSearchParams();
  const { data: product, isLoading } = useGetProductByIdQuery("");
  const { width } = Dimensions.get("window");
  const height = width * 0.7;

  useEffect(() => {
    navigation.setOptions({
      title: currentProduct?.name,
    });
  }, [navigation, currentProduct]);
  const { i18n } = useTranslation();

  useEffect(() => {
    if (product?.product) {
      getProductByLanguage(
        product.product as any,
        i18n.language as LanguageType
      )
        .then((prod: any) => {
          if (prod?.length) {
            setCurrentProduct(prod?.[0]);
          }
        })
        .catch((err) => console.log(err, "cant get product"));
    }
  }, [product, isLoading]);

  const { t } = useTranslation();

  if (isLoading || !currentProduct?.name) {
    return <Loader />;
  }

  return (
    <ScrollView
      pagingEnabled
      showsVerticalScrollIndicator={false}
      style={{ height, width }}
    >
      <CardWrapper>
        <>
          <ImageSlider
            images={
              currentProduct?.media_gallery?.map((img: any) => img.url) ?? []
            }
          />
          <View className={`mt-4 p-2`}>
            <RTLView style={`mb-2 items-center justify-around`}>
              <>
                <Text className={`text-xs w-3/4 font-semibold`}>
                  {currentProduct?.name}
                </Text>
                <Link
                  className={`text-blue-400 text-xs font-semibold`}
                  href="#"
                >
                  <Text>{t("explore_brand")}</Text>
                </Link>
              </>
            </RTLView>
            <RatingStars
              rating={currentProduct.rating_summary}
              total_reviews={currentProduct.reviews.items.length}
            />
            <RTLView style={`items-center justify-between`}>
              <>
                <View className={`flex flex-col mt-2`}>
                  <RTLView>
                    <>
                      <Text className={`font-bold text-xs text-primaryPink`}>
                        AED{" "}
                        {parseFloat(
                          currentProduct?.price_range?.minimum_price
                            ?.final_price?.value ?? 0
                        ).toFixed(2)}
                      </Text>
                      <Chip
                        text={
                          currentProduct?.price_range?.minimum_price?.discount
                            .percent_off + "%"
                        }
                      />
                    </>
                  </RTLView>
                  <Text
                    className={`font-normal line-through text-xs text-gray-400`}
                  >
                    AED{" "}
                    {parseFloat(
                      currentProduct?.price_range?.minimum_price?.regular_price
                        ?.value ?? 0
                    ).toFixed(2)}
                  </Text>
                </View>
                <RTLView style={`mt-2 gap-3`}>
                  <>
                    <Ionicons color="gray" name="heart-outline" size={18} />
                    <Ionicons color="gray" name="share-outline" size={18} />
                  </>
                </RTLView>
              </>
            </RTLView>
          </View>
        </>
      </CardWrapper>
      <CardWrapper>
        <ProductDescription
          t={t}
          width={width}
          language={currentProduct?.language}
          features={currentProduct?.features}
          description={currentProduct?.description.html}
        />
      </CardWrapper>
    </ScrollView>
  );
}
