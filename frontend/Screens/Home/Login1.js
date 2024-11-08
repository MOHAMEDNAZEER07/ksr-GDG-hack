import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ImageBackground, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-paper';

const Login1 = () => {
  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const navigation = useNavigation();

  // Function to handle login and redirect to the home screen
  const handleLogin = () => {
    navigation.replace('Maintab');
  };

  const navigateToSignup = () => {
   navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require("../icons/background.jpg")} 
        style={styles.backgroundImage}
      >
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
          <Image 
            style={{ height: 225, width: 90 }} 
            source={require("../icons/light.png")} 
          />
          <Image 
            style={{ height: 165, width: 65 }} 
            source={require("../icons/light.png")} 
          />
        </View>

        <View style={styles.innerContainer}>
          <Card style={{ justifyContent: 'center', alignItems: 'center', height: 400, width: 325, borderRadius: 35 }}>
            <View style={{ top: -50, right: -99, fontSize: 25, fontWeight: "bold" }}>
              <Text style={styles.title}>Login</Text>
            </View>

            <View style={{ top: -30 }}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={Password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
              />
            </View>

            <View style={{ position: 'absolute', right: 48, top: 160 }}>
              <TouchableOpacity 
                onPress={handleLogin} 
                style={{ justifyContent: 'center', alignItems: 'center', height: 30, width: 200, backgroundColor: '#97E7E1', borderRadius: 20 }}
              >
                <Text>Login</Text>
              </TouchableOpacity>

              <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10, left: 20 }}>
                <View>
                  <Text style={{ fontSize: 15 }}>Don't have an account? </Text>
                  <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={navigateToSignup}>
                    <Text style={{ color: '#7AA2E3', fontSize: 15 }}>Sign up</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Card>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    position: 'absolute',
    bottom: 70,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: 'black'
  },
  input: {
    height: 50,
    width: 300,
    borderColor: 'gray',
    borderWidth: 0.5,
    backgroundColor: '#EEEEEE',
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    },
});
