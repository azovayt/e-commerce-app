import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text } from "react-native";

const TabsRootLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#000000",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#ffffff",
          height: 90,
        },
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Anasayfa",
          headerShown: false,
          tabBarLabel: ({ focused, color }) => (
            <Text
              className={`text-xs ${
                focused ? "font-bold" : "font-light"
              } ${color}`}
            >
              Anasayfa
            </Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(category)"
        options={{
          title: "Kategori",
          headerShown: false,
          tabBarLabel: ({ focused, color }) => (
            <Text
              className={`text-xs ${
                focused ? "font-bold" : "font-light"
              } ${color}`}
            >
              Kategori
            </Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "search-circle" : "search-circle-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Sepet",
          headerShown: false,
          tabBarLabel: ({ focused, color }) => (
            <Text
              className={`text-xs ${
                focused ? "font-bold" : "font-light"
              } ${color}`}
            >
              Sepet
            </Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "bag" : "bag-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favoriler",
          headerShown: false,
          tabBarLabel: ({ focused, color }) => (
            <Text
              className={`text-xs ${
                focused ? "font-bold" : "font-light"
              } ${color}`}
            >
              Favoriler
            </Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: "Profil",
          headerShown: false,
          tabBarLabel: ({ focused, color }) => (
            <Text
              className={`text-xs ${
                focused ? "font-bold" : "font-light"
              } ${color}`}
            >
              Profil
            </Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsRootLayout;
