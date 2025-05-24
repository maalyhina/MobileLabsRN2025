import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, Dimensions } from 'react-native';

const data = Array.from({ length: 10 }).map((_, i) => ({
    id: i.toString(),
    image: require('../assets/images.jpg'),
}));

const screenWidth = Dimensions.get('window').width;
const numColumns = 2;
const blockMargin = 10;
const blockWidth = (screenWidth - blockMargin * (numColumns + 1)) / numColumns;

export default function GalleryScreen() {
    const renderItem = ({ item }) => (
        <View style={[styles.block, { width: blockWidth, margin: blockMargin / 2 }]}>
            <Image source={item.image} style={styles.image} resizeMode="cover" />
        </View>
    );

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={numColumns}
            contentContainerStyle={{ padding: blockMargin / 2 }}
            showsVerticalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    block: {
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    image: {
        width: '100%',
        height: 120,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
    },
});
