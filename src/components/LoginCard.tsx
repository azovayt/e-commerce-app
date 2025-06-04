import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";

interface LoginCardProps {
  onLogin: (email: string, password: string) => Promise<void>;
  loading: boolean;
  error?: string | null;
  logoSource?: any; // Local image require or remote uri
  footer?: React.ReactNode;
}

const LoginCard = ({ onLogin, loading, error, logoSource }: LoginCardProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      return;
    }
    await onLogin(email, password);
  };

  return (
    <View className="flex-1 justify-center px-8 bg-white">
      <View className="items-center mb-4">
        <Image
          source={
            logoSource ? logoSource : require("../../assets/e-commerce-app.png")
          }
          style={{
            width: 250,
            resizeMode: "contain",
          }}
        />
        <Text className="text-3xl font-extrabold text-slate-900 tracking-wide mb-2">
          Hoş geldiniz!
        </Text>
        <Text className="text-gray-500 text-base">
          Hesabınıza erişmek için oturum açın
        </Text>
      </View>

      <View className="bg-white p-6 rounded-2xl shadow-md space-y-4">
        <View className="mb-4">
          <Text className="font-semibold text-gray-700 mb-1">
            Kullanıcı adı
          </Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Kullanıcı adınızı veya e-postanızı girin"
            autoCapitalize="none"
            keyboardType="email-address"
            className="bg-gray-100 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 w-full"
            placeholderTextColor="#9CA3AF"
            editable={!loading}
          />
        </View>
        <View className="mb-4">
          <Text className="font-semibold text-gray-700 mb-1">Şifre</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Şifrenizi girin"
            secureTextEntry
            className="bg-gray-100 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 w-full"
            placeholderTextColor="#9CA3AF"
            editable={!loading}
          />
        </View>
        <TouchableOpacity
          onPress={handleLogin}
          disabled={loading}
          className={`py-3 mt-2 rounded-xl ${
            loading ? "bg-slate-700" : "bg-slate-900"
          } shadow-md`}
          activeOpacity={0.85}
        >
          <View className="flex-row justify-center items-center">
            {loading && (
              <ActivityIndicator color="white" size="small" className="mr-2" />
            )}
            <Text className="text-white font-extrabold text-lg tracking-wide">
              {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </Text>
          </View>
        </TouchableOpacity>
        {error && (
          <View className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <Text className="text-red-600 text-center text-base font-medium">
              {error}
            </Text>
          </View>
        )}
      </View>
      <View className="mt-6 items-center">
        <Text className="text-gray-400">Hesabınız yok mu?</Text>
        <TouchableOpacity onPress={() => router.push("")} activeOpacity={0.7}>
          <Text className="text-slate-900 font-semibold mt-1">Kayıt Ol</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginCard;
