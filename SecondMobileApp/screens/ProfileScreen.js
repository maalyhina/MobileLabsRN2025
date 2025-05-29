import React, { useState } from 'react';
import {
    FlatList,
    Image,
    Switch,
    LayoutAnimation,
    Platform,
    UIManager,
    Pressable,
} from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from '@react-navigation/native';

// Для Android потрібен дозвіл на LayoutAnimation
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const options = [
    { id: '1', label: 'Change Theme', key: 'settings' },
    { id: '2', label: 'Logout', key: 'logout' },
];

export default function ProfileScreen({ setIsDarkTheme, isDarkTheme }) {
    const { colors } = useTheme();
    const [showThemeToggle, setShowThemeToggle] = useState(false);

    const toggleSettings = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShowThemeToggle(prev => !prev);
    };

    const renderItem = ({ item }) => (
        <MenuItem
            onPress={() => {
                if (item.key === 'settings') {
                    toggleSettings();
                } else if (item.key === 'logout') {
                    // Тут можна додати логіку виходу
                    console.log('Logging out...');
                }
            }}
        >
            <MenuText style={{ color: colors.text }}>{item.label}</MenuText>
        </MenuItem>
    );

    return (
        <Container style={{ backgroundColor: colors.background }}>
            <ProfileSection>
                <AvatarWrapper>
                    <Avatar>
                        <Image
                            source={require('../assets/user.png')}
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 999,
                            }}
                            resizeMode="cover"
                        />
                    </Avatar>

                    <StatusDot style={{ borderColor: colors.background }} />
                </AvatarWrapper>
                <Name style={{ color: colors.text }}>Ангеліна Малихіна</Name>
                <Group style={{ color: colors.border }}>ВТ-23-1</Group>
            </ProfileSection>

            <MenuCard style={{ backgroundColor: colors.card }}>
                <FlatList
                    data={options}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    scrollEnabled={false}
                />
            </MenuCard>

            {showThemeToggle && (
                <ThemeToggle style={{ backgroundColor: colors.card }}>
                    <ToggleLabel style={{ color: colors.text }}>🌙 Темна тема</ToggleLabel>
                    <Switch
                        value={isDarkTheme}
                        onValueChange={setIsDarkTheme}
                        thumbColor={isDarkTheme ? '#2196F3' : '#f4f3f4'}
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                    />
                </ThemeToggle>
            )}
        </Container>
    );
}
const Container = styled.View`
    flex: 1;
    padding: 80px 20px 0;
    align-items: center;
`;

const ProfileSection = styled.View`
    align-items: center;
    margin-bottom: 30px;
`;

const AvatarWrapper = styled.View`
    position: relative;
`;

const Avatar = styled.View`
    width: 90px;
    height: 90px;
    border-radius: 45px;
    justify-content: center;
    align-items: center;
`;

const StatusDot = styled.View`
    position: absolute;
    bottom: 4px;
    right: 4px;
    width: 16px;
    height: 16px;
    border-radius: 8px;
    background-color: #00ff00;
    border-width: 2px;
`;

const Name = styled.Text`
    font-size: 18px;
    font-weight: 600;
    margin-top: 10px;
`;

const Group = styled.Text`
    font-size: 14px;
`;

const MenuCard = styled.View`
    width: 100%;
    border-radius: 12px;
    overflow: hidden;
`;

const MenuItem = styled(Pressable)`
    padding: 16px 20px;
    border-bottom-width: 1px;
    border-bottom-color: #2c2f38;
`;

const MenuText = styled.Text`
    font-size: 16px;
`;

const ThemeToggle = styled.View`
    margin-top: 20px;
    width: 100%;
    border-radius: 12px;
    padding: 16px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const ToggleLabel = styled.Text`
    font-size: 16px;
`;
