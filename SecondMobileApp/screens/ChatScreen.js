import React, { useState } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from '@react-navigation/native';
import Header from '../components/HeaderLogo';

const chats = [
    {
        id: '1',
        name: 'Mark Dyson',
        message: "I'm already starting to play",
        date: '14 Jun',
        avatar: require('../assets/avatar.png'),
        unread: true,
    },
    {
        id: '2',
        name: 'Mark Dyson',
        message: 'You: Ok',
        date: '14 Jun',
        avatar: require('../assets/avatar.png'),
        unread: false,
    },
    {
        id: '3',
        name: 'Player123',
        message: 'You: Ok',
        date: '14 Jun',
        avatar: require('../assets/avatar.png'),
        unread: true,
    },
    {
        id: '4',
        name: 'Player',
        message: 'Hello!',
        date: '12 Jun',
        avatar: require('../assets/avatar.png'),
        unread: false,
    },
];

const friends = [
    { id: '1', name: 'John Carter', avatar: require('../assets/avatar.png') },
    { id: '2', name: 'Emma Watson', avatar: require('../assets/avatar.png') },
];

export default function ChatScreen() {
    const { colors } = useTheme();
    const [activeTab, setActiveTab] = useState('open');
    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const data = activeTab === 'open' ? chats : friends;

    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Container backgroundColor={colors.background}>
            <Header
                title="Chat"
                onSearchPress={() => setIsSearching(true)}
            />

            {/* Search input */}
            {isSearching && (
                <SearchInput
                    placeholder="Search..."
                    placeholderTextColor="#888"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    autoFocus
                />
            )}

            {/* Tabs */}
            <Tabs backgroundColor={colors.card}>
                <TabButton
                    isActive={activeTab === 'open'}
                    onPress={() => {
                        setActiveTab('open');
                        setSearchQuery('');
                    }}
                >
                    <TabText isActive={activeTab === 'open'}>Open chats</TabText>
                </TabButton>
                <TabButton
                    isActive={activeTab === 'friends'}
                    onPress={() => {
                        setActiveTab('friends');
                        setSearchQuery('');
                    }}
                >
                    <TabText isActive={activeTab === 'friends'}>My friends</TabText>
                </TabButton>
            </Tabs>

            {/* Chat / Friend list */}
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ChatItem>
                        <Avatar source={item.avatar} />
                        <ChatContent>
                            <Name color={colors.text}>{item.name}</Name>
                            {'message' in item && (
                                <Message color={colors.border}>{item.message}</Message>
                            )}
                        </ChatContent>
                        {'message' in item && (
                            <RightInfo>
                                <Date color={colors.border}>{item.date}</Date>
                                {item.unread && <UnreadDot />}
                            </RightInfo>
                        )}
                    </ChatItem>
                )}
            />
        </Container>
    );
}

// -------------------------------------
// Styled Components
// -------------------------------------

const Container = styled.View`
    flex: 1;
    padding: 40px 16px 0 16px;
    background-color: ${(props) => props.backgroundColor};
`;

const SearchInput = styled.TextInput`
    background-color: #2c2f3f;
    color: #fff;
    padding: 8px 12px;
    border-radius: 8px;
    margin-bottom: 12px;
`;

const Tabs = styled.View`
    flex-direction: row;
    border-radius: 10px;
    padding: 4px;
    margin-bottom: 16px;
    background-color: ${(props) => props.backgroundColor};
`;

const TabButton = styled.TouchableOpacity`
    flex: 1;
    align-items: center;
    padding-vertical: 8px;
    border-radius: 8px;
    background-color: ${(props) => (props.isActive ? '#3a8fff' : 'transparent')};
`;

const TabText = styled.Text`
    color: ${(props) => (props.isActive ? 'white' : '#b0b0b0')};
    font-weight: ${(props) => (props.isActive ? '600' : 'normal')};
`;

const ChatItem = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 16px;
`;

const Avatar = styled.Image`
    width: 48px;
    height: 48px;
    border-radius: 24px;
    margin-right: 12px;
`;

const ChatContent = styled.View`
    flex: 1;
`;

const Name = styled.Text`
    font-weight: bold;
    font-size: 16px;
    color: ${(props) => props.color};
`;

const Message = styled.Text`
    font-size: 14px;
    color: ${(props) => props.color};
`;

const RightInfo = styled.View`
    align-items: flex-end;
    justify-content: center;
    min-width: 60px;
`;

const Date = styled.Text`
    font-size: 12px;
    color: ${(props) => props.color};
`;

const UnreadDot = styled.View`
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: white;
    margin-top: 4px;
`;
