import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  //   debug: true,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: {
        home: "Home",
        contact: "Contact",
        about: "About",
        blog: "Blog",
        profile: "Profile",
      },
    },
    ka: {
      translation: {
        home: "მთავარი",
        contact: "კონტაქტი",
        about: "ჩვენს შესახებ",
        blog: "ბლოგი",
        profile: "პროფილი",
      },
    },
  },
});

export default i18n;
