import React from "react";
import { View, Text } from "react-native";

// Error message bileşeni için props tipi
interface ErrorMessageProps {
  message: string; // Gösterilecek hata mesajı
}

// Hata mesajı bileşeni
const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <View className="flex-1 justify-center items-center bg-red-50">
    <Text className="text-red-600 text-base font-semibold text-center mx-4">
      {message}
    </Text>
  </View>
);

export default ErrorMessage;
