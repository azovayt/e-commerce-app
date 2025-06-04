import React from "react";
import { View, Text, FlatList } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import CustomHeader from "../../../../components/CustomHeader";
import LoadingSpinner from "../../../../components/ui/LoadingSpinner";
import useApi from "../../../../hooks/useApi";
import ProductCard from "../../../../components/ProductCard";
import ErrorMessage from "../../../../components/ui/ErrorMessage";
import { useFavorites } from "../../../../context/FavoritesContext";

// Ürün veri tipi
interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  images: { url: string }[];
}

const ProductsScreen = () => {
  const router = useRouter();
  const { product, productTypeName } = useLocalSearchParams<{
    product?: string;
    productTypeName?: string;
  }>();

  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  // useApi ile ürünleri çek
  const {
    data: products,
    loading,
    error,
  } = useApi<Product>("products", {
    fields: ["name", "slug", "price"],
    populate: "image",
    filters: { "[product_type][slug][$eq]": product },
    dependencies: [product],
  });

  // Ürün seçildiğinde detay sayfasına yönlendirme
  const handleProductPress = (productSlug: string, productName: string) => {
    router.push({
      pathname: `/(category)/product-details/[id]`,
      params: {
        productSlug, // Ürün slug geçiyoruz
        productName, // Ürün adını geçiyoruz
      },
    });
  };

  // Yükleniyor durumu
  if (loading) {
    return (
      <LoadingSpinner
        size="large"
        color="#2563eb"
        className="flex-1 bg-gray-100"
      />
    );
  }

  // Hata durumu
  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <View className="flex-1 bg-white">
      <CustomHeader title={productTypeName} onBackPress={() => router.back()} />
      <FlatList
        data={products ?? []} // products boşsa veya tanımlanmamışsa boş bir dizi
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ padding: 4, paddingBottom: 32 }}
        renderItem={({ item }) => (
          <ProductCard
            name={item.name}
            price={item.price}
            imageUrl={item.images[0]?.url}
            onPress={() => handleProductPress(item.slug, item.name)}
            isFavorite={isFavorite(item.id)}
            onFavoritePress={() =>
              isFavorite(item.id)
                ? removeFromFavorites(item.id)
                : addToFavorites(item)
            }
          />
        )}
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center py-8">
            <Text className="text-gray-600 text-base font-semibold text-center mx-4">
              product bulunamadı.
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default ProductsScreen;
