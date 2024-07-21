import tailwind from "twrnc";
import RenderHtml from "react-native-render-html";
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
         <RTLView style={tailwind`gap-1 items-center justify-around`}>
            <>
               {warnings.map((warn, i) => (
                  <View
                     key={warn.icon}
                     style={tailwind`flex flex-col items-center justify-center px-2 w-30 h-14 text-center ${i !== 2 ? "border-r-2 border-gray-200" : ""}`}
                  >
                     <Ionicons name={warn.icon as any} size={18} />
                     <Text
                        style={tailwind`text-[10px] mt-2 text-semibold text-center`}
                     >
                        {t(warn.value)}
                     </Text>
                  </View>
               ))}
            </>
         </RTLView>
         <Divider />
         <View style={tailwind`px-2 font-sans ${textAlign}`}>
            <Text style={tailwind`${textAlign} font-bold text-sm my-2`}>
               {t("product_details")}
            </Text>
            <Text style={tailwind`${textAlign} font-bold text-xs my-2`}>
               {t("features")}
            </Text>
            <Text
               style={tailwind` font-normal ${textAlign} text-[10px] leading-4`}
            >
               {features}
            </Text>
            <br />
            <Text style={tailwind`${textAlign} font-bold text-xs my-2`}>
               {t("description")}
            </Text>
            <Text
               style={tailwind` !font-normal text-[10px] ${textAlign}`}
            >
               <RenderHtml
                  baseStyle={tailwind` !font-normal text-[10px]`}
                  contentWidth={width}
                  source={{ html: description }}
               />
            </Text>
         </View>
      </View>
   );
};

export default function ProductDetailPage() {
   const [currentProduct, setCurrentProduct] = useState<any>({});
   const navigation = useNavigation();
   const { t } = useTranslation();

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

   useEffect(() => {
      if (product?.product) {
         getProductByLanguage(product.product as any).then((prod: any) => {
            if(prod?.length){
               setCurrentProduct(prod?.[0]);
            }
         })
         .catch(err => console.log(err, 'cant get product'));
      }
   }, [product, isLoading]);

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
                     currentProduct?.media_gallery?.map(
                        (img: any) => img.url
                     ) ?? []
                  }
               />
               <View style={tailwind`mt-4 p-2`}>
                  <RTLView style={tailwind`mb-2 items-center justify-center`}>
                     <>
                        <Text style={tailwind`text-xs w-3/4 font-semibold`}>
                           {currentProduct?.name}
                        </Text>
                        <Link
                           style={tailwind`text-blue-400 text-xs font-semibold`}
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
                  <RTLView style={tailwind`items-center justify-between`}>
                     <>
                        <View style={tailwind`flex flex-col mt-2`}>
                           <RTLView>
                              <>
                                 <Text style={tailwind`font-bold text-xs`}>
                                    AED{" "}
                                    {parseFloat(
                                       currentProduct?.price_range
                                          ?.minimum_price?.final_price?.value ??
                                          0
                                    ).toFixed(2)}
                                 </Text>
                                 <Chip
                                    text={
                                       currentProduct?.price_range
                                          ?.minimum_price?.discount
                                          .percent_off + "%"
                                    }
                                 />
                              </>
                           </RTLView>
                           <Text
                              style={tailwind`font-normal line-through text-[10px] text-gray-400`}
                           >
                              AED{" "}
                              {parseFloat(
                                 currentProduct?.price_range?.minimum_price
                                    ?.regular_price?.value ?? 0
                              ).toFixed(2)}
                           </Text>
                        </View>
                        <RTLView style={tailwind`mt-2 gap-3`}>
                           <>
                              <Ionicons
                                 color="gray"
                                 name="heart-outline"
                                 size={18}
                              />
                              <Ionicons
                                 color="gray"
                                 name="share-outline"
                                 size={18}
                              />
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
