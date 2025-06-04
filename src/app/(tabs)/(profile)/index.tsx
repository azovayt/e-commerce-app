import React, { useEffect } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuth from "../../../../src/hooks/useAuth";
import CustomHeader from "../../../components/CustomHeader";
import LoginCard from "../../../components/LoginCard";
import { Text, TouchableOpacity } from "react-native";

const ProfileScreen = () => {
  const { login, data, loading, error } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      const checkAuth = async () => {
        try {
          const token = await AsyncStorage.getItem("jwt");
          if (token) {
            router.replace("/(tabs)/(profile)/profile-details/[p-id]");
          }
        } catch (error) {
          console.error("Login: Session control error:", error);
        }
      };
      checkAuth();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      router.replace("/(tabs)/(profile)/profile-details/[p-id]");
    }
  }, [data]);

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <CustomHeader title="Giriş Yap / Üye Ol" />
      <LoginCard
        onLogin={async (email, password) => {
          await login({ identifier: email, password });
        }}
        loading={loading}
        error={
          error
            ? "Giriş başarısız. Lütfen bilgilerinizi kontrol edin."
            : undefined
        }
      />
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;
