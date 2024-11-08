import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function App() {
  const [N, setN] = useState('');
  const [P, setP] = useState('');
  const [K, setK] = useState('');
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [ph, setPh] = useState('');
  const [rainfall, setRainfall] = useState('');
  const [prediction, setPrediction] = useState('');

  const handlePredict = () => {
    const data = {
      N: parseFloat(N),
      P: parseFloat(P),
      K: parseFloat(K),
      temperature: parseFloat(temperature),
      humidity: parseFloat(humidity),
      ph: parseFloat(ph),
      rainfall: parseFloat(rainfall)
    };

    fetch('http://192.168.172.77:5100/cropii', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
      setPrediction(result.prediction);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crop Prediction</Text>

      <TextInput
        style={styles.input}
        placeholder="N"
        value={N}
        onChangeText={setN}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="P"
        value={P}
        onChangeText={setP}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="K"
        value={K}
        onChangeText={setK}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Temperature"
        value={temperature}
        onChangeText={setTemperature}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Humidity"
        value={humidity}
        onChangeText={setHumidity}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="pH"
        value={ph}
        onChangeText={setPh}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Rainfall"
        value={rainfall}
        onChangeText={setRainfall}
        keyboardType="numeric"
      />

      <Button title="Predict Crop" onPress={handlePredict} />

      {prediction ? (
        <Text style={styles.result}>Predicted Crop: {prediction}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  result: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: 'green',
    },
});
