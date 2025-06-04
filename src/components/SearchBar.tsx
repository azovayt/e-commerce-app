import React from "react";
import { TextInput, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// SearchBar prop'ları
interface SearchBarProps {
  placeholder?: string; // Varsayılan metin
  onSearch?: (text: string) => void; // Yazı değiştiğinde
  onSubmit?: (text: string) => void; // Arama onaylandığında
  value?: string; // Arama çubuğu içeriği
  onClear?: () => void; // Temizleme
  onFocus?: () => void; // Odaklanma
}

// Arama çubuğu bileşeni
const SearchBar = ({
  placeholder = "Ürün ara", // Varsayılan placeholder
  onSearch, // Yazı değiştiğinde
  onSubmit, // Arama onaylandığında
  value, // Arama çubuğu içeriği
  onClear, // Temizleme fonksiyonu
  onFocus, // Odaklanma fonksiyonu
}: SearchBarProps) => {
  return (
    <View className="flex-col items-center py-2 border-b border-gray-200 w-full bg-white">
      <View className="flex-row items-center bg-gray-100 rounded-md h-12 w-[95%] px-4 mb-1">
        {/* Sol başta arama ikonu */}
        <Ionicons name="search" size={20} color="#000" className="mr-2" />
        {/* Ana metin giriş alanı */}
        <TextInput
          className="flex-1 font-light text-base text-black"
          placeholder={placeholder}
          placeholderTextColor="#000"
          onChangeText={onSearch}
          value={value}
          returnKeyType="search"
          onSubmitEditing={() => {
            if (value && onSubmit) {
              onSubmit(value); // Enter tuşuna basınca arama yap
            }
          }}
          onFocus={onFocus}
          autoCorrect={true}
          autoCapitalize="none"
          keyboardType="default"
          multiline={false}
        />
        {/* Sağda arama kutusu doluysa temizleme butonu */}
        {value ? (
          <TouchableOpacity onPress={onClear}>
            <Ionicons
              name="close-circle"
              size={20}
              color="#000"
              className="ml-2"
            />
          </TouchableOpacity>
        ) : null}
        {/* Sağda arama butonu (her zaman) */}
        <TouchableOpacity
          onPress={() => {
            if (value && onSubmit) {
              onSubmit(value);
            }
          }}
        >
          <Ionicons name="search" size={20} color="#000" className="ml-2" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBar;
