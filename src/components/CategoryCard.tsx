import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, ImageBackground, Text, View } from "react-native";

// Kategori kartının props tipleri
interface Props {
  name: string; // Kategori adı
  imageUrl?: string; // Kategori görsel URL'si
  onPress: () => void; // Kart tıklanınca çalışacak fonksiyon
}

// Kategori kartı bileşeni
const CategoryCard = ({ name, imageUrl, onPress }: Props) => (
  <TouchableOpacity
    onPress={onPress}
    className="bg-gray-100 mt-3 mx-3 h-32 rounded-md shadow-md shadow-gray-200 active:bg-gray-50"
  >
    {/* Varsa kategori resmi arkaplanda gösterilir, yoksa sadece isim yazılır */}
    {imageUrl ? (
      <ImageBackground
        source={{ uri: imageUrl }}
        className="w-full h-32 justify-center items-center rounded-md overflow-hidden"
        resizeMode="cover"
      >
        {/* Resmin üzerinde yarı saydam arka plan ve kategori adı */}
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-semibold text-white bg-black/10 px-2 py-1 rounded">
            {name}
          </Text>
          <Ionicons name="chevron-forward" size={24} color="#fff" />
        </View>
      </ImageBackground>
    ) : (
      <Text className="text-xl font-semibold text-white bg-black/10 px-2 py-1 rounded">
        {name}
      </Text>
    )}
  </TouchableOpacity>
);

export default CategoryCard;
