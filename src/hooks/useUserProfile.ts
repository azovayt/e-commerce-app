import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Kullanıcı profili için beklenen veri yapısı
interface UserProfileData {
  id: number;
  username: string;
  email: string;
  // useApi'deki normalleştirme mantığına uygun olarak 'images' dizisi bekliyoruz
  images?: Array<{ url: string; name?: string }>;
  // Diğer kullanıcı alanlarını buraya ekleyebilirsiniz (örn: documentId, confirmed vb.)
  [key: string]: any; // Esneklik için diğer dinamik alanlar
}

interface UseUserProfileReturn {
  user: UserProfileData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>; // Kullanıcı verisini manuel olarak yeniden çekmek için
}

const PUBLIC_URL = process.env.EXPO_PUBLIC_URL; // Strapi adresinizi .env'den alıyoruz

const useUserProfile = (): UseUserProfileReturn => {
  const [user, setUser] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Kullanıcının JWT token'ını tutmak için bir state
  const [jwtToken, setJwtToken] = useState<string | null>(null);

  // JWT token'ını AsyncStorage'dan çekmek için bir useEffect
  useEffect(() => {
    const getJwt = async () => {
      const token = await AsyncStorage.getItem("jwt");
      setJwtToken(token);
      // Eğer token yoksa ve daha önce kullanıcı bilgisi set edilmemişse
      if (!token && !user) {
        setLoading(false);
        setError("Kullanıcı token'ı bulunamadı. Lütfen giriş yapın.");
      }
    };
    getJwt();
  }, []); // Sadece bir kez çalışır

  // Kullanıcı profil verisini API'den çeken ana fonksiyon
  const fetchUserProfile = async () => {
    if (!jwtToken) {
      // JWT token yoksa API isteği göndermeye gerek yok
      setLoading(false);
      // setError("Giriş yapılmamış. Profil bilgileri çekilemiyor."); // Zaten yukarıda set edilmiş olabilir
      return;
    }

    setLoading(true);
    setError(null); // Yeni istek öncesi hatayı temizle

    try {
      const url = `${PUBLIC_URL}/api/users/me?populate=image`; // Sadece 'image' alanını populate ediyoruz

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`, // JWT token'ı Authorization başlığı olarak gönder
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage =
          errorData.error?.message || `HTTP hatası! Durum: ${response.status}`;
        throw new Error(errorMessage);
      }

      const rawUserData = await response.json(); // API'den gelen doğrudan kullanıcı objesi

      // Veriyi normalize etme (useApi'nizdeki mantığa benzer)
      // 'image' alanını 'images' dizisine çeviriyoruz
      let normalizedImages: Array<{ url: string; name?: string }> = [];
      if (
        rawUserData.image &&
        typeof rawUserData.image === "object" &&
        rawUserData.image.url
      ) {
        normalizedImages = [
          {
            url: rawUserData.image.url.startsWith("http")
              ? rawUserData.image.url
              : `${PUBLIC_URL}${rawUserData.image.url}`,
            name: rawUserData.image.name,
          },
        ];
      }

      const processedUser: UserProfileData = {
        id: rawUserData.id,
        firstname: rawUserData.firstname,
        lastname: rawUserData.lastname,
        gender: rawUserData.gender,
        birthdate: rawUserData.birthdate,
        address: rawUserData.address,
        username: rawUserData.username,
        email: rawUserData.email,
        images: normalizedImages,
        // Diğer dinamik alanları buraya ekleyebilirsiniz
        ...rawUserData, // Gelen tüm diğer alanları dahil et
      };

      setUser(processedUser);
      // AsyncStorage'a da güncel profil verisini kaydedebiliriz (isteğe bağlı)
      await AsyncStorage.setItem("user", JSON.stringify(processedUser));
    } catch (err: any) {
      console.error("useUserProfile: Profil verisi çekme hatası:", err);
      setError(err.message || "Profil verisi yüklenirken bir hata oluştu.");
      setUser(null); // Hata durumunda kullanıcıyı sıfırla
    } finally {
      setLoading(false);
    }
  };

  // JWT token değiştiğinde veya manuel refetch çağrıldığında profili çek
  useEffect(() => {
    if (jwtToken) {
      // Sadece token varsa fetch işlemini tetikle
      fetchUserProfile();
    }
  }, [jwtToken]); // jwtToken değiştiğinde yeniden çek

  return { user, loading, error, refetch: fetchUserProfile }; // refetch fonksiyonunu dışa aktarıyoruz
};

export default useUserProfile;
