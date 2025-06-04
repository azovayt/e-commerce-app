import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface CartCardProps {
  name: string;
  price: string;
  quantity: number;
  imageUrl?: string;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

const CartCard = ({
  name,
  price,
  quantity,
  imageUrl,
  onIncrease,
  onDecrease,
  onRemove,
}: CartCardProps) => (
  <View className="flex-row items-center bg-gray-100 rounded-xl mb-4 p-3">
    <Image
      source={imageUrl ? { uri: imageUrl } : undefined}
      className="w-20 h-24 rounded-lg mr-3 bg-gray-200"
      resizeMode="cover"
    />
    <View className="flex-1">
      <Text className="font-nunito font-semibold text-base text-gray-800">
        {name}
      </Text>
      <Text className="font-nunito text-xs text-gray-800 mt-1">
        {Number(price).toFixed(2)} TL
      </Text>
      <View className="flex-row items-center mt-2">
        <TouchableOpacity onPress={onDecrease}>
          <Ionicons name="remove-circle" size={24} color="black" />
        </TouchableOpacity>
        <Text className="mx-3 font-nunito text-base">{quantity}</Text>
        <TouchableOpacity onPress={onIncrease}>
          <Ionicons name="add-circle" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
    <TouchableOpacity className="ml-2 p-2" onPress={onRemove}>
      <Ionicons name="trash-sharp" size={24} color="black" />
    </TouchableOpacity>
  </View>
);

export default CartCard;
