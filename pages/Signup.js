import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,Image } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import logo from '../assets/header.png';
import calligraphicLogo from '../assets/logo.png';
import API_ENDPOINTS from '../utils/apiConfig'; 
import useGlobalStyles from '../contexts/useGlobalStyles';

export default function Signup({ navigation }) {
  const [mail, setEmail] = useState('');
  const [name, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const gotoLogin = async () => {
       navigation.navigate('Login');
  }
      const handleSignup = async () => {
    if (mail && name && pass && confirmPassword) {
      if (pass !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }

      try {
        const response = await axios.post(API_ENDPOINTS.SIGNUP, {
          mail:mail,
          name:name,
          pass:pass
        });

        if (response.data.affectedRows==1) {
          console.log(response.data)
          Alert.alert('Success', 'Account created successfully');
          navigation.navigate('Login');
        } else {
          Alert.alert('Error', response.data.message);
        }
      } catch (error) {
        console.error('Error during signup:', error);
        Alert.alert('Error', 'Something went wrong during signup');
      }
    } else {
      Alert.alert('Error', 'Please fill out all fields');
    }
  };
  const globalStyles=useGlobalStyles();
  return (
    <View style={globalStyles.container}>
            <Image
          source={calligraphicLogo}
          style={styles.calligraphicLogo}
        />
      <TextInput
        style={globalStyles.input}
        placeholder="Email"
        value={mail}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Username"
        value={name}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
  <View style={styles.passwordContainer}>
        <TextInput
          style={globalStyles.input}
          placeholder="Password"
          value={pass}
          onChangeText={setPass}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Icon name={showPassword ? "eye-off" : "eye"} size={24} color="gray" />
        </TouchableOpacity>
      </View>
      <TextInput
        style={globalStyles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={gotoLogin}>
        <Text style={styles.buttonText2}>Login</Text>
      </TouchableOpacity>
       <Image
        source={logo}
        style={styles.logo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
      calligraphicLogo: {
      marginBottom:20,
  },
  logo: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
     passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
    eyeIcon: {
    right:30,
    bottom:10,
  },
      button2: {
    width: '100%',
    padding: 15,
    alignItems: 'center',
  },
      buttonText2: {
    color: '#000',
    fontSize: 14,
  },
});
