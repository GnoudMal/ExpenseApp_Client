import React, { useEffect, useState } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { View, Text, StyleSheet, Image, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '../component/Checkbox';
import { useDispatch, useSelector } from 'react-redux';

const ProfileScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [isEnabled, setIsEnabled] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isExpert, setIsExpert] = useState(false);
    const [selectedFields, setSelectedFields] = useState([]);
    const [loading, setLoading] = useState(true);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    // useEffect(() => {
    //     const getUserId = async () => {
    //         try {
    //             const id = await AsyncStorage.getItem('userId');
    //             if (id !== null) {
    //                 setUserId(id);
    //             } else {
    //                 console.warn('No userId found in AsyncStorage');
    //             }
    //         } catch (error) {
    //             console.error('Failed to load userId from AsyncStorage', error);
    //         }
    //     };

    //     getUserId();
    // }, []);

    const { userInfo } = useSelector(state => state.user);
    const userId = userInfo ? userInfo.id : null;

    console.log(userInfo);


    useEffect(() => {
        if (userInfo) {
            setLoading(false);
        }
    }, [userInfo]);


    const handleLogout = async () => {
        Alert.alert(
            "Confirm Logout",
            "Are you sure you want to log out?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: async () => {
                        try {
                            // Clear AsyncStorage data
                            // await AsyncStorage.removeItem('userInfo');
                            // await AsyncStorage.removeItem('userId');
                            // await AsyncStorage.removeItem('userToken');

                            // Dispatch logout action to clear Redux state
                            dispatch(logout());

                            console.log('Logged out successfully');

                            // Navigate to LoginScreen
                            navigation.navigate('LoginScreen');
                        } catch (error) {
                            console.error('Error during logout:', error);
                        }
                    }
                }
            ]
        );
    };


    const handleFieldChange = (field) => {
        setSelectedFields(prevFields =>
            prevFields.includes(field)
                ? prevFields.filter(f => f !== field)
                : [...prevFields, field]
        );
    };

    console.log(isExpert);

    const handleSave = async () => {
        await saveExpertiseFields(selectedFields);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4e9bde" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <View></View>
                    <Text style={styles.headerTitle}>Profile</Text>
                    <Icon name="ellipsis-horizontal" size={24} />
                </View>

                <View style={styles.profileSection}>
                    <Image
                        style={styles.profileImage}
                        source={{ uri: userInfo.avatarUrl || 'https://nhadepso.com/wp-content/uploads/2023/03/cap-nhat-50-hinh-anh-dai-dien-facebook-mac-dinh-dep-doc-la_2.jpg' }}
                    />
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>{userInfo.name}</Text>
                        <Text style={styles.profileProgram}>@GnoudMal</Text>
                    </View>
                    <TouchableOpacity style={styles.editButton}>
                        <Text style={styles.editButtonText}>Chỉnh sửa</Text>
                    </TouchableOpacity>
                </View>



                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('PersonalDetail')} style={styles.sectionItem}>
                        <Icon name="person-outline" size={24} />
                        <Text style={styles.sectionItemText}>Thông tin cá nhân</Text>
                        <Icon name="chevron-forward-outline" size={24} />
                    </TouchableOpacity>
                    <View style={styles.sectionItem}>
                        <Icon name="trophy-outline" size={24} />
                        <Text style={styles.sectionItemText}>Thành Lưu</Text>
                        <Icon name="chevron-forward-outline" size={24} />
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('FriendsListScreen')} style={styles.sectionItem}>
                        <Icon2 name="account-multiple" size={24} />
                        <Text style={styles.sectionItemText}>Bạn Bè</Text>
                        <Icon name="chevron-forward-outline" size={24} />
                    </TouchableOpacity>

                </View>



                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Notification</Text>
                    <View style={styles.sectionItem}>
                        <Icon name="notifications-outline" size={24} />
                        <Text style={styles.sectionItemText}>Pop-up Notification</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Thêm</Text>
                    <View style={styles.sectionItem}>
                        <Icon name="mail-outline" size={24} />
                        <Text style={styles.sectionItemText}>Liên hệ với chúng tôi</Text>
                        <Icon name="chevron-forward-outline" size={24} />
                    </View>
                    <View style={styles.sectionItem}>
                        <Icon name="lock-closed-outline" size={24} />
                        <Text style={styles.sectionItemText}>Chính sách bảo mật</Text>
                        <Icon name="chevron-forward-outline" size={24} />
                    </View>
                    <View style={styles.sectionItem}>
                        <Icon name="settings-outline" size={24} />
                        <Text style={styles.sectionItemText}>Cài đặt</Text>
                        <Icon name="chevron-forward-outline" size={24} />
                    </View>
                    <TouchableOpacity onPress={handleLogout} style={styles.sectionItem}>
                        <Icon name="log-out-outline" size={24} />
                        <Text style={styles.sectionItemText}>Đăng Xuất</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#FFF'
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFF'
    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 16
    },
    profileInfo: {
        flex: 1
    },
    profileName: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    profileProgram: {
        fontSize: 14,
        color: '#888'
    },
    editButton: {
        backgroundColor: '#4e9bde',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 5
    },
    editButtonText: {
        color: '#FFF',
        fontSize: 14
    },
    statsSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 16,
        backgroundColor: '#FFF'
    },
    statBox: {
        alignItems: 'center'
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    statLabel: {
        fontSize: 14,
        color: '#888'
    },
    section: {
        backgroundColor: '#FFF',
        marginTop: 10,
        paddingVertical: 16,
        paddingHorizontal: 16
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
    },
    sectionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10
    },
    sectionItemText: {
        fontSize: 16,
        flex: 1,
        marginLeft: 10
    },
    saveButton: {
        backgroundColor: '#4e9bde',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 10
    },
    saveButtonText: {
        color: '#FFF',
        fontSize: 16,
        textAlign: 'center'
    },
    adminSection: {
        backgroundColor: '#FFF',
        marginTop: 10,
        paddingVertical: 16,
        paddingHorizontal: 16
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ProfileScreen;
