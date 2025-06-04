import React from "react";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import "../../global.css";
import * as SplashScreen from "expo-splash-screen";
import { useAppFonts } from "../hooks/useAppFonts";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartProvider } from "../context/CartContext";
import { FavoritesProvider } from "../context/FavoritesContext";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <CartProvider>
      <FavoritesProvider>
        <SafeAreaView className="flex-1 bg-white">
          <StatusBar style="auto" />
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="search" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaView>
      </FavoritesProvider>
    </CartProvider>
  );
};

export default RootLayout;
