import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Prediction from './Prediction';
import Herbs from './Herbs';
import Diseases from './Diseases';
import FertilizerCalculator from './Macros';
import BookAppointment from './Various';

const Homestack =createStackNavigator();

const Hometab=()=>{
    return(
        <Homestack.Navigator initialRouteName='Home'>
            <Homestack.Screen name="Home" component={Home}></Homestack.Screen>
            <Homestack.Screen name="Prediction" component={Prediction}></Homestack.Screen>
            <Homestack.Screen name="Fertcalc" component={FertilizerCalculator}></Homestack.Screen>
            <Homestack.Screen name="Herbs" component={Herbs}></Homestack.Screen>
            <Homestack.Screen name="Diseases" component={Diseases}></Homestack.Screen>
            <Homestack.Screen name="Vetrinary" component={BookAppointment}></Homestack.Screen>
        </Homestack.Navigator>
    );
}

export default Hometab;

