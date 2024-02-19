import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import PostScreen from '../screens/PostScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator(); 

function NavigationBar({setIsAuthenticated}) {
    console.log("navigation bar");
    console.log(typeof setIsAuthenticated);
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Posts" component={PostScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} initialParams={{setIsAuthenticated}} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default NavigationBar;