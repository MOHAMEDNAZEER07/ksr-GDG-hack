import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const DoctorAppointments = () => {
  const [appointmentRequests, setAppointmentRequests] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  useEffect(() => {
    fetchAppointmentRequests();
    fetchUpcomingAppointments();
  }, []);

  const fetchAppointmentRequests = async () => {
    try {  
      const response = await fetch('http://192.168.172.77:5500/appointments');
      const data = await response.json();
      setAppointmentRequests(data.filter(app => app.status === 'pending'));
    } catch (error) {
      console.error('Error fetching appointment requests:', error);
    }
  };

  const fetchUpcomingAppointments = async () => {
    try {
      const response = await fetch('http://192.168.172.77:5500/appointments');
      const data = await response.json();
      setUpcomingAppointments(data.filter(app => app.status === 'confirmed'));
    } catch (error) {
      console.error('Error fetching upcoming appointments:', error);
    }
  };

  const handleConfirm = async (appointmentId) => {
    try {
      await fetch(`http://192.168.172.77:5500/appointments/${appointmentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'confirmed' }),
      });
      fetchAppointmentRequests();  
      fetchUpcomingAppointments(); 
    } catch (error) {
      console.error('Error confirming appointment:', error);
    }
  };

  const handleReject = async (appointmentId) => {
    try {
      await fetch(`http://192.168.172.77:5500/appointments/${appointmentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'rejected' }),
      });
      fetchAppointmentRequests(); 
    } catch (error) {
      console.error('Error rejecting appointment:', error);
    }
  };

  const renderAppointmentRequest = ({ item }) => (
    <View style={styles.appointmentItem}>
      <Text style={styles.patientName}>Patient: {item.patient}</Text>
      <Text style={styles.appointmentReason}>Reason: {item.reason}</Text>
      <Text style={styles.appointmentDate}>
        Date: {item.date ? new Date(item.date).toLocaleDateString() : 'Not Set'}
      </Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={() => handleConfirm(item._id)}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.rejectButton]} onPress={() => handleReject(item._id)}>
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderUpcomingAppointment = ({ item }) => (
    <View style={styles.appointmentItem}>
      <Text style={styles.patientName}>Patient: {item.patient}</Text>
      <Text style={styles.appointmentDate}>
        Date: {item.date ? new Date(item.date).toLocaleDateString() : 'Not Set'}
      </Text>
      <Text style={styles.appointmentReason}>Reason: {item.reason}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Appointment Requests</Text>
      <FlatList
        data={appointmentRequests}
        renderItem={renderAppointmentRequest}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={<Text>No appointment requests.</Text>}
      />

      <Text style={styles.header}>Upcoming Appointments</Text>
      <FlatList
        data={upcomingAppointments}
        renderItem={renderUpcomingAppointment}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={<Text>No upcoming appointments.</Text>}
      />
    </View>
  );
};
export default DoctorAppointments;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F5F5', 
    flex: 1,
  },
  header: {
    fontSize: 22, 
    fontWeight: 'bold',
    color: '#333', 
    marginBottom: 15,
    marginTop: 20,
  },
  appointmentItem: {
    padding: 20,
    backgroundColor: '#1E1E1E', 
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  patientName: {
    fontSize: 18, 
    fontWeight: 'bold',
    color: '#F5F5F5', 
  },
  appointmentDate: {
    fontSize: 16,
    color: '#F5F5F5', 
    marginTop: 5,
  },
  appointmentReason: {
    fontSize: 14,
    marginTop: 8,
    color: '#F5F5F5', 
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  button: {
    padding: 12,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  confirmButton: {
    backgroundColor: '#1E90FF', 
  },
  rejectButton: {
    backgroundColor: '#FFA800',
  },
  buttonText: {
    color: '#F5F5F5', 
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});