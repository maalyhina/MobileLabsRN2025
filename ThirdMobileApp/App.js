import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import TasksScreen from './src/screens/TasksScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Зробити 10 кліків', done: false },
        { id: 2, title: 'Зробити 5 подвійних кліків', done: false },
        { id: 3, title: "Утримувати об'єкт 3 секунди", done: false },
        { id: 4, title: "Перетягнути об'єкт", done: false },
    ]);

    const markTaskDone = (id) => {
        setTasks((prev) => prev.map(t => t.id === id ? { ...t, done: true } : t));
    };

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home">
                    {(props) => <HomeScreen {...props} tasks={tasks} markTaskDone={markTaskDone} />}
                </Stack.Screen>
                <Stack.Screen name="Tasks">
                    {(props) => <TasksScreen {...props} tasks={tasks} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
