import { signInFirebase } from "../../scripts/firebaseConfig.js"

import { useState } from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

export default LoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    signInFirebase(email, password).then((response) => {
      if (response.user) {
        console.log("logged in")
        navigation.navigate("Dashboard")
      }
      else {
        console.log("log in failed")
      }
    })
    

  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={handleEmailChange}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={handlePasswordChange}
        />
        <Button title="Login" onPress={handleSubmit} />

        <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
});