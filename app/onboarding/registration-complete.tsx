import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RegistrationCompleteScreen() {
  const handleGoToDashboard = () => {
    // In a real app, we would save the user's login state here
    router.replace('/dashboard');
  };
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.content}>
        <View style={styles.successIconContainer}>
          <Text style={styles.successIcon}>✓</Text>
        </View>
        
        <Text style={styles.title}>Registration Complete!</Text>
        <Text style={styles.subtitle}>
          Your account has been successfully created. You can now access your financial information and services.
        </Text>
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Important Information</Text>
          <Text style={styles.infoText}>
            • Your account data is updated daily at 3 PM
          </Text>
          <Text style={styles.infoText}>
            • Transactions after 3 PM will be reflected the next day
          </Text>
          <Text style={styles.infoText}>
            • Keep your PIN secure and do not share it with anyone
          </Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.dashboardButton}
        onPress={handleGoToDashboard}
      >
        <Text style={styles.dashboardButtonText}>Go to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  successIcon: {
    fontSize: 60,
    color: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 24,
  },
  infoContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 20,
    width: '100%',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
    lineHeight: 20,
  },
  dashboardButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto',
  },
  dashboardButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
