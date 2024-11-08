import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ImageBackground,Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Maintab from '../Maintab';
const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  // Function to handle sign-up and redirect to the home screen
  const handleSignUp = () => {
    navigation.replace('Maintab');
  };

  const navigateToLogin = () => {
    navigation.navigate('Login1');
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require("../icons/background.jpg")} 
        style={styles.backgroundImage}
      >
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
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
          <View style={{ bottom: 90, fontSize: 25, fontWeight: "bold", color: "white" }}>
            <Text style={styles.title}>SignUp</Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />

          <TouchableOpacity 
            onPress={handleSignUp} 
            style={{ justifyContent: 'center', alignItems: 'center', height: 30, width: 200, backgroundColor: '#97E7E1', borderRadius: 20 }}
          >
            <Text>Sign up</Text>
          </TouchableOpacity>

          <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
            <Text style={{ fontSize: 15 }}>Already have an account? </Text>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={navigateToLogin}>
              <Text style={{ color: '#7AA2E3', fontSize: 15 }}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    position: 'absolute',
    bottom: 65,
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
    marginBottom: 20,
    color: 'black',
  },
  input: {
    height: 50,
    width: '100%',
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
