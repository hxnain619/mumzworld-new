import { useLazyGetProductsByCategoryQuery } from "@api/productSlice";
import { useGlobalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, Dimensions, ScrollView, Text, View } from "react-native";
import { getSearchData, ITEMS_PER_LOAD } from "./helper";
import Card from "@components/ProductCard";
import SearchBar from "@components/SearchBar";
import Loader from "@components/Loader";
import RTLView from "@components/RTLView";

const { height } = Dimensions.get("window");

export default function ProductDetailPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [screenHeight, setScreenHeight] = useState(0);
  const [search, updateSearch] = useState("");

  const navigation = useNavigation();
  const { category: categId } = useGlobalSearchParams();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${categId} Products`,
    });
  }, [navigation]);

  const [getProducts, { data, isLoading }] =
    useLazyGetProductsByCategoryQuery();

  useEffect(() => {
    if (categId) {
      getProducts(categId as string);
    }
  }, [categId]);

  useEffect(() => {
    if (data) {
      setTotalItems(data.total);
      setCurrentItems(data.data);
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  const totalPages = Math.ceil(totalItems / ITEMS_PER_LOAD);
  const indexOfLastItem = currentPage * ITEMS_PER_LOAD;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_LOAD;
  const paginatedItems = currentItems.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const onContentSizeChange = (
    _contentWidth: number,
    contentHeight: number
  ) => {
    setScreenHeight(contentHeight);
  };
  const handleSearch = (text: string) => {
    updateSearch(text);

    if (search === "") {
      return setCurrentItems(data?.data);
    }
    setCurrentItems(getSearchData(data?.data as any, text) as any);
  };

  const scrollEnabled = screenHeight > height;

  return (
    <ScrollView
      className={`flex flex-1 pb-10`}
      scrollEnabled={scrollEnabled}
      onContentSizeChange={onContentSizeChange}
    >
      <SearchBar
        handleChange={(text: string) => handleSearch(text)}
        value={search}
      />
      <RTLView style={`flex-wrap justify-center items-center`}>
        <>
          {paginatedItems?.length > 0 && !isLoading ? (
            paginatedItems.map((item: any) => {
              const { id, small_image, name, price_range } = item;
              const { discount, final_price, regular_price } =
                price_range.minimum_price;

              return (
                <Card
                  key={id}
                  id={id}
                  img={small_image?.url ?? ""}
                  title={name ?? ""}
                  discount={discount.discount_off}
                  price={final_price.value}
                  regularPrice={regular_price.value}
                />
              );
            })
          ) : (
            <Text className={` flex flex-1 items-center justify-center p-4`}>
              No items ...
            </Text>
          )}
        </>
      </RTLView>
      {paginatedItems.length ? (
        <View className="flex flex-row justify-between items-center mt-[20px] p-[10px]">
          <Button
            title="Previous"
            onPress={handlePrevPage}
            disabled={currentPage === 1}
          />
          <Text>
            Page {currentPage} of {totalPages}
          </Text>
          <Button
            color='text-primaryPink'
            title="Next"
            onPress={handleNextPage}
            disabled={currentPage === totalPages}
          />
        </View>
      ) : null}
    </ScrollView>
  );
}
