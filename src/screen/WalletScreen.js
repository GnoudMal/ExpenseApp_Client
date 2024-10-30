import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrUpdateBalance, fetchBalance } from '../redux/actions/balanceActions';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchTransactions } from '../redux/actions/transactionActions';

const WalletScreen = () => {
    const dispatch = useDispatch();
    const { balance } = useSelector(state => state.balance);
    const { transactions } = useSelector(state => state.transaction);
    const [isModalVisible, setModalVisible] = useState(false);
    const [newBalance, setNewBalance] = useState(balance?.totalBalance || 0);
    const userId = useSelector((state) => state.user.userInfo.id);

    // Fetch balance and transactions on initial load or when userId changes
    useEffect(() => {
        if (userId) {
            dispatch(fetchBalance(userId));
            dispatch(fetchTransactions(userId));
        }
    }, [userId, dispatch]);

    // Function to calculate totals
    const calculateTotals = () => {
        let totalIncome = 0;
        let totalExpenses = 0;

        transactions.forEach((transaction) => {
            if (transaction.type === 'Income') {
                totalIncome += transaction.amount;
            } else if (transaction.type === 'Expense') {
                totalExpenses += transaction.amount;
            }
        });

        return { totalIncome, totalExpenses };
    };

    useEffect(() => {
        if (transactions.length > 0) {
            const { totalIncome, totalExpenses } = calculateTotals();
            const finalBalance = totalIncome - totalExpenses; // Không cộng dồn với balance.totalBalance

            // Chỉ cập nhật nếu balance.totalBalance khác với finalBalance
            if (balance.totalBalance !== finalBalance) {
                dispatch(createOrUpdateBalance({ userId, totalBalance: finalBalance }));
            }
        }
    }, [transactions, balance, dispatch, userId]);



    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const updateBalance = () => {
        dispatch(createOrUpdateBalance({ userId, totalBalance: newBalance }));
        toggleModal();
    };

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity style={styles.iconButton}>
                    <Icon name="tune" size={24} color="#f5a623" />
                </TouchableOpacity>
                <View style={styles.datePicker}>
                    <Text style={styles.dateText}>August 2024</Text>
                </View>
                <TouchableOpacity style={styles.iconButton} onPress={toggleModal}>
                    <Icon name="settings" size={24} color="#50e3c2" />
                </TouchableOpacity>
            </View>

            {/* Total Balance Card */}
            <View style={styles.balanceCard}>
                <Text style={styles.balanceTitle}>Total Balance</Text>
                <Text style={styles.balanceAmount}>{balance?.totalBalance?.toLocaleString()} VND</Text>
                <View style={styles.balanceDetails}>
                    <View style={styles.balanceDetail}>
                        <Icon name="arrow-downward" size={20} color="#ff6f61" />
                        <Text style={styles.expenses}>Expenses</Text>
                        <Text style={styles.amount}>{calculateTotals().totalExpenses.toLocaleString()} VND</Text>
                    </View>
                    <View style={styles.balanceDetail}>
                        <Icon name="arrow-upward" size={20} color="#7ed321" />
                        <Text style={styles.income}>Income</Text>
                        <Text style={styles.amount}>{calculateTotals().totalIncome.toLocaleString()} VND</Text>
                    </View>
                </View>
            </View>

            <View style={styles.remindersContainer}>
                <Text style={styles.sectionTitle}>+ Reminders</Text>
                <Text style={styles.reminder}>Rent payment due in 5 days</Text>
                <Text style={styles.reminder}>Save 500,000 VND by end of the month</Text>
            </View>

            {/* Floating Action Button */}
            <TouchableOpacity style={styles.fab}>
                <Icon name="add" size={24} color="#fff" />
            </TouchableOpacity>

            {/* Modal for updating balance */}
            <Modal visible={isModalVisible} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Set Total Balance</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={newBalance.toString()}
                            onChangeText={(text) => setNewBalance(Number(text))}
                        />
                        <Button title="Save" onPress={updateBalance} />
                        <Button title="Cancel" onPress={toggleModal} color="#aaa" />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    dateText: {
        fontSize: 16,
        color: '#ffffff',
    },
    balanceCard: {
        backgroundColor: '#4a90e2',
        borderRadius: 12,
        padding: 16,
        margin: 16,
        alignItems: 'center',
    },
    balanceTitle: {
        color: '#ffffff',
        fontSize: 16,
    },
    balanceAmount: {
        color: '#ffffff',
        fontSize: 28,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    balanceDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 16,
    },
    balanceDetail: {
        alignItems: 'center',
    },
    expenses: {
        color: '#ff6f61',
        fontSize: 14,
    },
    income: {
        color: '#7ed321',
        fontSize: 14,
    },
    amount: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    remindersContainer: {
        margin: 16,
    },
    reminder: {
        color: '#ffffff',
        marginBottom: 8,
    },
    fab: {
        position: 'absolute',
        bottom: 70,
        right: 20,
        width: 56,
        height: 56,
        backgroundColor: '#f5a623',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: '#424242',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        color: '#ffffff',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#757575',
        borderRadius: 5,
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 18,
        color: '#ffffff',
        backgroundColor: '#333333',
    },
});

export default WalletScreen;
