import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import CustomHeader from "../../components/CustomHeader";
import { useRouter } from "expo-router";
import { useCart } from "../../context/CartContext";
import CartCard from "../../components/CartCard";

const CartScreen = () => {
  const router = useRouter();
  const { cart, changeQuantity, removeFromCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 1),
    0
  );

  return (
    <View className="flex-1 bg-white">
      <CustomHeader title="Sepet" onBackPress={() => router.back()} />

      <ScrollView className="flex-1 px-4 pt-2">
        <Text className="font-nunito font-bold text-lg mb-2">
          Sipariş Özeti
        </Text>
        {cart.length === 0 ? (
          <View className="flex-1 items-center justify-center mt-16">
            <Text className="text-gray-400 font-nunito">
              Sepetinizde ürün yok.
            </Text>
          </View>
        ) : (
          cart.map((item) => (
            <CartCard
              key={item.id}
              name={item.name}
              price={item.price}
              quantity={item.quantity || 1}
              imageUrl={item.images[0]?.url}
              onIncrease={() => changeQuantity(item.id, 1)}
              onDecrease={() => changeQuantity(item.id, -1)}
              onRemove={() => removeFromCart(item.id)}
            />
          ))
        )}
      </ScrollView>

      <View className="px-4 py-3 border-t border-gray-200">
        <View className="flex-row justify-between mb-2">
          <Text className="font-nunito text-base text-gray-600">Toplam</Text>
          <Text className="font-nunito font-bold text-lg text-gray-900">
            ₺{total.toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity className="bg-black py-3 rounded-xl mt-2 w-full">
          <Text className="text-white text-center font-nunito font-bold text-base">
            Satın Al
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;
