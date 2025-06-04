// src/app/(tabs)/(category)/product-types/[product-type].tsx
import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import CustomHeader from "../../../../components/CustomHeader";
import LoadingSpinner from "../../../../components/ui/LoadingSpinner";
import useApi from "../../../../hooks/useApi";
import SearchBar from "../../../../components/SearchBar";
import ErrorMessage from "../../../../components/ui/ErrorMessage";
import ProductTypesCard from "../../../../components/ProductTypesCard";

// Ürün tipi veri tipi
interface ProductType {
  id: number;
  name: string;
  slug: string;
  images: { url: string }[];
}

const ProductTypesScreen = () => {
  const router = useRouter();
  const { productType, categoryName } = useLocalSearchParams<{
    productType?: string;
    categoryName?: string;
  }>();

  // useApi ile ürün tiplerini çek
  const {
    data: productTypes,
    loading,
    error,
  } = useApi<ProductType>("product-types", {
    fields: ["name", "slug"],
    populate: "image",
    filters: { "[subcategories][slug][$eq]": productType },
    dependencies: [productType],
  });

  // Ürün tipi seçildiğinde ürünlere yönlendirme
  const handleProductTypePress = (
    productTypeSlug: string,
    productTypeName: string
  ) => {
    router.push({
      pathname: `/(category)/products/[product]`,
      params: { product: productTypeSlug, categoryName, productTypeName },
    });
  };

  // Yükleniyor durumu
  if (loading) {
    return (
      <LoadingSpinner
        size="large"
        color="#2563eb"
        className="flex-1 justify-center"
      />
    );
  }

  // Hata durumu
  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <View className="flex-1 bg-white">
      <CustomHeader title={categoryName} onBackPress={() => router.back()} />
      <SearchBar />
      <ScrollView>
        {productTypes.length === 0 ? (
          <View className="flex-1 justify-center items-center py-8">
            {/* Adjusted padding for better visual */}
            <Text className="text-gray-600 text-base font-semibold text-center mx-4">
              productType bulunamadı.
            </Text>
          </View>
        ) : (
          productTypes.map((item) => (
            <ProductTypesCard
              key={item.id}
              name={item.name}
              imageUrl={item.images[0]?.url}
              onPress={() => handleProductTypePress(item.slug, item.name)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default ProductTypesScreen;
