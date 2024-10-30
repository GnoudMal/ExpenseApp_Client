import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground, ActivityIndicator, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For icons in input fields
import Icon2 from 'react-native-vector-icons/AntDesign'; // For icons in input fields
import LinearGradient from 'react-native-linear-gradient'; // For gradient buttons
import { loginUser } from '../redux/actions/userActions';

const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setLoading(true);
        dispatch(loginUser({ email, password }))
            .unwrap()
            .then((data) => {
                setLoading(false);
                navigation.navigate('HomeTabs');
            })
            .catch((error) => {
                setLoading(false);
                console.log('Login failed:', error);
            });
    };

    return (
        <ImageBackground
            source={{ uri: 'https://img.freepik.com/premium-photo/purple-wallpaper-pink-sunrise-background_931878-26252.jpg?w=740' }} // Add your background image here
            style={styles.background}
            blurRadius={10} // Apply blur effect to background
        >
            <View style={styles.imageContainer}>
                {/* Replace with your 3D illustration */}
                {/* <Image source={{ uri: 'https://bytesflow.com/cdn-cgi/image/width=967,height=1536,fit=crop,quality=80,format=auto,onerror=redirect,metadata=none/wp-content/uploads/2024/06/3d-character-emerging-from-smartphone-1-1.png' }} style={styles.image} /> */}
                <Image source={{ uri: 'https://static.vecteezy.com/system/resources/previews/010/880/087/non_2x/3d-character-walking-out-from-smartphone-for-virtual-meet-free-png.png' }} style={styles.image} />
            </View>

            <View style={styles.container}>
                <Text style={styles.title}>Welcome Back!</Text>
                <Text style={styles.subtitle}>welcome back we missed you</Text>

                {/* Email Input */}
                <View style={styles.inputContainer}>
                    <Icon name="person-outline" size={20} color="black" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        placeholderTextColor="black"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                {/* Password Input */}
                <View style={styles.inputContainer}>
                    <Icon name="lock-outline" size={20} color="black" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="black"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={styles.checkboxContainer}>
                        <TouchableOpacity onPress={() => setRememberMe(!rememberMe)} style={styles.checkbox}>
                            <Icon
                                name={rememberMe ? 'check-box' : 'check-box-outline-blank'} // Toggle checkbox icon
                                size={24}
                                color={rememberMe ? '#f6356f' : 'black'}
                            />
                        </TouchableOpacity>
                        <Text style={styles.checkboxText}>Remember Me</Text>
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                {/* Sign In Button */}
                <TouchableOpacity onPress={handleLogin} disabled={loading}>
                    <LinearGradient
                        colors={['#f6356f', '#ff5f50']}
                        style={styles.signInButton}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={styles.signInButtonText}>Sign In</Text>
                        )}
                    </LinearGradient>
                </TouchableOpacity>

                {/* Or Continue With */}
                <Text style={styles.orText}>Or continue with</Text>

                {/* Social Login Buttons */}
                <View style={styles.socialButtonsContainer}>
                    <TouchableOpacity style={styles.socialButton}>
                        <Icon2 name="google" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                        <Icon name="apple" size={24} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                        <Icon name="facebook" size={24} color="#0A66C2" />
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '90%',
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Light transparent background
        padding: 20,
        borderRadius: 20,
    },
    imageContainer: {
        marginBottom: 20,
    },
    image: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#ffffff', // White text for title
        textAlign: 'center',
        marginBottom: 5,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkbox: {
        marginRight: 10,
    },
    checkboxText: {
        color: 'black',
        fontSize: 16,
    },
    subtitle: {
        fontSize: 16,
        color: '#f0e6ff', // Lighter text for subtitle to match background
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.3)', // Slightly darker transparent background for input fields
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    input: {
        flex: 1,
        paddingVertical: 10,
        color: '#ffffff', // White text for inputs
    },
    icon: {
        marginRight: 10,
        color: '#ffffff', // White icons to match inputs
    },
    forgotPasswordText: {
        color: '#f0e6ff', // Lighter purple text for 'Forgot Password?'
        textAlign: 'right',
        marginBottom: 20,
    },
    signInButton: {
        borderRadius: 10,
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        // Adjusted gradient to match background hues
        backgroundColor: '#ff5f50', // Soft reddish-pink tone
    },
    signInButtonText: {
        color: '#fff', // White button text
        fontSize: 18,
        fontWeight: 'bold',
    },
    orText: {
        color: '#f0e6ff', // Light text for "Or continue with"
        textAlign: 'center',
        marginBottom: 20,
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    socialButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Lighter background for social buttons
        padding: 10,
        borderRadius: 10,
    },
});

