import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function PhoneVerificationScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationMethod, setVerificationMethod] = useState<'whatsapp' | 'sms' | null>(null);

  const handleContinue = () => {
    if (!phoneNumber.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }

    if (!verificationMethod) {
      Alert.alert('Error', 'Please select a verification method');
      return;
    }

    // In a real app, we would send the verification code here
    // For now, we'll just navigate to the verification code screen
    router.push({
      pathname: '/onboarding/verification-code',
      params: { phoneNumber, method: verificationMethod }
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Phone Verification</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>Enter your phone number</Text>
        <Text style={styles.subtitle}>
          We'll send a verification code to confirm your identity
        </Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 08123456789"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
        
        <Text style={styles.methodLabel}>Select verification method:</Text>
        <View style={styles.methodContainer}>
          <TouchableOpacity 
            style={[
              styles.methodButton, 
              verificationMethod === 'whatsapp' && styles.methodButtonSelected
            ]}
            onPress={() => setVerificationMethod('whatsapp')}
          >
            <Text 
              style={[
                styles.methodButtonText,
                verificationMethod === 'whatsapp' && styles.methodButtonTextSelected
              ]}
            >
              WhatsApp
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.methodButton, 
              verificationMethod === 'sms' && styles.methodButtonSelected
            ]}
            onPress={() => setVerificationMethod('sms')}
          >
            <Text 
              style={[
                styles.methodButtonText,
                verificationMethod === 'sms' && styles.methodButtonTextSelected
              ]}
            >
              SMS
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.continueButton}
        onPress={handleContinue}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
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
  methodLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  methodContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  methodButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
  },
  methodButtonSelected: {
    borderColor: '#007BFF',
    backgroundColor: 'rgba(0, 123, 255, 0.1)',
  },
  methodButtonText: {
    fontSize: 16,
    color: '#333',
  },
  methodButtonTextSelected: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
