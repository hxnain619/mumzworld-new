import { Redirect } from 'expo-router';
import React from 'react';

// Define the NotFoundScreen component, representing a 404 error screen
export default function NotFoundScreen() {
  // Redirect to the home page whenever a route is not found
  return <Redirect href={'/'} />;
}
