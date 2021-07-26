import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Meteor from "./screens/meteor";
import Home from "./screens/home";
import Iss from "./screens/issLocator";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Meteor" component={Meteor} />
        <Stack.Screen name="IssTracker" component={Iss} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
