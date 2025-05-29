import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import TaskItem from '../src/components/TaskItem';
import initialTasks from '../src/data/tasks';

export default function TasksScreen() {
    const [tasks, setTasks] = useState(initialTasks);

    const completeTask = (id) => {
        setTasks(prev =>
            prev.map(task => task.id === id ? { ...task, completed: true } : task)
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <TaskItem task={item} onComplete={completeTask} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
});
