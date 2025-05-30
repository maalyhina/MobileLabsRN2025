import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';

const HomeScreen = ({ navigation }) => {
    const [storageInfo, setStorageInfo] = useState({
        total: 0,
        used: 0,
        free: 0,
    });

    useEffect(() => {
        const fetchStorageInfo = async () => {
            const info = await FileSystem.getFreeDiskStorageAsync();
            const total = await FileSystem.getTotalDiskCapacityAsync();
            const free = info;
            const used = total - free;

            setStorageInfo({
                total: total / 1024 / 1024 / 1024, // GB
                used: used / 1024 / 1024 / 1024,
                free: free / 1024 / 1024 / 1024,
            });
        };

        fetchStorageInfo();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>📊 Storage Info</Text>
            <Text style={styles.info}>
                Total: {storageInfo.total.toFixed(2)} GB
            </Text>
            <Text style={styles.info}>
                Used: {storageInfo.used.toFixed(2)} GB
            </Text>
            <Text style={styles.info}>
                Free: {storageInfo.free.toFixed(2)} GB
            </Text>

            <View style={styles.buttonContainer}>
                <Button
                    title="📁 Open Directory"
                    onPress={() => navigation.navigate('Directory')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    info: { fontSize: 16, marginBottom: 5 },
    buttonContainer: { marginTop: 30 },
});

export default HomeScreen;
