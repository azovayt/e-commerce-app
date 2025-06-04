// src/app/(tabs)/(category)/index.tsx
import React from "react";
import { View, FlatList, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import CustomHeader from "../../../components/CustomHeader";
import SearchBar from "../../../components/SearchBar";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import useApi from "../../../hooks/useApi";
import CategoryCard from "../../../components/CategoryCard";
import ErrorMessage from "../../../components/ui/ErrorMessage";

// Kategori veri yapısını tanımlayan arayüz
interface Category {
  id: number;
  name: string;
  slug: string;
  images: { url: string }[];
}

const CategoryScreen = () => {
  // Router yönlendirmesi için
  const router = useRouter();

  // Kategorileri yaptığım hooks/useApi ile çekmek için
  const {
    data: categories,
    loading,
    error,
  } = useApi<Category>("categories", {
    fields: ["name", "slug"],
    populate: "image",
  });

  // Arama çubuğuna yazıldığında SearchScreen’e yönlendirme
  const handleSearch = (text: string) => {
    router.push({
      pathname: "/search",
      params: { query: text },
    });
  };

  // Arama çubuğuna tıklandığında SearchScreen’e yönlendirme
  const handleSearchBarPress = () => {
    router.push("/search");
  };

  // Kategori seçimini işlemek ve alt kategori ekranına yönlendirme yapamak için
  const handleCategoryPress = (categorySlug: string, categoryName: string) => {
    // Expo Routerın yönlendirme fonksiyonunu kullanarak yeni bir ekrana geçiş yapmak için
    router.push({
      pathname: `/(category)/subcategories/[subcategory]`, // Dinamik rota yolu ([] ile dinamik dosya yapılıyor)
      params: { subcategory: categorySlug, categoryName }, // Rota parametreleri
    });
  };

  // Veri yüklenirken yükleme animasyonu için
  if (loading) {
    return (
      <LoadingSpinner
        size="large"
        color="#2563eb"
        className="flex-1 justify-center"
      />
    );
  }

  // API hatası için
  if (error) {
    return <ErrorMessage message={error} />;
  }

  // Sayfa içerikleri
  return (
    <View className="flex-1 bg-white">
      {/* Özel başlık isteğe göre logo, başlık ve geri butonu aktif edilebilir */}
      <CustomHeader logo={true} />
      {/* Özel search bar */}
      <SearchBar
        placeholder="Ürün ara..."
        onSearch={handleSearch}
        onFocus={handleSearchBarPress} // Tıklandığında yönlendirme
      />
      {/* Render için önerilen flatlist yapısı */}
      <ScrollView>
        {categories.map((item) => (
          <CategoryCard
            key={item.id}
            name={item.name}
            imageUrl={item.images[0]?.url}
            onPress={() => handleCategoryPress(item.slug, item.name)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryScreen;
