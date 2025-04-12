import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function AddressEmploymentScreen() {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [employer, setEmployer] = useState('');
  const [position, setPosition] = useState('');
  const [workAddress, setWorkAddress] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');

  const handleNext = () => {
    // Basic validation
    if (!address.trim() || !city.trim() || !postalCode.trim()) {
      Alert.alert('Error', 'Please fill in all required address fields');
      return;
    }

    if (!employer.trim() || !position.trim()) {
      Alert.alert('Error', 'Please fill in all required employment fields');
      return;
    }

    // Navigate to the next step
    router.push('/onboarding/new-account/step-3');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Address & Employment</Text>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(2 / 4) * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>Step 2 of 4</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Residential Address</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Address <Text style={styles.requiredStar}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full address"
            value={address}
            onChangeText={setAddress}
            multiline
          />
        </View>
        
        <View style={styles.inputRow}>
          <View style={[styles.inputContainer, { flex: 2, marginRight: 10 }]}>
            <Text style={styles.inputLabel}>City <Text style={styles.requiredStar}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="City"
              value={city}
              onChangeText={setCity}
            />
          </View>
          
          <View style={[styles.inputContainer, { flex: 1 }]}>
            <Text style={styles.inputLabel}>Postal Code <Text style={styles.requiredStar}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Postal Code"
              value={postalCode}
              onChangeText={setPostalCode}
              keyboardType="number-pad"
            />
          </View>
        </View>
        
        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Employment Information</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Employer / Company <Text style={styles.requiredStar}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="Enter employer name"
            value={employer}
            onChangeText={setEmployer}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Position / Job Title <Text style={styles.requiredStar}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your position"
            value={position}
            onChangeText={setPosition}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Work Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter work address"
            value={workAddress}
            onChangeText={setWorkAddress}
            multiline
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Monthly Income (Rp)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 5000000"
            value={monthlyIncome}
            onChangeText={setMonthlyIncome}
            keyboardType="number-pad"
          />
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>Next</Text>
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
    marginBottom: 20,
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
  progressContainer: {
    marginBottom: 25,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007BFF',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  requiredStar: {
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    marginTop: 20,
  },
  nextButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
