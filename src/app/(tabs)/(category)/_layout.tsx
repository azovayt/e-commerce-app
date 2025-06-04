import React from "react";
import { Stack } from "expo-router";

const CategoryLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="product-types/[product-type]" />
      <Stack.Screen name="products/[product]" />
      <Stack.Screen name="subcategories/[subcategory]" />
      <Stack.Screen name="product-details/[id]" />
    </Stack>
  );
};

export default CategoryLayout;
