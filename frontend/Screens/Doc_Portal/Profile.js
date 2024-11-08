import React, { useEffect, useState } from 'react';
import { View, Text,Image } from 'react-native';
import i18n from '../../langauges/i18n';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-native-paper';

const Profile = () => {

    const{t}=useTranslation();

    const switchlanguage=(language)=>{
        i18n.changeLanguage(language);
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
            <Text> {t('welcome_message')}</Text>
            <Button mode="contained" onPress={() => switchlanguage('en')}>English</Button>
            <Button mode="contained" onPress={() => switchlanguage('ta')}>Tamil</Button>
        </View>
    );
}

export default Profile;
