import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const categories = [
    { id: '1', name: 'Life', icon: 'favorite', color: '#2ECC71', details: ['Groceries', 'Rent', 'Utilities'] },
    { id: '2', name: 'Entertainment', icon: 'movie', color: '#E67E22', details: ['Movies', 'Games', 'Concerts'] },
    { id: '3', name: 'Salary', icon: 'attach-money', color: '#F1C40F', details: ['Monthly Salary', 'Bonus', 'Freelance'] },
];

const CategorySelector = ({ onSelectCategory }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null); // Store the selected category object
    const [selectedDetail, setSelectedDetail] = useState('');

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        if (!isModalVisible) {
            // Reset selections when closing modal
            setSelectedCategory(null);
            setSelectedDetail('');
        }
    };

    const selectCategory = (category) => {
        setSelectedCategory(category); // Store the selected category object
    };

    const selectDetail = (detail) => {
        setSelectedDetail(detail);
        onSelectCategory({ main: selectedCategory.name, detail });
        toggleModal();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.dropdown} onPress={toggleModal}>
                <Text style={styles.selectedText}>
                    {selectedDetail ? `${selectedCategory.name} - ${selectedDetail}` : (selectedCategory ? selectedCategory.name : 'Select Category')}
                </Text>
                <Icon name="arrow-drop-down" size={24} color="#FFF" />
            </TouchableOpacity>

            <Modal
                visible={isModalVisible}
                transparent
                animationType="slide"
                onRequestClose={toggleModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {!selectedCategory ? (
                            <FlatList
                                data={categories}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <TouchableOpacity style={styles.item} onPress={() => selectCategory(item)}>
                                        <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                                            <Icon name={item.icon} size={24} color="#FFF" />
                                        </View>
                                        <Text style={styles.itemText}>{item.name}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        ) : (
                            <FlatList
                                data={selectedCategory.details}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity style={styles.item} onPress={() => selectDetail(item)}>
                                        <Text style={styles.itemText}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        )}
                    </View>
                    <TouchableOpacity style={styles.overlay} onPress={toggleModal} />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdown: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#34495E',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    selectedText: {
        color: '#FFF',
        fontSize: 16,
    },
    modalContainer: {
        position: 'relative',
        top: 190,
        flex: 1,
        paddingHorizontal: 16,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#2C3E50',
        padding: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    iconContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginRight: 15,
    },
    itemText: {
        color: '#FFF',
        fontSize: 16,
    },
    overlay: {
        flex: 1,
    },
});

export default CategorySelector;
