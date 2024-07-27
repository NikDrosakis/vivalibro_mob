import React, { useContext, useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AppContext } from '../contexts/AppContext';
import Footer from '../components/Footer';
import useGlobalStyles from '../contexts/useGlobalStyles';

const Settings = ({ navigation }) => {
const { darkMode, toggleDarkMode } = useContext(AppContext);
  const [lang, setLang] = useState('en');
    const [push, setPush] = useState(0);
  const [userData, setUserData] = useState({
    name: '',
    mail: '',
    pass: '',
  });

 const handleChange = (field, value) => {
    setuserData(prevState => ({
      ...prevState,
      [field]: value,
    }));
    // POST request to update user details dynamically
    axios.post(API_ENDPOINTS.EDIT('user'), {
      key: field,
      value: value,
      id: gsid,
    })
    .then(response => {
      console.log('Book details updated successfully:', response.data);
    })
    .catch(error => {
      console.error('Error updating book details:', error);
    });
  };
  const handleLanguageChange = (itemValue) => {
    setLang(itemValue);
  };
const globalStyles=useGlobalStyles();
  return (
    <View style={globalStyles.container}>
      <Text style={[styles.heading, darkMode ? styles.darkText : styles.lightText]}>Settings</Text>

      {/* Dark Mode */}
      <View style={styles.settingItem}>
        <Text style={darkMode ? styles.darkText : styles.lightText}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={toggleDarkMode} />
      </View>


      {/* Push Notifications */}
      <View style={styles.settingItem}>
        <Text style={darkMode ? styles.darkText : styles.lightText}>Active Push Notifications</Text>
        <Switch value={push} onValueChange={value => handleChange('push', value)} />
      </View>

      {/* Language Preferences */}
      <View style={styles.settingItem}>
        <Text style={darkMode ? styles.darkText : styles.lightText}>Language Preferences</Text>
        <Picker
          selectedValue={lang}
          style={{ height: 50, width: 150 }}
          onValueChange={value => handleChange('push', value)} 
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Ελληνικά" value="el" />
        </Picker>
      </View>

      {/* Delete Account */}
      <TouchableOpacity style={styles.settingItem} onPress={() => alert('Account deleted')}>
        <Text style={darkMode ? styles.darkText : styles.lightText}>Delete Account</Text>
      </TouchableOpacity>
               <Footer navigation={navigation} /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  lightContainer: {
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  settingItem: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginTop: 10,
  },
  lightInput: {
    borderColor: '#ccc',
    color: '#000',
  },
  darkInput: {
    borderColor: '#555',
    color: '#fff',
  },
});

export default Settings;
