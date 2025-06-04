import { useState, useEffect } from "react";

interface ApiResponse<T> {
  data: T[];
}

interface FetchOptions {
  dependencies?: any[];
  populate?: string | string[];
  filters?: Record<string, any>;
  fields?: string[];
}

const useApi = <T>(endpoint: string, options: FetchOptions = {}) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const PUBLIC_URL = process.env.EXPO_PUBLIC_URL;

  // Filtreleri işlemek için yardımcı fonksiyon
  const buildFilterParams = (
    filters: Record<string, any>,
    prefix: string,
    queryParams: URLSearchParams
  ) => {
    Object.entries(filters).forEach(([key, value]) => {
      // String tabanlı filtreler, örneğin: [category][slug][$eq]
      if (key.startsWith("[")) {
        queryParams.append(`${prefix}${key}`, value);
      }
      // Nested obje, örneğin: { category: { slug: "kadin" } }
      else if (typeof value === "object" && value !== null) {
        buildFilterParams(value, `${prefix}[${key}]`, queryParams);
      }
      // Basit değer, örneğin: slug: "kadin"
      else {
        queryParams.append(`${prefix}[${key}]`, value);
      }
    });
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      let url = `${PUBLIC_URL}/api/${endpoint}`;
      const queryParams = new URLSearchParams();

      // fields parametrelerini ekleme
      if (options.fields) {
        options.fields.forEach((field, index) => {
          queryParams.append(`fields[${index}]`, field);
        });
      }

      // populate parametresini ekleme
      if (options.populate) {
        if (Array.isArray(options.populate)) {
          options.populate.forEach((pop, index) => {
            queryParams.append(`populate[${index}]`, pop);
          });
        } else {
          queryParams.append("populate", options.populate);
        }
      }

      // filters parametrelerini ekleme
      if (options.filters) {
        buildFilterParams(options.filters, "filters", queryParams);
      }

      if (queryParams.toString()) {
        url += `?${queryParams.toString()}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP hatası! Durum: ${response.status}, Mesaj: ${JSON.stringify(
            errorData
          )}`
        );
      }

      const rawData: ApiResponse<any> = await response.json();

      if (!rawData || !Array.isArray(rawData.data)) {
        throw new Error(
          'API yanıtı beklenen formatta değil veya "data" dizisi yok.'
        );
      }

      // Veriyi normalleştirme
      const fetchedData = rawData.data
        .map((item: any) => {
          const attributes = item.attributes || item;

          if (!attributes.name || !attributes.slug) {
            console.warn(
              'Öğenin "name" veya "slug" özelliği eksik:',
              attributes
            );
            return null;
          }

          // Çoklu/tekli resim desteği
          let images: Array<{ url: string; name?: string }> = [];
          if (
            options.populate &&
            (Array.isArray(options.populate)
              ? options.populate.includes("image")
              : options.populate === "image")
          ) {
            if (Array.isArray(attributes.image)) {
              images = attributes.image
                .filter((img: any) => img && img.url)
                .map((img: any) => ({
                  url: img.url.startsWith("http")
                    ? img.url
                    : `${PUBLIC_URL}${img.url}`,
                  name: img.name,
                }));
            } else if (attributes.image?.data?.attributes?.url) {
              images = [
                {
                  url: attributes.image.data.attributes.url.startsWith("http")
                    ? attributes.image.data.attributes.url
                    : `${PUBLIC_URL}${attributes.image.data.attributes.url}`,
                  name: attributes.image.data.attributes.name,
                },
              ];
            } else if (
              typeof attributes.image === "object" &&
              attributes.image?.url
            ) {
              images = [
                {
                  url: attributes.image.url.startsWith("http")
                    ? attributes.image.url
                    : `${PUBLIC_URL}${attributes.image.url}`,
                  name: attributes.image.name,
                },
              ];
            } else {
              console.warn(
                `Resim verisi eksik (Öğe: ${attributes.name}):`,
                attributes.image
              );
            }
          }

          // Kategori desteği
          let category: { id: number; name: string; slug?: string } | null =
            null;
          if (
            options.populate &&
            (Array.isArray(options.populate)
              ? options.populate.includes("category")
              : options.populate === "category")
          ) {
            if (attributes.category?.data?.attributes) {
              // Strapi'nin klasik populate ilişkisi
              category = {
                id: attributes.category.data.id,
                name: attributes.category.data.attributes.name,
                slug: attributes.category.data.attributes.slug,
              };
            } else if (
              attributes.category &&
              typeof attributes.category === "object" &&
              typeof attributes.category.id !== "undefined" &&
              typeof attributes.category.name === "string"
            ) {
              // Strapi'den düz obje geldi
              category = {
                id: attributes.category.id,
                name: attributes.category.name,
                slug: attributes.category.slug,
              };
            } else if (attributes.category == null) {
              category = null;
            } else {
              // Sadece gerçekten eksikse uyarı ver
              console.warn(
                `Kategori verisi eksik (Öğe: ${attributes.name}):`,
                attributes.category
              );
            }
          }

          // Dinamik alanlar
          const dynamicFields: Record<string, any> = {};
          if (options.fields) {
            options.fields.forEach((field) => {
              if (field !== "name" && field !== "slug" && attributes[field]) {
                dynamicFields[field] = attributes[field];
              }
            });
          }

          // Düzenlenmiş veri
          return {
            id: item.id,
            name: attributes.name,
            slug: attributes.slug,
            ...dynamicFields,
            images,
            category,
          } as unknown as T & {
            images: Array<{ url: string; name?: string }>;
            category: { id: number; name: string; slug?: string } | null;
          };
        })
        .filter((item: T | null) => item !== null) as T[];

      setData(fetchedData);
    } catch (err: any) {
      console.error("Veri yükleme hatası:", err);
      setError(`Veriler yüklenirken bir hata oluştu: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint, PUBLIC_URL, ...(options.dependencies || [])]);

  return { data, loading, error, refetch: fetchData };
};

export default useApi;
