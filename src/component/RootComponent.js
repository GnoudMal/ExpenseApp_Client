import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { store } from '../redux/store/store';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screen/LoginScreen';
import RegisterScreen from '../screen/SignUp';
import HomeScreen from '../screen/HomeScreen';
import ProfileScreen from '../screen/ProfileScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo';
import WalletScreen from '../screen/WalletScreen';
import ChartScreen from '../screen/ChartScreen';
import AddTransactionScreen from '../screen/AddTransactionScreen';
import SetGoalsScreen from '../screen/SetGoalsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();

const HomeTabs = () => {
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeStack.Screen name="TabScreens" component={TabScreens} />
            <HomeStack.Screen name="SetGoalsScreen" component={SetGoalsScreen} />
            <HomeStack.Screen name="AddTransactionScreen" component={AddTransactionScreen} />
        </HomeStack.Navigator>
    );
};

const TabScreens = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    let IconComponent = Icon; // Default icon component

                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'ProfileScreen') {
                        iconName = 'user';
                    } else if (route.name === 'Wallet') {
                        iconName = 'wallet';
                        IconComponent = Icon2; // Use Icon2 for Wallet
                    } else if (route.name === 'Chart') {
                        iconName = 'bar-chart';
                    }

                    return <IconComponent name={iconName} size={size + 5} color={color} />;
                },
                tabBarStyle: {
                    height: 65, // Increased height for better visibility
                    borderTopLeftRadius: 20, // Rounded corners
                    borderTopRightRadius: 20, // Rounded corners
                    borderTopColor: '#333', // Darker border color for the tab bar
                    borderTopWidth: 1, // Thin border at the top
                    elevation: 5, // Apply elevation for shadow effect on Android
                    backgroundColor: '#2c2c2c', // Darker background for the tab bar
                    borderTopColor: 'transparent', // Remove the border line at the top
                    position: 'absolute',
                    bottom: 0,
                },
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#00C2CB', // Active icon color
                tabBarInactiveTintColor: '#888', // Inactive icon color
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
            <Tab.Screen name="Wallet" component={WalletScreen} />
            <Tab.Screen name="Chart" component={ChartScreen} />
        </Tab.Navigator>
    );
};


const RootComponent = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <StatusBar
                    backgroundColor={'transparent'}
                    translucent
                    barStyle={'light-content'}
                />
                <Stack.Navigator initialRouteName='LoginScreen' screenOptions={{ headerShown: false }}>
                    <Stack.Screen name='LoginScreen' component={LoginScreen} />
                    <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
                    <Stack.Screen name='HomeTabs' component={HomeTabs} />

                    {/* <Stack.Screen name='AddTransactionScreen' component={AddTransactionScreen} /> */}
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default RootComponent;

const styles = StyleSheet.create({});
