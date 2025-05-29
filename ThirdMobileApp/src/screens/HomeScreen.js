import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Button, Animated } from 'react-native';
import ClickableObject from '../components/ClickableObject';

export default function HomeScreen({ navigation }) {
	const [score, setScore] = useState(0);

	const handlePoints = (points) => {
		setScore(prev => prev + points);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.score}>Очки: {score}</Text>
			<ClickableObject onScore={handlePoints} />
			<Button title="Перейти до завдань" onPress={() => navigation.navigate('Tasks')} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
	score: { fontSize: 32, fontWeight: 'bold', marginBottom: 20 },
});
