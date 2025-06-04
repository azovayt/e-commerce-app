import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import useUserProfile from "../../../../hooks/useUserProfile";
import CustomHeader from "../../../../components/CustomHeader";
import ProfileCard from "../../../../components/ProfileCard";

const ProfileDetailsScreen = () => {
  const { user, loading, error } = useUserProfile();

  useEffect(() => {
    if (error) {
      if (
        error.includes("401") ||
        error.includes("403") ||
        error.includes("Unauthorized") ||
        error.includes("Forbidden") ||
        error.includes("token'ı bulunamadı")
      ) {
        handleLogout();
      }
    }
  }, [error]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("jwt");
      await AsyncStorage.removeItem("user");
      router.push("/(tabs)/(profile)/");
    } catch (logoutError) {
      // Hata yönetimi
    }
  };

  return (
    <View className="flex-1 bg-white">
      <CustomHeader title="Profil" />
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      ) : error && !user ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-600">
            Profil yüklenirken bir sorun oluştu: {error}
          </Text>
        </View>
      ) : user ? (
        <View className="flex-1">
          <ProfileCard user={user} onLogout={handleLogout} />
        </View>
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-600">Kullanıcı bulunamadı.</Text>
        </View>
      )}
    </View>
  );
};

export default ProfileDetailsScreen;
