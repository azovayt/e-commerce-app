import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

interface ProfileCardProps {
  user: {
    username?: string;
    email?: string;
    firstname?: string;
    lastname?: string;
    gender?: string;
    birthdate?: string;
    address?: string;
    images?: { url: string }[];
  };
  onLogout: () => void;
}

const ProfileCard = ({ user, onLogout }: ProfileCardProps) => (
  <View className="bg-white px-6 py-8 items-center">
    <View className="w-24 h-24 rounded-full border-4 border-gray-200 overflow-hidden mb-4 shadow">
      <Image
        source={{ uri: user?.images?.[0]?.url }}
        className="w-full h-full"
        resizeMode="cover"
      />
    </View>
    <Text className="text-2xl font-bold text-gray-800 mb-1">
      {user.firstname || ""} {user.lastname || ""}
    </Text>
    <Text className="text-gray-500 text-base mb-3">
      @{user.username || "Belirtilmemiş"}
    </Text>
    <View className="w-full bg-gray-100 rounded-xl px-4 py-2 mb-2">
      <Text className="text-xs text-black font-semibold">E-Posta</Text>
      <Text className="text-base text-gray-800">{user.email || "-"}</Text>
    </View>
    <View className="w-full flex-row gap-4 mb-2">
      <View className="flex-1 bg-gray-100 rounded-xl px-3 py-2 items-center">
        <Text className="text-xs text-black font-semibold">Cinsiyet</Text>
        <Text className="text-base text-gray-800">{user.gender || "-"}</Text>
      </View>
      <View className="flex-1 bg-gray-100 rounded-xl px-3 py-2 items-center">
        <Text className="text-xs text-black font-semibold">Doğum Tarihi</Text>
        <Text className="text-base text-gray-800">{user.birthdate || "-"}</Text>
      </View>
    </View>
    <View className="w-full bg-gray-100 rounded-xl px-4 py-2 mb-4">
      <Text className="text-xs text-black font-semibold">Adres</Text>
      <Text className="text-base text-gray-800">{user.address || "-"}</Text>
    </View>
    <TouchableOpacity
      className="w-full bg-red-500 py-3 rounded-xl mt-2"
      onPress={onLogout}
      activeOpacity={0.85}
    >
      <Text className="text-white text-base text-center font-bold tracking-wide">
        Çıkış Yap
      </Text>
    </TouchableOpacity>
  </View>
);

export default ProfileCard;
