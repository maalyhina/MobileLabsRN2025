import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

const FileEditScreen = ({ route, navigation }) => {
    const { fileUri } = route.params;
    const [text, setText] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const content = await FileSystem.readAsStringAsync(fileUri);
                setText(content);
            } catch (e) {
                Alert.alert('Error', 'Не вдалося прочитати файл');
            }
        })();
    }, [fileUri]);

    const saveFile = async () => {
        try {
            await FileSystem.writeAsStringAsync(fileUri, text);
            Alert.alert('Успіх', 'Файл збережено');
            navigation.goBack();
        } catch (e) {
            Alert.alert('Error', 'Не вдалося зберегти файл');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                multiline
                value={text}
                onChangeText={setText}
            />
            <Button title="Save" onPress={saveFile} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    textInput: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        textAlignVertical: 'top',
    },
});

export default FileEditScreen;
