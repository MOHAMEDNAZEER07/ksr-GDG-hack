import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
// import { LinearGradient } from "expo-linear-gradient"; // Ensure you have this package installed

const Login = ({ navigation }) => {
    return (
       
        <View
        style={styles.container}
        >
            <Text style={styles.title}>You Are?</Text>
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={styles.button1}
                    onPress={() => navigation.navigate('Login1')}
                >
                    <Text style={styles.buttonText}>Farmer 👨‍🌾</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button2}
                    onPress={() => navigation.navigate('Vet_Tabs')}
                >
                    <Text style={styles.buttonText}>Veterinarian 🐾</Text>
                </TouchableOpacity>
            </View>
            </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#D1E9F6'
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#295F98',
        marginBottom: 50,
        textAlign: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button1: {
        backgroundColor: '#295F98',
        margin:10,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        elevation: 5,
    },
    button2: {
        margin:10,
        backgroundColor: '#295F98',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
