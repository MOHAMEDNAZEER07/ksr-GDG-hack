import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet} from 'react-native';
import Login from './Screens/Login';
import Register from './Screens/Register';
import Maintab from './Screens/Maintab';
import Login1 from './Screens/Home/Login1';
import Signup from './Screens/Home/Signup';
import Vet_Tabs from './Screens/Vet_Tabs';
import BookAppointment from './Screens/Home/Various';
import DoctorAppointments from './Screens/Doc_Portal/Appointments';

const Stack = createStackNavigator();

export default function App() {
  return (
   <NavigationContainer>
    <Stack.Navigator initialRouteName='login'>
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}}></Stack.Screen>
      <Stack.Screen name="Register" component={Register} options={{headerShown:false}}></Stack.Screen>
      <Stack.Screen name="Login1" component={Login1} options={{headerShown:false}}></Stack.Screen>
      <Stack.Screen name="Signup" component={Signup} options={{headerShown:false}}></Stack.Screen>
      <Stack.Screen name="Maintab" component={Maintab} options={{headerShown:false}}></Stack.Screen>
      <Stack.Screen name="Vet_Tabs" component={Vet_Tabs} options={{headerShown:false}}></Stack.Screen>
      <Stack.Screen name="Appointments" component={DoctorAppointments} options={{headerShown:false}}></Stack.Screen>
    </Stack.Navigator>
   </NavigationContainer>
  );
}


