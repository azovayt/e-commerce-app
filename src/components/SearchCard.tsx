import React from "react";
import { TouchableOpacity, ImageBackground, Text, View } from "react-native";

// Ürün kartı için props tipleri
interface Props {
  name: string; // Ürün adı
  imageUrl?: string; // Ürün görsel
  price: string; // Ürün fiyatı
  onPress: () => void; // Kart tıklanınca çalışacak fonksiyon
}

// Ürün kartı bileşeni
const SearchCard = ({ name, imageUrl, price, onPress }: Props) => (
  <TouchableOpacity
    onPress={onPress}
    className="bg-gray-100 mt-3 mx-3 h-32 rounded-md shadow-md shadow-gray-200 active:bg-gray-50"
  >
    {/* Varsa ürün resmi arkaplanda gösterilir, yoksa sadece isim yazılır */}
    {imageUrl ? (
      <ImageBackground
        source={{ uri: imageUrl }}
        className="w-full h-32 justify-center items-center rounded-md overflow-hidden"
        resizeMode="cover"
      >
        {/* Resmin üzerinde yarı saydam arka plan, ürün adı ve fiyat */}
        <View className="bg-black/40 px-3 py-2 rounded">
          <Text className="text-xl font-semibold text-white">{name}</Text>
          {price !== undefined && (
            <Text className="text-base text-white">{price} TL</Text>
          )}
        </View>
      </ImageBackground>
    ) : (
      <View className="flex-1 justify-center items-center">
        <Text className="text-xl font-semibold text-gray-700">{name}</Text>
        {price !== undefined && (
          <Text className="text-base text-gray-700">{price} TL</Text>
        )}
      </View>
    )}
  </TouchableOpacity>
);

export default SearchCard;
