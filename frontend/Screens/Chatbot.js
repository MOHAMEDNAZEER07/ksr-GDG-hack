import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    setMessages(prevMessages => [...prevMessages, { from: 'Me', text: inputMessage }]);

    try {
      const response = await fetch('http://192.168.172.77:5000/crops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMessages(prevMessages => [...prevMessages, { from: 'Crops AI', text: data.response }]);

    } catch (error) {
      console.error('Error:', error);
    } finally {
      setInputMessage('');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header Tab */}
      <View style={{ padding: 10, backgroundColor: '#f5f5f5', alignItems: 'center' }}>
        {/* <Text style={{ 
          fontWeight: 'bold',
          backgroundColor: '#03A376',
          padding: 15, borderRadius: 20, fontFamily: 'monospace' 
        }}>
          Crops AI
        </Text> */}
      </View>

      {/* Chat Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ 
            alignSelf: item.from === 'Me' ? 'flex-end' : 'flex-start', 
            margin: 10, padding: 10, 
            backgroundColor: item.from === 'Me' ? '#d3f4ff' : '#e2e2e2', 
            borderRadius: 10 
          }}>
            <Text>{item.text}</Text>
          </View>
        )}
      />

      {/* Message Input */}
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, borderTopWidth: 1, borderColor: '#ddd' }}>
        <TextInput
          placeholder="Ask me anything about crops..."
          style={{ flex: 1, padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 20 }}
          value={inputMessage}
          onChangeText={setInputMessage}
          onSubmitEditing={handleSendMessage}
        />
        <TouchableOpacity style={{ marginLeft: 10 }} onPress={handleSendMessage}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
