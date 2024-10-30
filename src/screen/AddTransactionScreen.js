import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { createTransaction } from '../redux/actions/transactionActions';
import CategorySelector from './CategorySelector';

const AddTransactionScreen = ({ navigation }) => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [type, setType] = useState('Income');
    const [category, setCategory] = useState('');
    const [detailCategory, setdetailCategory] = useState('');

    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.userInfo.id);

    const handleAddTransaction = async () => {
        const transactionData = {
            userId,
            amount,
            description,
            date: date.toISOString(),
            type,
            category,
            detailCategory,
        };

        try {
            await dispatch(createTransaction(transactionData));
            navigation.goBack();
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    };

    const handleCategorySelect = ({ main, detail }) => {
        setCategory(main);
        setdetailCategory(detail);
    };

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={24} color="#FFF" />
            </TouchableOpacity>

            {/* Transaction Type Selection */}
            <View style={styles.typeContainer}>
                <TouchableOpacity
                    style={[
                        styles.typeButton,
                        type === 'Income' && styles.activeTypeButton,
                    ]}
                    onPress={() => setType('Income')}
                >
                    <Text style={styles.typeText}>INCOME</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.typeButton,
                        type === 'Expense' && styles.activeTypeButton,
                    ]}
                    onPress={() => setType('Expense')}
                >
                    <Text style={styles.typeText}>EXPENSE</Text>
                </TouchableOpacity>
            </View>

            {/* Category Selector */}
            <Text style={styles.label}>Category:</Text>
            <CategorySelector onSelectCategory={handleCategorySelect} />

            {/* Amount Input */}
            <Text style={styles.label}>Amount:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter amount"
                keyboardType="numeric"
                value={amount}
                placeholderTextColor={'white'}
                onChangeText={setAmount}
            />

            {/* Date Input */}
            <Text style={styles.label}>Date:</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <Text style={styles.dateInput}>{date.toDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                />
            )}

            {/* Description Input */}
            <Text style={styles.label}>Description:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter description"
                value={description}
                placeholderTextColor={'white'}
                onChangeText={setDescription}
            />

            {/* Add Transaction Button */}
            <TouchableOpacity style={styles.addButton} onPress={handleAddTransaction}>
                <Text style={styles.addButtonText}>Add Transaction</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#1E1E1E', // Dark background to match the theme
    },
    backButton: {
        marginBottom: 16,
        alignSelf: 'flex-start',
    },
    label: {
        fontSize: 16,
        color: '#FFFFFF', // White text color to match the theme
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#777',
        backgroundColor: '#2E2E2E', // Dark input background
        color: '#FFFFFF', // White text color in the input
        padding: 12,
        marginBottom: 16,
        borderRadius: 8,
    },
    dateInput: {
        borderWidth: 1,
        borderColor: '#777',
        backgroundColor: '#2E2E2E', // Dark input background
        color: '#FFFFFF', // White text color in the input
        padding: 12,
        marginBottom: 16,
        borderRadius: 8,
    },
    typeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    typeButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
        backgroundColor: '#333', // Default background
    },
    activeTypeButton: {
        backgroundColor: '#FF4500', // Active button background color
    },
    typeText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#FF4500', // Button background color
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AddTransactionScreen;
