import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

type Product = {
  id: number;
  name: string;
  slug: string;
  price: string;
  images: { url: string; name?: string }[];
  category: { id: number; name: string; slug: string } | null;
};

type Props = {
  products: Product[];
  onPress: (slug: string, name: string) => void;
  emptyText?: string;
};

const ProductGrid = ({ products, onPress, emptyText }: Props) => (
  <View className="flex-row flex-wrap -mx-1.5">
    {products.slice(0, 4).map((item) => (
      <TouchableOpacity
        key={item.id}
        onPress={() => onPress(item.slug, item.name)}
        className="w-1/2 p-1.5"
        accessibilityLabel={`Ürün: ${item.name}`}
      >
        <View className="bg-white rounded-2xl shadow p-2.5">
          <View className="w-full aspect-square rounded-xl bg-gray-100 overflow-hidden justify-center items-center">
            {item.images?.[0]?.url ? (
              <Image
                source={{ uri: item.images[0].url }}
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : null}
          </View>
          <Text
            className="text-sm font-medium text-gray-900 mt-2"
            numberOfLines={2}
          >
            {item.name}
          </Text>
          <Text className="text-base font-bold text-blue-600 mt-1">
            {item.price} TL
          </Text>
        </View>
      </TouchableOpacity>
    ))}
    {products.length === 0 && (
      <Text className="text-base text-gray-500 text-center w-full py-6">
        {emptyText || "Ürün bulunamadı."}
      </Text>
    )}
  </View>
);

export default ProductGrid;
