import React from "react";
import { TouchableOpacity, Image, View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface ProductGridCardProps {
  name: string;
  price: string;
  imageUrl?: string;
  onPress: () => void;
  isFavorite?: boolean;
  onFavoritePress?: () => void;
}

const ProductCard = ({
  name,
  price,
  imageUrl,
  onPress,
  isFavorite = false,
  onFavoritePress,
}: ProductGridCardProps) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.88}
    className="flex-1 h-80 bg-white rounded-2xl m-2 shadow overflow-hidden"
  >
    <View className="w-full h-56 bg-gray-100 items-center justify-center">
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          className="w-full h-full"
          style={{ resizeMode: "cover" }}
        />
      ) : (
        <View className="w-full h-full items-center justify-center bg-gray-200">
          <Text className="text-gray-400 text-xs">Resim Yok</Text>
        </View>
      )}
      {onFavoritePress && (
        <TouchableOpacity
          onPress={onFavoritePress}
          activeOpacity={0.7}
          className="absolute top-3 right-3 z-10 p-1 bg-white/70 rounded-full"
        >
          {isFavorite ? (
            <Ionicons name="heart-sharp" size={24} color="red" />
          ) : (
            <Ionicons name="heart-outline" size={24} color="black" />
          )}
        </TouchableOpacity>
      )}
    </View>
    <View className="flex-1 justify-between px-3 py-2">
      <Text
        className="text-base font-semibold text-gray-900 mb-1"
        numberOfLines={2}
      >
        {name}
      </Text>
      <Text className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md self-start">
        {price} TL
      </Text>
    </View>
  </TouchableOpacity>
);

export default ProductCard;
