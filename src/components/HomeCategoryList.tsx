import React from "react";
import { ScrollView, TouchableOpacity, View, Image, Text } from "react-native";

type Category = {
  id: number;
  name: string;
  slug: string;
  images?: { url: string }[];
};

type Props = {
  categories: Category[];
  onPress: (slug: string, name: string) => void;
};

const CategoryList = ({ categories, onPress }: Props) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    className="pl-4"
    contentContainerStyle={{ gap: 6, paddingRight: 6 }}
  >
    {categories.map((cat) => (
      <TouchableOpacity
        key={cat.id}
        className="items-center"
        accessibilityLabel={`Kategori: ${cat.name}`}
        style={{ width: 74 }}
        onPress={() => onPress(cat.slug, cat.name)}
      >
        <View className="w-16 h-16 rounded-2xl bg-white shadow justify-center items-center overflow-hidden">
          {cat.images?.[0]?.url ? (
            <Image
              source={{ uri: cat.images[0].url }}
              className="w-16 h-16"
              resizeMode="cover"
            />
          ) : null}
        </View>
        <Text
          className="text-xs mt-2 text-gray-700 font-semibold text-center"
          numberOfLines={2}
        >
          {cat.name}
        </Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

export default CategoryList;
