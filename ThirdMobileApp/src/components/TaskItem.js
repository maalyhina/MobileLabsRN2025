import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TaskItem({ task }) {
    return (
        <View style={styles.taskContainer}>
            <Text style={[styles.taskText, task.done && styles.done]}>
                {task.title}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    taskContainer: {
        padding: 12,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    taskText: {
        fontSize: 18,
    },
    done: {
        textDecorationLine: 'line-through',
        color: 'green',
    },
});
