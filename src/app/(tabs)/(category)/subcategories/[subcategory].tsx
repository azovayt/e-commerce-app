import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import CustomHeader from "../../../../components/CustomHeader";
import LoadingSpinner from "../../../../components/ui/LoadingSpinner";
import useApi from "../../../../hooks/useApi";
import SearchBar from "../../../../components/SearchBar";
import SubcategoryCard from "../../../../components/SubcategoryCard";
import ErrorMessage from "../../../../components/ui/ErrorMessage";

// Alt kategori veri tipi
interface Subcategory {
  id: number;
  name: string;
  slug: string;
  images: { url: string }[];
}

const SubcategoriesScreen = () => {
  const router = useRouter();
  const { subcategory, categoryName } = useLocalSearchParams<{
    subcategory?: string;
    categoryName?: string;
  }>();

  // useApi ile alt kategorileri çek
  const {
    data: subcategories,
    loading,
    error,
  } = useApi<Subcategory>("subcategories", {
    fields: ["name", "slug"],
    populate: "image",
    filters: { "[category][slug][$eq]": subcategory },
    dependencies: [subcategory],
  });

  // Alt kategori seçildiğinde ürün tiplerine yönlendirme
  const handleSubcategoryPress = (subcatSlug: string, subcatName: string) => {
    router.push({
      pathname: `/(category)/product-types/[product-type]`,
      params: { productType: subcatSlug, categoryName: subcatName },
    });
  };

  // Yükleniyor durumu
  if (loading) {
    return <LoadingSpinner className="bg-white" size="large" color="#2563eb" />;
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
        {subcategories.length === 0 ? (
          <View className="flex-1 justify-center items-center py-8">
            {/* Adjusted padding for better visual */}
            <Text className="text-gray-600 text-base font-semibold text-center mx-4">
              subcategory bulunamadı.
            </Text>
          </View>
        ) : (
          subcategories.map((item) => (
            <SubcategoryCard
              key={item.id}
              name={item.name}
              imageUrl={item.images[0]?.url}
              onPress={() => handleSubcategoryPress(item.slug, item.name)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default SubcategoriesScreen;
