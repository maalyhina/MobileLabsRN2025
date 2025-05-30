// DirectoryScreen.js
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Button,
    TextInput,
    Modal,
} from 'react-native';
import * as FileSystem from 'expo-file-system';

const ROOT_DIR = FileSystem.documentDirectory + 'AppData/';

const DirectoryScreen = ({ navigation }) => {
    const [currentPath, setCurrentPath] = useState(ROOT_DIR);
    const [items, setItems] = useState([]);
    const [history, setHistory] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newItemName, setNewItemName] = useState('');
    const [isCreatingFolder, setIsCreatingFolder] = useState(true);

    useEffect(() => {
        (async () => {
            const dirInfo = await FileSystem.getInfoAsync(ROOT_DIR);
            if (!dirInfo.exists) {
                await FileSystem.makeDirectoryAsync(ROOT_DIR, { intermediates: true });
            }
            readDirectory(ROOT_DIR);
        })();
    }, []);

    const readDirectory = async (path) => {
        try {
            const files = await FileSystem.readDirectoryAsync(path);
            const itemsWithInfo = await Promise.all(
                files.map(async (fileName) => {
                    const fileInfo = await FileSystem.getInfoAsync(path + fileName);
                    return {
                        name: fileName,
                        isDirectory: fileInfo.isDirectory,
                        uri: path + fileName + (fileInfo.isDirectory ? '/' : ''),
                        size: fileInfo.size,
                        modificationTime: fileInfo.modificationTime,
                    };
                })
            );
            setItems(itemsWithInfo);
            setCurrentPath(path);
        } catch (e) {
            Alert.alert('Error', 'Не вдалося прочитати директорію');
        }
    };

    const onItemPress = (item) => {
        if (item.isDirectory) {
            setHistory((prev) => [...prev, currentPath]);
            readDirectory(item.uri);
        } else {
            navigation.navigate('FileView', { fileUri: item.uri });
        }
    };

    const goBack = () => {
        if (history.length === 0) return;
        const prevPath = history[history.length - 1];
        setHistory((prev) => prev.slice(0, prev.length - 1));
        readDirectory(prevPath);
    };

    const confirmDelete = (item) => {
        Alert.alert('Видалити?', `Видалити ${item.name}?`, [
            { text: 'Скасувати', style: 'cancel' },
            {
                text: 'Видалити', style: 'destructive', onPress: async () => {
                    await FileSystem.deleteAsync(item.uri, { idempotent: true });
                    readDirectory(currentPath);
                }
            }
        ]);
    };

    const showFileInfo = (item) => {
        const sizeStr = item.size ? `${item.size} байт` : 'невідомо';
        const modStr = item.modificationTime ? new Date(item.modificationTime * 1000).toLocaleString() : 'невідомо';
        Alert.alert(
            'Інформація про файл',
            `Назва: ${item.name}\nТип: ${item.isDirectory ? 'Папка' : 'Файл'}\nРозмір: ${sizeStr}\nОстання зміна: ${modStr}`
        );
    };

    const createItem = async () => {
        const fullPath = currentPath + newItemName + (isCreatingFolder ? '/' : '.txt');
        if (isCreatingFolder) {
            await FileSystem.makeDirectoryAsync(fullPath, { intermediates: true });
        } else {
            await FileSystem.writeAsStringAsync(fullPath, '');
        }
        setShowCreateModal(false);
        setNewItemName('');
        readDirectory(currentPath);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => onItemPress(item)}
            onLongPress={() => showFileInfo(item)}
        >
            <Text style={{ fontWeight: item.isDirectory ? 'bold' : 'normal' }}>
                {item.isDirectory ? '📁 ' : '📄 '}{item.name}
            </Text>
            <Button title="❌" color="red" onPress={() => confirmDelete(item)} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.pathText}>Поточний шлях: {currentPath.replace(ROOT_DIR, '') || '/'}</Text>

            <View style={styles.buttonRow}>
                <Button title="Назад" onPress={goBack} disabled={history.length === 0} />
                <Button title="+ Папка" onPress={() => { setIsCreatingFolder(true); setShowCreateModal(true); }} />
                <Button title="+ Файл" onPress={() => { setIsCreatingFolder(false); setShowCreateModal(true); }} />
            </View>

            <FlatList
                data={items}
                keyExtractor={(item) => item.uri}
                renderItem={renderItem}
                style={{ marginTop: 10 }}
            />

            <Modal visible={showCreateModal} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>{isCreatingFolder ? 'Нова папка' : 'Новий .txt файл'}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Назва"
                            value={newItemName}
                            onChangeText={setNewItemName}
                        />
                        <View style={styles.buttonRow}>
                            <Button title="Скасувати" onPress={() => setShowCreateModal(false)} />
                            <Button title="Створити" onPress={createItem} disabled={!newItemName.trim()} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    pathText: { fontWeight: 'bold', fontSize: 16 },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
});

export default DirectoryScreen;
