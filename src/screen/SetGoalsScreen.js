import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createGoal, setGoal } from '../redux/actions/goalActions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

const SetGoalsScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [salaryGoal, setSalaryGoal] = useState('');
    const [lifeGoal, setLifeGoal] = useState('');
    const [entertainmentGoal, setEntertainmentGoal] = useState('');
    const userId = useSelector((state) => state.user.userInfo.id);

    const handleSetGoal = (category, amount) => {
        const parsedAmount = parseInt(amount, 10);
        if (parsedAmount > 0) {
            dispatch(createGoal({ userId, category, goalAmount: parsedAmount }))
                .then(() => {
                    Alert.alert('Success', `${category} goal set successfully!`, [
                        { text: 'OK', onPress: () => navigation.goBack() } // Navigate back after setting goal
                    ]);
                })
                .catch(error => {
                    Alert.alert('Error', 'Failed to set goal. Please try again.');
                    console.error('Error setting goal:', error);
                });
        } else {
            Alert.alert('Invalid Input', 'Please enter a valid amount.');
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Set Goals</Text>
            <View style={styles.goalContainer}>
                <Text style={styles.label}>Salary Goal</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter amount"
                    keyboardType="numeric"
                    placeholderTextColor={'white'}
                    value={salaryGoal}
                    onChangeText={setSalaryGoal}
                />
                <TouchableOpacity
                    style={styles.setGoalButton}
                    onPress={() => handleSetGoal('Salary', salaryGoal)}
                >
                    <Icon name="check" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
            <View style={styles.goalContainer}>
                <Text style={styles.label}>Life Goal</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter amount"
                    keyboardType="numeric"
                    placeholderTextColor={'white'}
                    value={lifeGoal}
                    onChangeText={setLifeGoal}
                />
                <TouchableOpacity
                    style={styles.setGoalButton}
                    onPress={() => handleSetGoal('Life', lifeGoal)}
                >
                    <Icon name="check" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
            <View style={styles.goalContainer}>
                <Text style={styles.label}>Entertainment Goal</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter amount"
                    keyboardType="numeric"
                    placeholderTextColor={'white'}
                    value={entertainmentGoal}
                    onChangeText={setEntertainmentGoal}
                />
                <TouchableOpacity
                    style={styles.setGoalButton}
                    onPress={() => handleSetGoal('Entertainment', entertainmentGoal)}
                >
                    <Icon name="check" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.doneButton} onPress={() => navigation.goBack()}>
                <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141326',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    goalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    label: {
        flex: 1,
        fontSize: 18,
        color: '#fff',
    },
    input: {
        flex: 2,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        color: '#fff',
    },
    setGoalButton: {
        backgroundColor: '#6a11cb',
        padding: 10,
        borderRadius: 5,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    doneButton: {
        backgroundColor: '#2575fc',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 30,
    },
    doneText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default SetGoalsScreen;
