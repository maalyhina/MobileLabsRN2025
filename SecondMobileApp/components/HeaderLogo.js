import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

export default function Header({ title, onSearchPress }) {
    const { colors } = useTheme();

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 16,
            }}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                    source={require('../assets/steam_logo.png')}
                    style={{ width: 30, height: 30, marginRight: 10 }}
                    resizeMode="contain"
                />

                <Text style={{ color: colors.text, fontSize: 22, fontWeight: 'bold' }}>
                    {title}
                </Text>
            </View>

            {onSearchPress && (
                <TouchableOpacity onPress={onSearchPress}>
                    <Ionicons name="search" size={24} color={colors.text} />
                </TouchableOpacity>
            )}
        </View>
    );
}
