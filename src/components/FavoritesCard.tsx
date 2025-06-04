import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface FavoritesCardProps {
  name: string;
  price: string;
  imageUrl?: string;
  onRemove: () => void;
  onPress?: () => void;
}

const FavoritesCard = ({
  name,
  price,
  imageUrl,
  onRemove,
  onPress,
}: FavoritesCardProps) => (
  <TouchableOpacity
    activeOpacity={onPress ? 0.9 : 1}
    onPress={onPress}
    className="flex-row items-center bg-gray-100 rounded-xl mb-4 p-3"
  >
    <Image
      source={imageUrl ? { uri: imageUrl } : undefined}
      className="w-20 h-24 rounded-lg mr-3 bg-gray-200"
      resizeMode="cover"
    />
    <View className="flex-1">
      <Text className="font-semibold text-base text-gray-800">{name}</Text>
      <Text className="text-xs text-gray-800 mt-1">
        {Number(price).toFixed(2)} TL
      </Text>
    </View>
    <TouchableOpacity
      className="ml-2 p-2"
      onPress={onRemove}
      activeOpacity={0.7}
    >
      <Ionicons name="trash-sharp" size={24} color="black" />
    </TouchableOpacity>
  </TouchableOpacity>
);

export default FavoritesCard;
