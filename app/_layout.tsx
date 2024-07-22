import React, { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";

import i18n from "@assets/translations/index";
import store from "@store/index";
import { useFonts } from "expo-font";
import {
  NanumGothic_400Regular,
  NanumGothic_700Bold,
  NanumGothic_800ExtraBold,
} from "@expo-google-fonts/nanum-gothic";

import "../tailwind.css";

SplashScreen.preventAutoHideAsync();

export default function () {
  const [loaded, error] = useFonts({
    NanumGothic_400Regular,
    NanumGothic_700Bold,
    NanumGothic_800ExtraBold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

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
