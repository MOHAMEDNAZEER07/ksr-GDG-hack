import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Forum = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);
  const [newReply, setNewReply] = useState('');

  useEffect(() => {
    fetch('http://192.168.172.77:5500/questions')
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error('Error fetching questions:', error));
  }, []);

  const handlePress = (questionId) => {
    setExpandedQuestionId(prevId => (prevId === questionId ? null : questionId));
  };

  const handleSend = () => {
    if (newQuestion.trim()) {
      const newQuestionObj = {
        text: newQuestion,
        replies: [],
        likes: 0,
        date: new Date().toISOString().split('T')[0],
      };

      fetch('http://192.168.172.77:5500/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuestionObj),
      })
      .then((response) => response.json())
      .then((data) => {
        setQuestions([...questions, data]);
        setNewQuestion('');
      })
      .catch((error) => console.error('Error posting question:', error));
    } else {
      console.log('Please enter a question');
    }
  };

  const handleLike = (questionId) => {
    const updatedQuestions = questions.map((question) => {
      if (question._id === questionId) {
        question.likes += 1;
        fetch(`http://192.168.172.77:5500/questions/${questionId}/like`, {
          method: 'PATCH',
        })
        .catch((error) => console.error('Error updating likes:', error));
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const handleReplySend = (questionId) => {
    if (newReply.trim()) {
      const updatedQuestions = questions.map((question) => {
        if (question._id === questionId) {
          question.replies.push(newReply);
          fetch(`http://192.168.172.77:5500/questions/${questionId}/reply`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reply: newReply }),
          })
          .catch((error) => console.error('Error posting reply:', error));
        }
        return question;
      });
      setQuestions(updatedQuestions);
      setNewReply('');
    } else {
      console.log('Please enter a reply');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.questionContainer}>
      <Text style={styles.dateText}>{item.date}</Text>
      <View style={styles.questionWrapper}>
        <TouchableOpacity style={styles.question} onPress={() => handlePress(item._id)}>
          <Text style={styles.questionText}>{item.text}</Text>
        </TouchableOpacity>
      </View>
      {expandedQuestionId === item._id && (
        <>
          <View style={styles.repliesContainer}>
            {item.replies.length > 0 ? (
              item.replies.map((reply, index) => (
                <Text key={index} style={styles.replyText}>{reply}</Text>
              ))
            ) : (
              <Text style={styles.noReplyText}>No replies yet.</Text>
            )}
            <TextInput
              style={styles.replyInput}
              placeholder="Add a reply..."
              value={newReply}
              onChangeText={setNewReply}
            />
            <TouchableOpacity style={styles.replyButton} onPress={() => handleReplySend(item._id)}>
              <Text style={styles.replyButtonText}>Reply</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.actionButton} onPress={() => handleLike(item._id)}>
          <Icon name="favorite" size={16} color="#E91E63" />
          <Text style={styles.actionText}>{item.likes} Likes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => handlePress(item._id)}>
          <Icon name="chat-bubble-outline" size={16} color="#4CAF50" />
          <Text style={styles.actionText}>{item.replies.length} Replies</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={questions}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask a question..."
          value={newQuestion}
          onChangeText={setNewQuestion}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  list: {
    padding: 10,
  },
  questionContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  dateText: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
  },
  questionWrapper: {
    position: 'relative',
  },
  question: {
    padding: 15,
  },
  questionText: {
    fontSize: 16,
    color: '#333',
  },
  repliesContainer: {
    marginTop: 10,
    paddingLeft: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: 10,
  },
  replyText: {
    paddingVertical: 5,
    color: '#555',
  },
  noReplyText: {
    color: '#999',
  },
  replyInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  replyButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  replyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 5,
    color: '#777',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  sendButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 20,
    marginLeft: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Forum;
