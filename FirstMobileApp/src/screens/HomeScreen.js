import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';

const news = Array(8).fill({
    title: 'Заголовок новини',
    date: 'Дата новини',
    text: 'Короткий текст новини',
});

export default function HomeScreen() {
    const renderItem = () => (
        <View style={styles.newsItem}>
            <Image source={require('../assets/news.png')} style={styles.image} />
            <View>
                <Text style={styles.title}>Заголовок новини</Text>
                <Text style={styles.date}>Дата новини</Text>
                <Text style={styles.text}>Короткий текст новини</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Новини</Text>
            <FlatList
                data={news}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, backgroundColor: '#fff' },
    logo: { width: '100%', height: 50, resizeMode: 'contain', marginBottom: 10 },
    header: { fontSize: 22, fontWeight: 'bold', marginVertical: 10, textAlign: 'center' },
    newsItem: { flexDirection: 'row', marginVertical: 8 },
    image: { width: 50, height: 50, marginRight: 10 },
    title: { fontWeight: 'bold' },
    date: { fontSize: 12, color: 'gray' },
    text: { fontSize: 12 },
    footer: { textAlign: 'center', marginTop: 10, fontSize: 12, color: 'gray' },
});
