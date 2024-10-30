import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;

const ChartScreen = () => {
    // Sample data for 12 months
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                data: [200, 450, 300, 500, 420, 600, 700, 550, 480, 520, 650, 800],
                color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
                strokeWidth: 2,
            },
        ],
        legend: ['Monthly Expenses'], // Optional legend
    };

    // Prepare detailed data for the table
    const tableData = data.labels.map((label, index) => ({
        month: label,
        amount: data.datasets[0].data[index],
        category: index % 2 === 0 ? 'Food' : 'Entertainment', // Alternating categories for demo
    }));

    const renderItem = ({ item }) => (
        <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.month}</Text>
            <Text style={styles.tableCell}>{item.category}</Text>
            <Text style={styles.tableCell}>${item.amount.toFixed(2)}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Monthly Expense Chart</Text>
            <LineChart
                data={data}
                width={screenWidth - 32} // Responsive width
                height={220}
                chartConfig={{
                    backgroundColor: '#1b1e23',
                    backgroundGradientFrom: '#1b1e23',
                    backgroundGradientTo: '#2c2c2c',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                }}
                style={styles.chart}
            />
            <View style={styles.table}>
                <FlatList
                    data={tableData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.month}
                    ListHeaderComponent={() => (
                        <View style={styles.tableRow}>
                            <Text style={styles.tableHeader}>Month</Text>
                            <Text style={styles.tableHeader}>Category</Text>
                            <Text style={styles.tableHeader}>Amount</Text>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1b1e23',
        padding: 16,
    },
    text: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 16,
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
    },
    table: {
        marginTop: 16,
        width: '100%',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#444',
    },
    tableCell: {
        color: '#fff',
        fontSize: 16,
    },
    tableHeader: {
        color: '#1E88E5',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ChartScreen;
