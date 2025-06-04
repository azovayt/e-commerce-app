import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { router } from "expo-router";
import CustomHeader from "../../../components/CustomHeader";
import useApi from "../../../hooks/useApi";
import { Ionicons } from "@expo/vector-icons";
import HomeCategoryList from "../../../components/HomeCategoryList";
import HomeProductGrid from "../../../components/HomeProductGrid";
import ErrorMessage from "../../../components/ui/ErrorMessage";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";

interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  images: { url: string; name?: string }[];
  category: { id: number; name: string; slug: string } | null;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  images?: { url: string }[];
}

const HomeScreen = () => {
  const {
    data: womenProducts = [],
    loading: womenLoading,
    error: womenError,
  } = useApi<Product>("products", {
    fields: ["name", "slug", "price"],
    filters: { category: { slug: "kadin" } },
    populate: ["image", "category"],
  });

  const {
    data: menProducts = [],
    loading: menLoading,
    error: menError,
  } = useApi<Product>("products", {
    fields: ["name", "slug", "price"],
    filters: { category: { slug: "erkek" } },
    populate: ["image", "category"],
  });

  const {
    data: categories = [],
    loading: categoriesLoading,
    error: categoriesError,
  } = useApi<Category>("categories", {
    fields: ["name", "slug"],
    populate: ["image"],
  });

  const loading = womenLoading || menLoading || categoriesLoading;
  const error = womenError || menError || categoriesError;

  const handleProductPress = (productSlug: string, productName: string) => {
    router.push({
      pathname: `/(category)/product-details/[id]`,
      params: { productSlug, productName },
    });
  };

  const handleCategoryPress = (
    productTypeSlug: string,
    productTypeName: string
  ) => {
    router.push({
      pathname: `/(category)/product-types/[product-type]`,
      params: { product: productTypeSlug, productTypeName },
    });
  };

  if (loading) {
    return (
      <LoadingSpinner
        size="large"
        color="#2563eb"
        className="flex-1 justify-center"
      />
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <View className="flex-1 bg-gray-50">
      <CustomHeader logo={true} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 28 }}
      >
        {/* Kategoriler */}
        <Text className="text-xl font-bold text-gray-900 px-4 mt-4 mb-2">
          Kategoriler
        </Text>
        <HomeCategoryList
          categories={categories}
          onPress={handleCategoryPress}
        />

        {/* Kadın Ürünleri */}
        <View className="mt-6 px-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-lg font-bold text-gray-900">
              Kadın Ürünleri
            </Text>
            <TouchableOpacity>
              <Text className="text-sm text-blue-600 font-semibold">
                Tümünü Gör
              </Text>
            </TouchableOpacity>
          </View>
          <HomeProductGrid
            products={womenProducts}
            onPress={handleProductPress}
            emptyText="Kadın ürün bulunamadı."
          />
        </View>

        {/* Erkek Ürünleri */}
        <View className="mt-6 px-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-lg font-bold text-gray-900">
              Erkek Ürünleri
            </Text>
            <TouchableOpacity>
              <Text className="text-sm text-blue-600 font-semibold">
                Tümünü Gör
              </Text>
            </TouchableOpacity>
          </View>
          <HomeProductGrid
            products={menProducts}
            onPress={handleProductPress}
            emptyText="Erkek ürün bulunamadı."
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
