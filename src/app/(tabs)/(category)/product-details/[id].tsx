import React, { useState } from "react";
import { View, Text } from "react-native";
import { useRouter, useLocalSearchParams, Link } from "expo-router";
import CustomHeader from "../../../../components/CustomHeader";
import LoadingSpinner from "../../../../components/ui/LoadingSpinner";
import useApi from "../../../../hooks/useApi";
import { useCart } from "../../../../context/CartContext";
import { useFavorites } from "../../../../context/FavoritesContext";
import DetailsCard from "../../../../components/DetailsCard";
import ErrorMessage from "../../../../components/ui/ErrorMessage";

interface ProductDetail {
  id: number;
  name: string;
  slug: string;
  description: string;
  images: { url: string }[];
  price: string;
}

const ProductDetailsScreen = () => {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [added, setAdded] = useState(false);
  const router = useRouter();

  const { productSlug, productName, from } = useLocalSearchParams<{
    productSlug?: string;
    productName?: string;
    from?: string;
  }>();

  const {
    data: products,
    loading,
    error,
  } = useApi<ProductDetail>("products", {
    fields: ["name", "slug", "description", "price"],
    populate: "image",
    filters: { "[slug][$eq]": productSlug },
    dependencies: [productSlug],
  });

  const handleBackPress = () => {
    if (from === "search") {
      router.push("/(category)/");
    } else {
      router.back();
    }
  };

  if (loading) {
    return (
      <LoadingSpinner
        size="large"
        color="#2563eb"
        className="flex-1 bg-gray-100"
      />
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  const product = products[0];
  const isFav = product ? isFavorite(product.id) : false;

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  return (
    <View className="flex-1 bg-white">
      <CustomHeader title={productName} onBackPress={handleBackPress} />
      {product ? (
        <DetailsCard
          name={product.name}
          description={product.description}
          images={product.images}
          price={product.price}
          isFavorite={isFav}
          onToggleFavorite={() =>
            isFav ? removeFromFavorites(product.id) : addToFavorites(product)
          }
          onAddToCart={handleAddToCart}
          addedToCart={added}
        />
      ) : (
        <View className="flex-1 justify-center items-center bg-red-50">
          <Text className="text-red-600 text-base font-semibold text-center mx-4">
            productDetails bulunamadı.
          </Text>
          <Text className="text-black text-base font-semibold text-center mx-4">
            <Link href="/(category)/">Ana sayfaya geri dön.</Link>
          </Text>
        </View>
      )}
    </View>
  );
};

export default ProductDetailsScreen;
