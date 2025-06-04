import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";

interface DetailsCardProps {
  name: string;
  description: string;
  images?: { url: string }[];
  price: string;

  isFavorite: boolean;
  onToggleFavorite: () => void;
  onAddToCart: () => void;
  addedToCart: boolean;
}

const DetailsCard = ({
  name,
  description,
  images,
  price,

  isFavorite,
  onToggleFavorite,
  onAddToCart,
  addedToCart,
}: DetailsCardProps) => {
  const screenWidth = Dimensions.get("window").width;

  return (
    <>
      <ScrollView
        className="flex-1 bg-gray-100"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Yatay resim galerisi */}
        {images && images.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {images.map((img, idx) => (
              <Image
                key={idx}
                source={{ uri: img.url }}
                style={{
                  width: screenWidth - 1,
                  aspectRatio: 1,
                  marginRight: 12,
                  backgroundColor: "#f1f5f9",
                }}
                resizeMode="contain"
              />
            ))}
          </ScrollView>
        ) : (
          <View className="w-full h-48 bg-gray-200 rounded-xl mb-4 justify-center items-center">
            <Text className="text-gray-500">Resim Yok</Text>
          </View>
        )}
        <View className="bg-white mb-2 p-2">
          <Text className="text-2xl font-bold text-black mb-2">{name}</Text>
          <Text className="text-xl font-semibold text-green-600">
            {price} TL
          </Text>
        </View>
        <View className="bg-white mb-2 p-2">
          <Text className="text-base text-black mb-2">Ürün Bilgileri</Text>
          <Text className="text-md font-light text-black">{description}</Text>
        </View>
        <View className="bg-white mb-2 p-2">
          <Text className="text-base text-black mb-2">Beden</Text>
          <View className="flex-row gap-2 mb-2">
            <Text className="text-base font-light text-black border border-gray-300 w-16 p-2 text-center">
              XS
            </Text>
            <Text className="text-base font-light text-black border border-gray-300 w-16 p-2 text-center">
              S
            </Text>
            <Text className="text-base font-light text-black border border-gray-300 w-16 p-2 text-center">
              M
            </Text>
            <Text className="text-base font-light text-black border border-gray-300 w-16 p-2 text-center">
              L
            </Text>
            <Text className="text-base font-light text-black border border-gray-300 w-16 p-2 text-center">
              XL
            </Text>
            <Text className="text-base font-light text-black border border-gray-300 w-16 p-2 text-center">
              XXL
            </Text>
          </View>
        </View>

        {onToggleFavorite && (
          <TouchableOpacity
            onPress={onToggleFavorite}
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
      </ScrollView>
      <View className="absolute left-0 right-0 bottom-0 bg-white px-4 py-4 border-t border-gray-200">
        <TouchableOpacity
          className={`w-full py-4 rounded-xl ${
            addedToCart ? "bg-green-600" : "bg-black"
          }`}
          onPress={onAddToCart}
          activeOpacity={0.85}
        >
          <Text className="text-white text-center font-bold text-lg">
            {addedToCart ? "Eklendi!" : "Sepete Ekle"}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default DetailsCard;
