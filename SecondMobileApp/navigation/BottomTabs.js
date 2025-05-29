import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StoreScreen from '../screens/StoreScreen';
import CommunityScreen from '../screens/CommunityScreen';
import ChatScreen from '../screens/ChatScreen';
import SafetyScreen from '../screens/SafetyScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function BottomTabs({ setIsDarkTheme, isDarkTheme }) {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    switch (route.name) {
                        case 'Store':
                            iconName = 'home-outline';
                            break;
                        case 'Community':
                            iconName = 'people-outline';
                            break;
                        case 'Chat':
                            iconName = 'chatbubble-ellipses-outline';
                            break;
                        case 'Safety':
                            iconName = 'shield-checkmark-outline';
                            break;
                        case 'Profile':
                            iconName = 'person-circle-outline';
                            break;
                        default:
                            iconName = 'ellipse-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    backgroundColor: '#1c1c1c',
                    borderTopColor: '#1c1c1c',
                },
                headerShown: false,
            })}
        >
            <Tab.Screen name="Store" component={StoreScreen} />
            <Tab.Screen name="Community" component={CommunityScreen} />
            <Tab.Screen name="Chat" component={ChatScreen} />
            <Tab.Screen name="Safety" component={SafetyScreen} />
            <Tab.Screen
                name="Profile"
                children={() => (
                    <ProfileScreen setIsDarkTheme={setIsDarkTheme} isDarkTheme={isDarkTheme} />
                )}
            />
        </Tab.Navigator>
    );
}
