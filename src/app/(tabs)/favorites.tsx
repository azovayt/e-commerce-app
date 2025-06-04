import React from "react";
import { View, Text, ScrollView } from "react-native";
import CustomHeader from "../../components/CustomHeader";
import { useFavorites } from "../../context/FavoritesContext";
import FavoritesCard from "../../components/FavoritesCard";
import { router } from "expo-router";

const FavoritesScreen = () => {
  const { favorites, removeFromFavorites } = useFavorites();

  return (
    <View className="flex-1 bg-white">
      <CustomHeader title="Favoriler" onBackPress={() => router.back()} />
      <ScrollView className="flex-1 p-4">
        {favorites.length === 0 ? (
          <View className="flex-1 items-center justify-center mt-16">
            <Text className="text-gray-400">Hiç favori ürün yok.</Text>
          </View>
        ) : (
          favorites.map((item) => (
            <FavoritesCard
              key={item.id}
              name={item.name}
              price={item.price}
              imageUrl={item.images?.[0]?.url}
              onRemove={() => removeFromFavorites(item.id)}
              // onPress eklemek istersen buraya yazabilirsin
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default FavoritesScreen;
