import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function AccountValidationScreen() {
  const [fullName, setFullName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  const handleValidate = () => {
    if (!fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }

    if (!accountNumber.trim()) {
      Alert.alert('Error', 'Please enter your account number');
      return;
    }

    // In a real app, we would validate against the main system data here
    // For now, we'll just navigate to the security setup screen
    router.push('/onboarding/security-setup');
  };

  const handleNewAccount = () => {
    // Navigate to the new customer registration flow
    router.push('/onboarding/new-account');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Validation</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>Validate your account</Text>
        <Text style={styles.subtitle}>
          Please enter your full name exactly as registered with the cooperative and your account number
        </Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Account Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your account number"
            keyboardType="number-pad"
            value={accountNumber}
            onChangeText={setAccountNumber}
          />
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Note: The system validates against data updated daily at 3 PM. Transactions after this time will be reflected the next day.
          </Text>
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.validateButton}
          onPress={handleValidate}
        >
          <Text style={styles.validateButtonText}>Validate Account</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.newAccountButton}
          onPress={handleNewAccount}
        >
          <Text style={styles.newAccountButtonText}>Daftar Rekening BMT Fatihul Barokah</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    fontSize: 16,
    color: '#007BFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  infoContainer: {
    backgroundColor: 'rgba(0, 123, 255, 0.1)',
    borderRadius: 8,
    padding: 15,
    marginTop: 10,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#007BFF',
  },
  buttonContainer: {
    marginTop: 'auto',
  },
  validateButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  validateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  newAccountButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007BFF',
  },
  newAccountButtonText: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
