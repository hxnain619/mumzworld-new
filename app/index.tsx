import React, { useLayoutEffect } from 'react';
import tw from 'twrnc';

import { Link, useNavigation } from 'expo-router';
import { Text, View } from 'react-native';

export default function WelcomePage() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Home',
    });
  }, [navigation]);

  return (
    <View
      style={tw` flex justify-center h-full items-center mx-auto my-0 p-6 text-center`}
    >
      <Text>Welcome to mumzworld</Text>
      <Link
        style={tw`bg-blue-400 rounded-full p-2 text-center text-white mt-2`}
        href="/categories"
      >
        Go to Categories
      </Link>
    </View>
  );
}
