import React from "react";
import { Image, StyleSheet, Platform } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Homepage from "../screens/Homepage";
import Favourites from "../screens/Favourites";
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName="HomePage"
            screenOptions={{
                headerShown: false,
                tabBarStyle: { backgroundColor: '#FFF', borderTopWidth:0, height: Platform.OS === 'ios' ? 107 : 70},
                tabBarLabelStyle: {fontSize: 14, fontWeight: '200'},
                tabBarActiveTintColor: '#000',
                tabBarInactiveTintColor: '#737373',
                tabBarHideOnKeyboard: true,
                unmountOnBlur: true
            }}
            >
                <Tab.Screen name="HomePage" 
                    component={Homepage} 
                    options={{
                    tabBarLabel: 'All Cats ',
                    tabBarIcon: ({focused, color, size}) => (
                        <FontAwesome5 name="cat" size={30} color={color} />
                    ),
                    tabBarLabelStyle: {
                        fontSize: 14
                }
                }}/>
                <Tab.Screen name="Favourites" 
                    component={Favourites} 
                    options={{
                    tabBarLabel: 'Cats I Like',
                    tabBarIcon: ({color, size}) => (
                        <MaterialIcons name="favorite" size={30} color={color} />
                    ),
                    tabBarLabelStyle: {
                        fontSize: 14
                }
                }}/>
            </Tab.Navigator>
        </NavigationContainer>
      );
}

export default BottomTabNavigator;