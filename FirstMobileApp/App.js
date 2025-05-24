import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './src/screens/HomeScreen';
import GalleryScreen from './src/screens/GalleryScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
      <View style={{ flex: 1 }}>
        {/* Хедер */}
        <View style={styles.logoContainer}>
          <Image
              source={require('./src/assets/university-colored.png')}
              style={styles.logo}
              resizeMode="contain"
          />
          <Text style={styles.logoText}>FirstMobileApp</Text>
        </View>

        <View style={{ flex: 1 }}>
          <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                  headerShown: false,
                  tabBarShowIcon: true,
                  tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Головна') iconName = 'home';
                    else if (route.name === 'Фотогалерея') iconName = 'images';
                    else if (route.name === 'Профіль') iconName = 'person';
                    return <Ionicons name={iconName} size={size} color={color} />;
                  },
                  tabBarActiveTintColor: '#007AFF',
                  tabBarInactiveTintColor: 'gray',
                  tabBarIndicatorStyle: { backgroundColor: 'transparent' },
                  tabBarStyle: {
                    backgroundColor: '#f2f2f2',
                  },
                })}
            >
              <Tab.Screen name="Головна" component={HomeScreen} />
              <Tab.Screen name="Фотогалерея" component={GalleryScreen} />
              <Tab.Screen name="Профіль" component={ProfileScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Малихіна Ангеліна Олегівна, ВТ-23-1</Text>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    marginTop: 10,
    marginRight: 10,
    marginBottom: 0,
    marginLeft: 10,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingLeft: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  logo: {
    width: 100,
    height: 40,
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000',
  },
  footer: {
    paddingBottom: 40,
    height: 70,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  footerText: {
    fontSize: 14,
    color: 'gray',
  },
});
