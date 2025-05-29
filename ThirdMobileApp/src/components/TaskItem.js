import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TaskItem({ task }) {
	return (
		<View style={[styles.item, task.completed && styles.completed]}>
			<Text style={styles.text}>{task.title}</Text>
			{task.completed && <Text style={styles.status}>✅</Text>}
		</View>
	);
}

const styles = StyleSheet.create({
	item: { padding: 15, borderBottomWidth: 1, borderColor: '#ccc', flexDirection: 'row', justifyContent: 'space-between' },
	completed: { backgroundColor: '#d4edda' },
	text: { fontSize: 16 },
	status: { fontSize: 16 },
});
