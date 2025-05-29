import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const initialTasks = [
    { id: '1', title: 'Зробити 10 кліків', key: 'clicks', goal: 10 },
    { id: '2', title: 'Зробити подвійний клік 5 разів', key: 'doubleClicks', goal: 5 },
    { id: '3', title: 'Утримувати об\'єкт 3 секунди', key: 'holdDone', goal: true },
    { id: '4', title: 'Перетягнути об\'єкт', key: 'dragDone', goal: true },
    { id: '5', title: 'Зробити свайп вправо', key: 'swipeRight', goal: true },
    { id: '6', title: 'Зробити свайп вліво', key: 'swipeLeft', goal: true },
    { id: '7', title: 'Змінити розмір об\'єкта', key: 'pinchDone', goal: true },
    { id: '8', title: 'Отримати 100 очок', key: 'score', goal: 100 },
];

export default function TasksScreen({ route }) {
    // Отримуємо з navigation params поточні значення лічильників/станів
    const params = route?.params || {};

    // Створюємо оновлений список завдань із статусом виконання
    const tasksWithStatus = initialTasks.map(task => {
        const currentValue = params[task.key];

        let done = false;
        if (typeof task.goal === 'number') {
            done = currentValue >= task.goal;
        } else if (typeof task.goal === 'boolean') {
            done = currentValue === true;
        }

        return {
            ...task,
            done,
            currentValue,
        };
    });

    const renderItem = ({ item }) => (
        <View style={styles.taskItem}>
            <Text style={{ fontSize: 16 }}>
                {item.done ? '✅' : '❌'} {item.title} {item.goal && typeof item.goal === 'number' && `(${item.currentValue || 0}/${item.goal})`}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Статус завдань</Text>
            <FlatList
                data={tasksWithStatus}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    taskItem: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});
