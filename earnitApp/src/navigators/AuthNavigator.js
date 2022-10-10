import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignupScreen from "../screens/auth/SignupScreen";
import SigninScreen from "../screens/auth/SigninScreen";

const AuthNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteParams="Signin"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Signin" component={SigninScreen} />

      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
