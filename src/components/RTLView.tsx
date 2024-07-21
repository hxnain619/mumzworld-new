import { loadLanguage } from '@api/languageStorage';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import tailwind from 'twrnc';

export default function RTLView({
  style,
  children,
}: {
  style?: any;
  children: React.JSX.Element;
}) {
  const [lang, setLanguage] = useState('en');

  useEffect(() => {
    loadLanguage().then((lang) => {
      setLanguage(lang);
    });
  }, []);

  return (
    <View
      style={[
        tailwind`flex ${lang === 'en' ? 'flex-row' : 'flex-row-reverse'}`,
        style,
      ]}
    >
      {children}
    </View>
  );
}
