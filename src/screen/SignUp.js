import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/actions/userActions';
import { Button, TextInput, View, Alert, StyleSheet } from 'react-native';

const RegisterScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = () => {
        if (!name || !email || !password) {
            Alert.alert('Error', 'Please fill out all fields');
            return;
        }

        setLoading(true);
        dispatch(registerUser({ name, email, password }))
            .unwrap()
            .then((data) => {
                Alert.alert('Success', 'Registration successful');
                navigation.navigate('LoginScreen');
                setLoading(false);
            })
            .catch((error) => {
                Alert.alert('Error', 'Registration failed: ' + error.message);
                setLoading(false);
            });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Name"
            />
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
            />
            <Button
                title={loading ? "Registering..." : "Register"}
                onPress={handleRegister}
                disabled={loading}
            />
            <Button title="Đã Có Tài Khoản" onPress={() => navigation.navigate('LoginScreen')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
});

export default RegisterScreen;
