import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

interface Props {
  name: string; // Kategori adı
  imageUrl?: string; // Kategori görsel URL'si
  onPress: () => void; // Kart tıklanınca çalışacak fonksiyon
}
const ProductTypesCard = ({ name, imageUrl, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-gray-100 mt-2 mb-2 mx-3 rounded-md active:bg-gray-50"
    >
      <View className="flex-row items-center justify-between p-1">
        <Text className="text-base font-bold text-black mx-8">{name}</Text>
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            className="w-20 h-20 mx-4 rounded-full"
            resizeMode="cover"
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default ProductTypesCard;
