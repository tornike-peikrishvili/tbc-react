import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: {
        // header
        home: "Home",
        contact: "Contact",
        about: "About",
        blog: "Blog",
        profile: "Profile",
        logOut: "Log Out",
        products: "Products",
        // Main Page
        ourProduct: "Our Products",
        search: "Search Product",
        filter: "Filters",
        readMore: "Read More",
        //Footer
        legal: "Legal",
        terms: "Terms & Conditions",
        Privacy: "Privacy Policy",
        subscribeNews: "Subscribe to our Newsletter",
        subscribe: "Subscribe",
        rights: "© 2024 Tornike. All rights reserved.",
        footerMail: "Enter Your Email",
      },
    },
    ka: {
      translation: {
        // header
        home: "მთავარი",
        contact: "კონტაქტი",
        about: "ჩვენს შესახებ",
        blog: "ბლოგი",
        profile: "პროფილი",
        logOut: "გასვლა",
        products: "პროდუქტები",
        // Main Page
        ourProduct: "ჩვენი პროდუქტები",
        search: "პროდუქტის ძიება",
        filter: "გაფილტვრა",
        readMore: "ნახე მეტი",
        //Footer
        legal: "ლეგალური",
        terms: "წესები და პირობები",
        Privacy: "კონფიდენციალურობა",
        subscribeNews: "გამოიწერეთ ჩვენი სიახლეები",
        subscribe: "გამოწერა",
        rights: "© 2024 Tornike. ყველა უფლება დაცულია.",
        footerMail: "ჩაწერეთ თქვენი ელ-ფოსტა",
      },
    },
  },
});

export default i18n;
