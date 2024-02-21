import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { getAuthStateChangeFirebase } from './scripts/FirebaseAuth.js'

import LoginScreen from './frontend/Components/LoginScreen.js';
import RegisterScreen from './frontend/Components/RegisterScreen.js'
import TestProfile from './frontend/Components/TestProfile.js';
import LandingScreen from './frontend/Components/LandingScreen.js';
import DashboardScreen from './frontend/Components/DashboardScreen.js';
import ProfileScreen from './frontend/Components/ProfileScreen.js';

const Stack = createNativeStackNavigator();


export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = getAuthStateChangeFirebase(setIsLoggedIn);
    return () => {
      unsubscribe()
    };
  }, []);

  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName={isLoggedIn ? "Dashboard" : "Landing"}>

        {isLoggedIn ? (
          <>
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>

          // screens that can be accessed when the user is logged in or logged out should be denoted as such
          // <Stack.Screen navigationKey={isLoggedIn ? 'user' : 'guest'} name="Help" component={HelpScreen} />
          //NOTE: this would be outside the isLoggedIn ? ternary operator
        )}

      </Stack.Navigator>

    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });