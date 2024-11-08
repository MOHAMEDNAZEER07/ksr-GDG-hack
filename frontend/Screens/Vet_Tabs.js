import { Text, View } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { groups } from '@expo/vector-icons'; // Icons

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import React, { Component } from 'react'
import Profile from "./Doc_Portal/Profile";
import Vet_Docportal from "./Doc_Portal/Vet_Docportal";
const Tab =createBottomTabNavigator();


const Vet_Tabs =()=>{
  return(
      <Tab.Navigator
      screenOptions={({ route }) => ({
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
      tabBarIcon: ({ color, size }) => {
        let iconName;
        switch (route.name) {
          case 'Vet_Docportal':
            iconName = 'home';
            break;
          case 'Profile':
            iconName = 'account-outline';
            break;
          default:
            iconName = 'help';
            break;
        }

        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
      },
      tabBarStyle:{
        backgroundColor:'white'
      }
    })}
  >
      
          <Tab.Screen name="Vet_Docportal" component={Vet_Docportal} options={{headerShown:false}}></Tab.Screen>
          <Tab.Screen name="Profile" component={Profile}></Tab.Screen>
      </Tab.Navigator>
  );
}

export default Vet_Tabs;
