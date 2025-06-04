/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        // 'sans' artık doğrudan Nunito'yu işaret edecek
        // Bu, herhangi bir font sınıfı belirtilmediğinde Nunito'nun kullanılmasını sağlar.
        sans: [
          "Nunito_400Regular", // Varsayılan Nunito (eğer sadece font-sans yazılırsa uygulanacak)
          {
            fontStyle: "normal", // Normal (düz) varyantlar için
            fontWeight: {
              200: "Nunito_200ExtraLight", // font-extralight
              300: "Nunito_300Light", // font-light
              400: "Nunito_400Regular", // font-normal
              500: "Nunito_500Medium", // font-medium
              600: "Nunito_600SemiBold", // font-semibold
              700: "Nunito_700Bold", // font-bold
              800: "Nunito_800ExtraBold", // font-extrabold
              900: "Nunito_900Black", // font-black
            },
          },
          {
            fontStyle: "italic", // İtalik varyantlar için
            fontWeight: {
              200: "Nunito_200ExtraLight_Italic",
              300: "Nunito_300Light_Italic",
              400: "Nunito_400Regular_Italic",
              500: "Nunito_500Medium_Italic",
              600: "Nunito_600SemiBold_Italic",
              700: "Nunito_700Bold_Italic",
              800: "Nunito_800ExtraBold_Italic",
              900: "Nunito_900Black_Italic",
            },
          },
        ],
        // Artık 'nunito' diye ayrı bir anahtar tanımlamanıza gerek yok,
        // çünkü 'sans' tamamen Nunito'yu temsil ediyor.
        // Eğer ileride başka bir font eklemek isterseniz,
        // onu 'my-other-font' gibi yeni bir anahtar altında tanımlayabilirsiniz.
      },
    },
  },
  plugins: [],
};
