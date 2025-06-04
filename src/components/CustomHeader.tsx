import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CustomHeaderProps {
  title?: string;
  onBackPress?: () => void;
  logo?: boolean;
  rightButtonText?: string;
  onRightPress?: () => void;
}

const CustomHeader = ({
  title,
  onBackPress,
  logo,
  rightButtonText,
  onRightPress,
}: CustomHeaderProps) => {
  return (
    <View className="flex-row items-center justify-between px-4 h-14 bg-white border-b border-gray-200">
      {/* Sol: Geri Butonu */}
      <View className="w-10 justify-center items-start">
        {onBackPress && (
          <TouchableOpacity
            onPress={onBackPress}
            className="p-2"
            accessibilityRole="button"
            accessibilityLabel="Geri"
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
        )}
      </View>

      {/* Orta: Başlık veya Logo */}
      <View className="flex-1 justify-center items-center">
        {logo ? (
          <Image
            source={require("../../assets/e-commerce-app.png")}
            className="w-48 h-10"
            resizeMode="contain"
          />
        ) : (
          <Text
            className="text-xl font-normal text-black text-center"
            numberOfLines={1}
          >
            {title}
          </Text>
        )}
      </View>

      {/* Sağ: Sağ Buton */}
      <View className="w-10 justify-center items-end">
        {rightButtonText && onRightPress && (
          <TouchableOpacity
            onPress={onRightPress}
            className="p-2"
            accessibilityRole="button"
            accessibilityLabel={rightButtonText}
          >
            <Text className="text-sm font-medium text-black">
              {rightButtonText}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomHeader;
