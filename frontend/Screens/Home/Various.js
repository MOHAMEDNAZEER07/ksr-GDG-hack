import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { Avatar } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

const doctorsList = [
  { id: '1', name: 'Dr. Naresh', specialty: 'Cardiologist' },
  { id: '2', name: 'Dr. Vivek', specialty: 'Dermatologist' },
  { id: '3', name: 'Dr. Devi', specialty: 'Pediatrician' },
  { id: '4', name: 'Dr. Divyasri', specialty: 'Oncologist' },
];

const BookAppointment = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentReason, setAppointmentReason] = useState('');
  const [patient, setPatient] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleBooking = () => {
    const appointmentData = {
      doctor: selectedDoctor.name,
      patient: patient,
      reason: appointmentReason,
      date: appointmentDate.toISOString().split('T')[0], // Format date to YYYY-MM-DD
    };

    fetch('http://192.168.172.77:5500/appointments', { 
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentData) 
    })
    .then(response => {
      if (response.ok) {
        setAppointmentReason('');
        setPatient('');
        setSuccessMessage('Appointment Successfully Booked!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        console.error('Failed to book appointment');
      }
    })
    .catch(error => console.error('Error:', error));
  };

  const renderDoctorItem = ({ item }) => (
    <TouchableOpacity
      style={styles.doctorItem}
      onPress={() => setSelectedDoctor(item)}
    >
      <Text style={styles.doctorName}>{item.name}</Text>
      <Text style={styles.doctorSpecialty}>{item.specialty}</Text>
    </TouchableOpacity>
  );

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || appointmentDate;
    setShowDatePicker(Platform.OS === 'ios');
    setAppointmentDate(currentDate);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {!selectedDoctor ? (
        <>
          <Text style={styles.la1}>Select a Doctor</Text>
          <FlatList
            data={doctorsList}
            renderItem={renderDoctorItem}
            keyExtractor={(item) => item.id}
          />
        </>
      ) : (
        <FlatList
          data={[]}
          ListHeaderComponent={
            <>
              <View style={{ alignItems: 'center' }}>
                <Avatar.Image size={144} source={require('../icons/man.jpg')} />
              </View>
              <Text style={styles.label1}>{selectedDoctor.name},</Text>
              <Text style={styles.label2}>{selectedDoctor.specialty}</Text>

              <Text style={styles.label}>Name:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Your Name"
                value={patient}
                onChangeText={setPatient}
              />

              <Text style={styles.label}>Reason for Appointment:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter reason for appointment"
                value={appointmentReason}
                onChangeText={setAppointmentReason}
              />

              <Text style={styles.label}>Select Appointment Date:</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
                <Text>{appointmentDate.toDateString()}</Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={appointmentDate}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}

              <Button title="Book Appointment" onPress={handleBooking} />

              {successMessage ? (
                <Text style={styles.successMessage}>{successMessage}</Text>
              ) : null}

              <TouchableOpacity onPress={() => setSelectedDoctor(null)} style={styles.backButton}>
                <Text style={styles.backButtonText}>Select Another Doctor</Text>
              </TouchableOpacity>
            </>
          }
        />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  label1: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 42,
    fontWeight: 'heavy',
    fontWeight: 'bold',
  },
  label2: {
    fontSize: 22,
    fontWeight: 'heavy',
    fontWeight: 'bold',
    paddingBottom: 10,
    color: '#295F98',
  },
  la1: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#179BAE',
    padding: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#295F98',
  },
  doctorItem: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#007bff',
    fontSize: 16,
  },
  successMessage: {
    color: 'green',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default BookAppointment;