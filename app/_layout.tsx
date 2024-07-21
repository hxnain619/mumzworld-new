import React, { useEffect } from "react";
import { Stack, SplashScreen } from "expo-router";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import i18n from "@assets/translations";
import store from "@store/index";
import { loadLanguage, saveLanguage } from "@api/languageStorage";
import { LanguageType } from "@assets/translations/language";
import "../tailwind.css";

SplashScreen.preventAutoHideAsync();

export default function () {
   useEffect(() => {
      loadLanguage().then(async (lang) => {
         console.log(lang)
         await saveLanguage(lang as LanguageType);
         await SplashScreen.hideAsync()
      });
   }, []);

   return (
      <Provider store={store}>
         <I18nextProvider i18n={i18n}>
            <Stack
               screenOptions={{
                  headerShown: true,
                  animation: "slide_from_bottom",
               }}
            />
         </I18nextProvider>
      </Provider>
   );
}
