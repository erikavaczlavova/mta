import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./pages/Home.js"
import NotHome from "./pages/NotHome"
import Hamburger from "./components/hamburger"

const Stack = createNativeStackNavigator();

export default function App() {
    const [isOn, setIsOn] = useState(false);
    const switchu = () => {
        setIsOn(!isOn);
    };
    return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
                    name="Home"
                    component={Home}
                />
            <Stack.Screen name="NotHome" component={NotHome} />
          </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: "100%"
    },

    but:{
        position: "absolute",
        top: 0,
        left: 0
    }
});