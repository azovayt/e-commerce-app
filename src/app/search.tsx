import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import SearchBar from "../components/SearchBar";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import CustomHeader from "../components/CustomHeader";
import ErrorMessage from "../components/ui/ErrorMessage";
import ProductCard from "../components/SearchCard";
import useApi from "../hooks/useApi";
import debounce from "lodash.debounce";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";

// Ürün data tipi
interface Product {
  id: number; // Ürün kimliği
  name: string; // Ürün adı
  slug: string; // Ürünün URL-friendly anahtarı
  price: string; // Fiyat
  image?: { url: string }; // Görsel
}

// Arama ekranı bileşeni
const SearchScreen = () => {
  const router = useRouter(); // Sayfa yönlendirme için
  const { query } = useLocalSearchParams(); // URL'den arama parametresi alma

  // SearchBar input'u için state
  const [inputText, setInputText] = useState<string>(
    typeof query === "string" ? query : ""
  );
  // API filter için arama terimi
  const [searchTerm, setSearchTerm] = useState<string>(
    typeof query === "string" ? query : ""
  );
  // Arama geçmişini tutan state
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  // Geçmiş yükleme durumunu gösteren state
  const [historyLoading, setHistoryLoading] = useState<boolean>(false);

  // Debounced search fonksiyonu (gereksiz API çağrısını önler)
  const debouncedSearch = useCallback(
    debounce((text: string) => setSearchTerm(text), 800),
    []
  );

  // API'dan ürünleri çek
  const {
    data: products = [],
    loading,
    error,
  } = useApi<Product>("products", {
    fields: ["name", "slug", "price"],
    populate: "image",
    dependencies: [searchTerm],
    filters: searchTerm ? { "[name][$containsi]": searchTerm } : {},
  });

  // Arama çubuğunda yazınca çalışır
  const handleSearch = (text: string) => {
    setInputText(text); // inputText'i anlık günceller
    debouncedSearch(text); // debounced search ile API'yı tetikler
  };

  // Arama submit edilince (enter veya butona basınca) çalışır
  const handleSearchSubmit = (text: string) => {
    const normalizedText = text;
    if (normalizedText.trim() && normalizedText.length >= 3) {
      setSearchTerm(normalizedText); // arama terimini günceller
      saveSearchHistory(normalizedText); // arama geçmişine ekler
    }
  };

  // Arama çubuğunu temizleme fonksiyonu
  const handleClear = () => {
    setInputText(""); // input'u temizler
    setSearchTerm(""); // aramayı temizler
  };

  // Arama geçmişini kaydeder (AsyncStorage'a)
  const saveSearchHistory = async (term: string) => {
    if (!term.trim() || term.length < 3) return;
    try {
      const history = JSON.parse(
        (await AsyncStorage.getItem("searchHistory")) || "[]"
      );
      const updatedHistory = [
        term,
        ...history.filter((t: string) => t !== term),
      ].slice(0, 4);
      await AsyncStorage.setItem(
        "searchHistory",
        JSON.stringify(updatedHistory)
      );
      setSearchHistory(updatedHistory); // state günceller
    } catch (err) {}
  };

  // Bileşen yüklendiğinde geçmişi yükler
  useEffect(() => {
    (async () => {
      setHistoryLoading(true);
      try {
        const history = JSON.parse(
          (await AsyncStorage.getItem("searchHistory")) || "[]"
        );
        setSearchHistory(history);
      } catch {
        setSearchHistory([]);
      } finally {
        setHistoryLoading(false);
      }
    })();
  }, []);

  // Geçmişi tamamen temizler
  const clearSearchHistory = async () => {
    await AsyncStorage.removeItem("searchHistory");
    setSearchHistory([]);
  };

  // Ürün kartına tıklanınca detay ekranına yönlendirir
  const handleProductPress = (productSlug: string) => {
    router.push({
      pathname: `/(category)/product-details/[id]`,
      params: {
        details: productSlug,
        from: "search",
      },
    });
  };

  // Yükleme durumu gösterilir
  if (loading && !searchTerm) {
    return <LoadingSpinner size="large" color="#2563eb" />;
  }

  // API'dan hata gelirse gösterilir
  if (error) {
    return <ErrorMessage message={error} />;
  }

  // Ana ekran içeriği
  return (
    <View className="flex-1 bg-white">
      <CustomHeader title="Ara" onBackPress={() => router.back()} />
      <SearchBar
        placeholder="Ürün ara"
        onSearch={handleSearch}
        onSubmit={handleSearchSubmit}
        value={inputText}
        onClear={handleClear}
        onFocus={() => {}}
      />
      {searchTerm === "" && searchHistory.length > 0 && !historyLoading && (
        <View className="p-4">
          <View className="flex-row justify-between mb-2">
            <Text className="text-lg font-semibold">Geçmiş Aramalar</Text>
            {/* Geçmişi silme butonu */}
            <TouchableOpacity onPress={clearSearchHistory}>
              <Ionicons name="trash-outline" size={20} color="black" />
            </TouchableOpacity>
          </View>
          {/* Her geçmiş arama için buton */}
          {searchHistory.map((term, index) => (
            <TouchableOpacity key={index} onPress={() => handleSearch(term)}>
              <View className="flex-row items-center">
                <Ionicons name="reload-outline" size={20} color="black" />
                <Text className="text-base font-light text-black mx-2">
                  {term}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {/* Ürün listesi */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            name={item.name}
            imageUrl={item.image?.url}
            price={item.price}
            onPress={() => handleProductPress(item.slug)}
          />
        )}
        ListEmptyComponent={() => (
          <Text className="text-center mt-2 text-gray-600">
            {searchTerm ? "Ürün bulunamadı." : "Arama yapın."}
          </Text>
        )}
        extraData={searchHistory}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
};

export default SearchScreen;
