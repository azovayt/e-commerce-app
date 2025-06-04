import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PUBLIC_URL = process.env.EXPO_PUBLIC_URL;

// API’den dönen yanıtın yapısını tanımlayan bir arayüz.
// data: Kullanıcı bilgileri (örneğin, kullanıcı adı, email).
// loading: Giriş işlemi devam ediyor mu?
// error: Hata varsa, hata mesajı.
interface AuthResponse {
  data: any[];
  loading: boolean;
  error: string | null;
}

// Giriş için gerekli bilgileri tanımlayan bir arayüz.
// identifier: Kullanıcı adı veya email.
// password: Şifre.
interface LoginCredentials {
  identifier: string;
  password: string;
}

// useAuth: Kullanıcı girişi işlemlerini yöneten bir React hook’u.
const useAuth = () => {
  // data: Giriş yapan kullanıcının bilgilerini saklar (başta boş bir dizi).
  const [data, setData] = useState<any[]>([]);
  // loading: Giriş işlemi devam ederken true, bittiğinde false.
  const [loading, setLoading] = useState(false);
  // error: Hata olursa mesajı saklar (başta null, yani hata yok).
  const [error, setError] = useState<string | null>(null);

  // login: Kullanıcı girişi yapan asenkron fonksiyon.
  // credentials: Kullanıcı adı/email ve şifre içerir.
  const login = async (credentials: LoginCredentials) => {
    // Eğer kullanıcı adı/email veya şifre boşsa, hata mesajı gösteririz ve işlemi durdururuz.
    if (!credentials.identifier || !credentials.password) {
      setError("Email/Kullanıcı adı ve şifre gerekli!");
      return;
    }

    // Giriş işlemi başlarken yükleniyor durumunu true yaparız.
    setLoading(true);
    try {
      // Strapi’nin giriş API’sine istek göndereceğimiz adres.
      // Örnek: /api/auth/local
      const url = `${PUBLIC_URL}/api/auth/local`;

      // fetch ile POST isteği gönderiyoruz.
      // method: POST, çünkü giriş için veri gönderiyoruz.
      // headers: Veri formatının JSON olduğunu söylüyoruz.
      // body: Kullanıcı adı/email ve şifreyi JSON formatına çevirip gönderiyoruz.
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      // Eğer yanıt başarılı değilse (mesela 401, yanlış şifre), hata fırlatırız.
      if (!response.ok) {
        // Hata mesajını API’den alıyoruz.
        const errorResult = await response.json();
        // Varsayılan hata mesajı, eğer özel bir mesaj yoksa.
        let errorMessage = `Giriş başarısız: ${
          errorResult.error?.message || "Bilinmeyen hata"
        }`;
        // Eğer API detaylı hata mesajları döndürüyorsa, bunları birleştiriyoruz.
        if (errorResult.error?.details?.errors) {
          errorMessage = errorResult.error.details.errors
            .map((err: any) => err.message)
            .join(", ");
        }
        throw new Error(errorMessage);
      }

      // API’den gelen yanıtı JSON’a çeviriyoruz.
      // Strapi genelde { jwt: "token", user: { id, username, email } } döner.
      const result = await response.json();

      // JWT token’ını (kimlik doğrulama için) telefona kaydediyoruz.
      await AsyncStorage.setItem("jwt", result.jwt);
      // Kullanıcı bilgilerini (mesela isim, email) JSON formatında telefona kaydediyoruz.
      await AsyncStorage.setItem("user", JSON.stringify(result.user));
      // Kullanıcı bilgilerini state’e kaydediyoruz (dizi içinde, çünkü useApi ile uyumlu).
      setData([result.user]);
      // Hata varsa sıfırlıyoruz.
      setError(null);
    } catch (err: unknown) {
      // Hata olursa konsola yazıyoruz ve hata mesajını state’e kaydediyoruz.
      console.error("useAuth: Hata:", err);
      // Hata bir Error nesnesi mi? Öyleyse mesajını al, değilse genel bir hata yaz.
      setError(err instanceof Error ? err.message : "Bilinmeyen hata");
    } finally {
      // İşlem bittiğinde (başarılı veya başarısız), yükleniyor durumunu kapatıyoruz.
      setLoading(false);
    }

    // Giriş işleminin sonucunu döndürüyoruz: veri, yüklenme durumu ve hata.
    return { data, loading, error };
  };

  // login: Giriş işlemini başlatan fonksiyon.
  // data: Giriş yapan kullanıcının bilgileri.
  // loading: Giriş işlemi devam ediyor mu?
  // error: Hata mesajı (varsa).
  return { login, data, loading, error };
};

// Hook’u dışa aktarıyoruz ki diğer dosyalarda kullanılabilsin.
export default useAuth;
