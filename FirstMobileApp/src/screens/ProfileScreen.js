import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';

export default function RegistrationScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');

    const handleRegister = () => {
        if (!email || !password || !confirmPassword || !lastName || !firstName) {
            Alert.alert('Помилка', 'Будь ласка, заповніть всі поля');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Помилка', 'Паролі не співпадають');
            return;
        }
        Alert.alert('Вітаємо!', `Користувача ${lastName} ${firstName} успішно зараєстровано`);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Реєстрація</Text>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Електронна пошта</Text>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Пароль</Text>
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Пароль(ще раз)</Text>
                <TextInput
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    style={styles.input}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Прізвище</Text>
                <TextInput
                    value={lastName}
                    onChangeText={setLastName}
                    style={styles.input}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Ім'я</Text>
                <TextInput
                    value={firstName}
                    onChangeText={setFirstName}
                    style={styles.input}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Зареєструватися</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 6,
        fontWeight: '600',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#007AFF',
        shadowOpacity: 0.5,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
});
