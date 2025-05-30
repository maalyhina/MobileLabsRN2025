import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';

const FileViewScreen = ({ route }) => {
    const { fileUri } = route.params;
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const fileContent = await FileSystem.readAsStringAsync(fileUri);
                setContent(fileContent);
            } catch (error) {
                Alert.alert('Помилка', 'Не вдалося зчитати файл');
            } finally {
                setIsLoading(false);
            }
        })();
    }, [fileUri]);

    const saveFile = async () => {
        try {
            await FileSystem.writeAsStringAsync(fileUri, content);
            Alert.alert('Успіх', 'Файл збережено');
        } catch (error) {
            Alert.alert('Помилка', 'Не вдалося зберегти файл');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Шлях: {fileUri}</Text>
            {isLoading ? (
                <Text>Завантаження...</Text>
            ) : (
                <>
                    <TextInput
                        style={styles.textInput}
                        multiline
                        value={content}
                        onChangeText={setContent}
                    />
                    <View style={styles.buttonWrapper}>
                        <Button title="Зберегти" onPress={saveFile} />
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    label: { fontWeight: 'bold', marginBottom: 8 },
    textInput: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 16,
        textAlignVertical: 'top',
    },
    buttonWrapper: {
        marginBottom: 20,
    },
});

export default FileViewScreen;
