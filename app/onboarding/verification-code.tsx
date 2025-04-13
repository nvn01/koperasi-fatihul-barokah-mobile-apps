import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function VerificationCodeScreen() {
  const params = useLocalSearchParams<{ phoneNumber: string; method: string }>();
  const phoneNumber = params.phoneNumber || '';
  const method = params.method || 'sms';
  
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  
  const inputRefs = useRef<Array<TextInput | null>>([]);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const handleCodeChange = (text: string, index: number) => {
    if (text.length > 1) {
      text = text[0];
    }
    
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    
    // Auto-advance to next input
    if (text !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  
  const handleKeyPress = (e: any, index: number) => {
    // Go back to previous input on backspace if current input is empty
    if (e.nativeEvent.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  
  const handleResendCode = () => {
    if (!canResend) return;
    
    // Reset timer
    setTimeLeft(60);
    setCanResend(false);
    
    // In a real app, we would resend the verification code here
    Alert.alert('Kode Terkirim', `Kode verifikasi baru telah dikirim melalui ${method === 'whatsapp' ? 'WhatsApp' : 'SMS'}`);
  };
  
  const handleVerify = () => {
    const fullCode = code.join('');
    
    if (fullCode.length !== 6) {
      Alert.alert('Error', 'Mohon masukkan kode 6 digit lengkap');
      return;
    }
    
    // In a real app, we would verify the code here
    // For now, we'll just navigate to the account validation screen
    router.push('/onboarding/account-validation');
  };
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Kembali</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kode Verifikasi</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>Masukkan kode verifikasi</Text>
        <Text style={styles.subtitle}>
          Kami telah mengirim kode 6 digit ke {phoneNumber} melalui {method === 'whatsapp' ? 'WhatsApp' : 'SMS'}
        </Text>
        
        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={styles.codeInput}
              value={digit}
              onChangeText={(text) => handleCodeChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>
        
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>
            {canResend 
              ? "Tidak menerima kode?" 
              : `Kirim ulang kode dalam ${timeLeft}d`
            }
          </Text>
          {canResend && (
            <TouchableOpacity onPress={handleResendCode}>
              <Text style={styles.resendButton}>Kirim Ulang Kode</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.verifyButton}
        onPress={handleVerify}
      >
        <Text style={styles.verifyButtonText}>Verifikasi</Text>
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
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  codeInput: {
    width: 45,
    height: 55,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resendText: {
    fontSize: 14,
    color: '#666',
  },
  resendButton: {
    fontSize: 14,
    color: '#007BFF',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  verifyButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto',
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
