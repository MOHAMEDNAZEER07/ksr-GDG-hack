import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

const Vet_Docportal = ({ navigation }) => {
  const { t } = useTranslation();

  const [todaysAppointments, setTodaysAppointments] = useState([]);

  useEffect(() => {
    fetchAppointmentsForToday();
  }, []);

  const fetchAppointmentsForToday = async () => {
    try {
      const response = await fetch('http://192.168.172.77:5500/appointments');
      const data = await response.json();
  
      const today = new Date();
      const todayDate = today.toISOString().split('T')[0];
  
      const filteredAppointments = data.filter(appointment => {
        try {
          const appointmentDate = new Date(appointment.date).toISOString().split('T')[0];
          return appointmentDate === todayDate;
        } catch (error) {
          console.error(`Invalid date format for appointment ID ${appointment._id}: ${appointment.date}`);
          return false;
        }
      });
  
      setTodaysAppointments(filteredAppointments);
    } catch (error) {
      console.error('Error fetching today\'s appointments:', error);
    }
  };

  return (
    <View style={styles.screen}>
      <View contentContainerStyle={styles.container}>
      <Text> {t('welcome_message')}</Text>

        {/* <Text style={styles.title}>Doc Dashboard</Text> */}
        <Text style={styles.cardTitle1}>👋Hello <Text style={styles.Name}>Doc</Text></Text>
        
        <View style={styles.dash}>
          <ScrollView style={styles.appointmentCard} contentContainerStyle={styles.appointmentCardContent}>
          <Text style={styles.appointmentHeader}>🎯Appointments for Today:</Text>
            {todaysAppointments.length > 0 ? (
              todaysAppointments.map((appointment) => (
                <View key={appointment._id} style={styles.appointmentItem}>
                  <Text style={styles.appointmentText}>Patient: {appointment.patient}</Text>
                  <Text style={styles.appointmentText}>Reason: {appointment.reason}</Text>
                </View>
              ))
            ) : (
              <Text>No appointments for today.</Text>
            )}
          </ScrollView>
        </View>

        {/* This section will push the cards to the bottom */}
        <View style={styles.bottomCardsContainer}>
          <View style={styles.card1}>
            <Text style={styles.cardTitle}>Appointments</Text>
            <Text style={styles.cardSubtitle}>View the latest appointments</Text>
            <View style={styles.cardButtons}>
              <TouchableOpacity style={styles.startWorkout} onPress={() => navigation.navigate('Appointments')}>
                <Text style={styles.buttonText}>View Details ➔</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.card2}>
            <Text style={styles.cardTitle}>Previous Records</Text>
            <Text style={styles.cardSubtitle}>Check your previous treatments here!</Text>
            <View style={styles.cardButtons}>
              <TouchableOpacity style={styles.startWorkout}>
                <Text style={styles.buttonText}>View Details ➔</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  dash: {
    paddingBottom: 20, 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  appointmentHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#F5F5F5',
    marginBottom: 10,
  },
  appointmentCard: {
    backgroundColor: '#424242', 
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    maxHeight: 300, 
  },
  appointmentCardContent: {
    paddingBottom: 10,
  },
  appointmentItem: {
    padding: 15,
    backgroundColor: '#F5F7F8',
    marginBottom: 10,
    borderRadius: 8,
  },
  appointmentText: {
    fontSize: 20,
    color: '#000000',
    fontWeight:'bold',

  },
  container: {
    flexGrow: 1,
    paddingBottom: 20, 
  },
  bottomCardsContainer: {
    marginTop: '', 
  },
  card1: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  card2: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFA800',
    padding: 10,
  },
  Name: {
    fontSize: 25,
    color: '#1E1E1E',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#DBE4FF',
    marginBottom: 10,
  },
  cardButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  startWorkout: {
    padding: 10,
    backgroundColor: '#1E90FF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default Vet_Docportal;
