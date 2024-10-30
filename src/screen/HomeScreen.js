import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { LinearGradient as RNLinearGradient } from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../redux/actions/transactionActions';
import { fetchGoals } from '../redux/actions/goalActions';
import { fetchBalance } from '../redux/actions/balanceActions';

// const sampleTransactions = [
//     { _id: '1', userId: '1', amount: 1350000, type: 'expense', category: 'Food', date: '2024-08-01T10:00:00Z', icon: 'fastfood' },
//     { _id: '2', userId: '1', amount: 5000000, type: 'income', category: 'Salary', date: '2024-08-10T12:00:00Z', icon: 'attach-money' },
//     { _id: '3', userId: '1', amount: 7000000, type: 'income', category: 'Prize', date: '2024-08-03T15:00:00Z', icon: 'star' },
//     { _id: '4', userId: '1', amount: 2200000, type: 'expense', category: 'Entertainment', date: '2024-08-04T17:00:00Z', icon: 'theaters' },
//     { _id: '5', userId: '1', amount: 200000, type: 'expense', category: 'Shopping', date: '2024-08-04T17:00:00Z', icon: 'shopping-bag' },

// ];


const CircularProgress = ({ size, strokeWidth, percentage, innerText, color }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (circumference * percentage) / 100;

    return (
        <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
            <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: [{ rotate: '-90deg' }] }}>
                <Defs>
                    <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <Stop offset="0%" stopColor={color.start} />
                        <Stop offset="100%" stopColor={color.end} />
                    </LinearGradient>
                </Defs>
                <Circle
                    stroke="rgba(255, 255, 255, 0.2)"
                    fill="transparent"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                />
                <Circle
                    stroke="url(#grad)"
                    fill="transparent"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                />
            </Svg>
            <View style={styles.innerTextContainer}>
                <Text style={styles.innerText}>{innerText}</Text>
            </View>
        </View>
    );
};

const MainScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { transactions, loading, error } = useSelector(state => state.transaction);
    const { goals, loading: goalsLoading, error: goalsError } = useSelector(state => state.goal);
    const { balance } = useSelector(state => state.balance);
    const [progressData, setProgressData] = useState([]);


    const { userInfo } = useSelector(state => state.user);
    const userId = userInfo ? userInfo.id : null;
    console.log(userInfo);





    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (userId) {
                dispatch(fetchTransactions(userId));
                dispatch(fetchGoals(userId));
                dispatch(fetchBalance(userId));
            }
        });

        return unsubscribe;
    }, [navigation, userId, dispatch]);




    useEffect(() => {
        console.log('Transactions:', transactions);
        console.log('Goals:', goals);
        console.log('Balance:', balance);

        const newProgressData = calculateProgress();
        setProgressData(newProgressData);
    }, [goals, transactions]);




    const calculateSpendingByCategory = () => {
        return transactions.reduce((acc, transaction) => {

            const mainCategory = transaction.category || 'Others';



            if (!acc[mainCategory]) {
                acc[mainCategory] = 0;
            }


            acc[mainCategory] += transaction.amount;
            // console.log('check', acc);
            return acc;
        }, {});
    };


    // Tính toán tỷ lệ phần trăm chi tiêu so với mục tiêu
    const calculateProgress = useCallback(() => {
        const spendingByCategory = calculateSpendingByCategory();
        return goals.map(goal => {
            const spending = spendingByCategory[goal.category] || 0;
            const percentage = (spending / goal.goalAmount) * 100;

            let categoryColor;
            if (['Life', 'Entertainment', 'Salary'].includes(goal.category)) {
                categoryColor = categoryColors[goal.category] || { start: '#ccc', end: '#eee' };
            } else {
                categoryColor = { start: '#ccc', end: '#eee' };
            }

            return {
                ...goal,
                percentage: Math.min(percentage, 100),
                innerText: `${Math.round(percentage)}%`,
                color: categoryColor,
            };
        });
    }, [goals, transactions]); // Only recalculate if goals or transactions change


    const renderProgress = ({ percentage, innerText, color, groupName }) => (
        <View style={styles.progressWrapper}>
            <CircularProgress
                size={90}
                strokeWidth={15}
                percentage={percentage}
                innerText={innerText}
                color={color}
            />
            <View style={styles.progressDetails}>
                <Text style={styles.groupName}>{groupName}</Text>
            </View>
        </View>
    );



    const categoryColors = {
        LivingExpenses: { start: '#6a11cb', end: '#2575fc' },
        PersonalAndEntertainment: { start: '#ff512f', end: '#dd2476' },
        InvestmentAndSavings: { start: '#f09819', end: '#ff512f' },
        Shopping: { start: '#6a11cb', end: '#2575fc' },
        Food: { start: '#6a11cb', end: '#2575fc' },
        Life: { start: '#6a11cb', end: '#2575fc' },
        AMAZON: { start: '#e91e63', end: '#f48fb1' },
        Entertainment: { start: '#f09819', end: '#ff512f' },
        Prize: { start: '#ff512f', end: '#dd2476' },
        Salary: { start: '#ff512f', end: '#dd2476' },
        Transportation: { start: '#ff512f', end: '#dd2476' },
    };



    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    };

    const renderTransaction = ({ item }) => {
        const amountColor = item.type === 'Expense' ? '#e91e63' : '#4caf50';
        let categoryColor = { start: '#ccc', end: '#eee' };
        let iconName = 'help-outline'; // Default icon

        // Set category color and icon based on the category
        if (['Food', 'Apparels', 'Life', 'Transportation', 'Shopping'].includes(item.category)) {
            categoryColor = categoryColors['Life'];
            iconName = 'home'; // Icon for "Life"
        } else if (['Entertainment', 'Prize'].includes(item.category)) {
            categoryColor = categoryColors['Entertainment'];
            iconName = 'movie'; // Icon for "Entertainment"
        } else if (['Salary', 'Investments'].includes(item.category)) {
            categoryColor = categoryColors['Salary'];
            iconName = 'attach-money'; // Icon for "Salary"
        }

        return (
            <View style={styles.transaction}>
                <View style={{ backgroundColor: '#4caf50', borderRadius: 10, padding: 5, marginRight: 10 }}>
                    <Icon name={iconName} size={27} color="#fff" />
                </View>
                <View style={styles.transactionContent}>
                    <Text style={styles.merchant}>{item.category}</Text>
                    <Text style={styles.merchantDetail}>{item.detailCategory}</Text>
                    <Text style={styles.date}>{formatDate(item.date)}</Text>
                </View>
                <View style={styles.transactionAmount}>
                    <Text style={[styles.amount, { color: amountColor }]}>
                        {item.type === 'Expense' ? '-' : '+'}{item.amount.toLocaleString()} VND
                    </Text>
                </View>
                <View style={styles.categoryColorContainer}>
                    <BlurView
                        style={styles.categoryColorBlur}
                        blurType="light"
                        blurAmount={10}
                        reducedTransparencyFallbackColor="transparent"
                    >
                        <RNLinearGradient
                            colors={[categoryColor.start, categoryColor.end]}
                            style={styles.categoryColorIndicator}
                        />
                    </BlurView>
                </View>
            </View>
        );
    };


    // const progressData = calculateProgress();


    // const progressData = [
    //     {
    //         percentage: 53,
    //         innerText: '53%',
    //         color: { start: '#6a11cb', end: '#2575fc' },
    //         groupName: 'Living Expenses'
    //     },
    //     {
    //         percentage: 61,
    //         innerText: '61%',
    //         color: { start: '#ff512f', end: '#dd2476' },
    //         groupName: 'Personal and Entertainment'
    //     },
    //     {
    //         percentage: 70,
    //         innerText: '70%',
    //         color: { start: '#f09819', end: '#ff512f' },
    //         groupName: 'Investment and Savings'
    //     },
    // ];




    return (
        <SafeAreaView style={styles.container}>
            <View style={StyleSheet.absoluteFillObject}>
                <RNLinearGradient
                    colors={['#141326', '#414345']}
                    style={styles.gradientBackground}
                />
            </View>

            <View style={styles.header}>
                <Icon name="list" size={40} color="white" style={styles.icon} />
                <Text style={styles.welcome}>Welcome!</Text>
                <TouchableOpacity style={styles.goalFab} onPress={() => navigation.navigate('SetGoalsScreen')}>
                    <Icon name="track-changes" size={25} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.BalanceContainer}>
                <Text style={{ color: '#E3B53C' }}>Available Balance: </Text>
                <Text style={styles.balance}>{balance && balance.totalBalance ? balance.totalBalance.toLocaleString() : 'Loading...'} VND</Text>
            </View>

            <View style={styles.progressContainer}>
                <View style={styles.blurWrapper}>
                    <BlurView
                        style={styles.blurContainer}
                        blurType="light"
                        blurAmount={15}
                        reducedTransparencyFallbackColor="transparent"
                    />
                    <View style={styles.progressBars}>
                        {progressData.map((data, index) => (
                            <View key={index} style={styles.progressItem}>
                                {renderProgress(data)}
                            </View>
                        ))}
                    </View>
                </View>
            </View>

            <FlatList
                data={transactions}
                renderItem={renderTransaction}
                keyExtractor={(item) => item._id.toString()}
                contentContainerStyle={styles.transactions}
                ListHeaderComponent={<Text style={styles.sectionTitle}>Recent Transactions</Text>}
                style={{ flexGrow: 1 }}
            />

            <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddTransactionScreen')}>
                <Icon name="add" size={24} color="#fff" />
            </TouchableOpacity>

        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: '#1b1e23',
    },
    icon: {
        // marginRight: 70,
    },
    iconContainer: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    gradientBackground: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.8,
    },
    progressContainer: {
        // paddingHorizontal: 10,
        position: 'relative',
    },
    fab: {
        position: 'absolute',
        bottom: 70,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#E3823C',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8, // Shadow effect for Android
    },
    blurWrapper: {
        paddingVertical: 10,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: 'black',
    },
    blurContainer: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 20,
    },
    header: {
        flexDirection: 'row',
        // paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between'
        // backgroundColor: 'rgba(0,0,0,0.5)',
        // borderRadius: 20,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.8,
        // shadowRadius: 5,
        // elevation: 8,
    },

    BalanceContainer: {
        marginBottom: 10,
        padding: 20,
        alignItems: 'center'
    },
    welcome: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    balance: {
        fontSize: 24,
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    progressBars: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    transactions: {
        // backgroundColor: 'rgba(28,28,28,0.8)',
        borderRadius: 20,
        paddingVertical: 15,
        // flex: 1,
        marginVertical: 10,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 15,
    },
    transaction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#444',
        borderRadius: 20,
        paddingLeft: 12,
        backgroundColor: '#141326',

        marginBottom: 10,
    },
    transactionContent: {
        flex: 1,
    },
    transactionAmount: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    merchant: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fff',
    },
    merchantDetail: {
        fontSize: 14,
        fontWeight: '400',
        color: '#fff',
    },
    date: {
        fontSize: 14,
        color: '#aaa',
    },
    amount: {
        fontSize: 16,
        color: '#e91e63',
        fontWeight: '600',
    },
    categoryColorContainer: {
        width: 12,
        height: 79,
        borderTopEndRadius: 15,
        borderBottomEndRadius: 15,
        overflow: 'hidden',
        marginLeft: 10,
    },
    categoryColorBlur: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 15,
    },
    categoryColorIndicator: {
        width: '100%',
        height: '100%',
    },
    innerTextContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    innerText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    chartContainer: {
        marginTop: 20,
        borderRadius: 16,
        backgroundColor: '#2c2c2c', // Slightly lighter dark background for chart container
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    progressDetails: {
        marginTop: 10,
        alignItems: 'center',
    },
    groupName: {
        fontSize: 12,
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
    },
    progressItem: {
        flex: 1,
        margin: 10,
        alignItems: 'center',
    },
    goalFab: {
        width: 40,
        height: 40,
        borderRadius: 28,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
    },

});

export default MainScreen;
