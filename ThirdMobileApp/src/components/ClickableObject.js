import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';

export default function ClickableObject({ onTap, onLongPress }) {
    return (
        <Pressable
            onPress={onTap}
            onLongPress={onLongPress}
            style={({ pressed }) => [
                styles.box,
                { backgroundColor: pressed ? '#ddd' : '#3498db' },
            ]}
        >
            <View />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    box: {
        width: 150,
        height: 150,
        borderRadius: 10,
    },
});
