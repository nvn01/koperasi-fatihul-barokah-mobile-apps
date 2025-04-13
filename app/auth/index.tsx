import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../../context/auth-context';

export default function AuthScreen() {
  const router = useRouter();
  const { signIn, verifyOtp, isLoading } = useAuth();
  
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  
  // Format phone number to international format
  const formatPhoneNumber = (input: string) => {
    // Remove non-numeric characters
    const cleaned = input.replace(/\D/g, '');
    
    // Add Indonesia country code if not present
    if (cleaned.startsWith('8')) {
      return `+62${cleaned}`;
    } else if (cleaned.startsWith('62')) {
      return `+${cleaned}`;
    }
    
    return input;
  };
  
  // Handle sign in with phone
  const handleSignIn = async () => {
    if (!phone || phone.length < 10) {
      Alert.alert('Error', 'Silakan masukkan nomor telepon yang valid');
      return;
    }
    
    try {
      const formattedPhone = formatPhoneNumber(phone);
      await signIn(formattedPhone);
      setOtpSent(true);
      Alert.alert('Sukses', 'Kode OTP telah dikirim ke nomor telepon Anda');
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };
  
  // Handle OTP verification
  const handleVerifyOtp = async () => {
    if (!otp || otp.length < 6) {
      Alert.alert('Error', 'Silakan masukkan kode OTP yang valid');
      return;
    }
    
    try {
      const formattedPhone = formatPhoneNumber(phone);
      await verifyOtp(formattedPhone, otp);
      router.replace('/dashboard');
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.content}>
        <Text style={styles.title}>
          {otpSent ? 'Verifikasi OTP' : 'Masuk / Daftar'}
        </Text>
        
        {!otpSent ? (
          <>
            <Text style={styles.subtitle}>
              Masukkan nomor telepon Anda untuk melanjutkan
            </Text>
            
            <TextInput
              style={styles.input}
              placeholder="Nomor Telepon (contoh: 08123456789)"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              editable={!isLoading}
            />
            
            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleSignIn}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Kirim Kode OTP</Text>
              )}
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.subtitle}>
              Masukkan kode OTP yang dikirim ke {formatPhoneNumber(phone)}
            </Text>
            
            <TextInput
              style={styles.input}
              placeholder="Kode OTP"
              keyboardType="number-pad"
              value={otp}
              onChangeText={setOtp}
              editable={!isLoading}
              maxLength={6}
            />
            
            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleVerifyOtp}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Verifikasi</Text>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => setOtpSent(false)}
              disabled={isLoading}
            >
              <Text style={styles.linkText}>Kembali</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkButton: {
    padding: 10,
    alignItems: 'center',
  },
  linkText: {
    color: '#007BFF',
    fontSize: 16,
  },
});
