import React, { useState } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/HeaderLogo';

const newsTabs = ['all', 'screenshots', 'artwork', 'workshop'];

export default function CommunityScreen() {
    const { colors } = useTheme();
    const [activeTab, setActiveTab] = useState('all');
    const [likedPosts, setLikedPosts] = useState({});
    const [likeCounts, setLikeCounts] = useState({
        1: 324,
        2: 87,
    });

    const Container = styled.View`
        flex: 1;
        padding: 40px 16px 0;
        background-color: ${(props) => props.backgroundColor};
    `;

    const TabsContainer = styled.View`
        flex-direction: row;
        background-color: #2a2a2a;
        border-radius: 10px;
        padding: 4px;
        margin-bottom: 16px;
    `;

    const TabButton = styled.TouchableOpacity`
        flex: 1;
        align-items: center;
        padding-vertical: 8px;
        border-radius: 8px;
        background-color: ${(props) => (props.active ? '#3a8fff' : 'transparent')};
    `;

    const TabText = styled.Text`
        color: ${(props) => (props.active ? 'white' : '#b0b0b0')};
        font-weight: ${(props) => (props.active ? '600' : 'normal')};
        text-transform: capitalize;
    `;

    const PostCard = styled.View`
        border-radius: 10px;
        padding: 12px;
        margin-bottom: 20px;
        background-color: ${(props) => props.backgroundColor};
        shadow-color: ${(props) => props.shadowColor};
        shadow-offset: 0px 2px;
        shadow-opacity: 0.1;
        shadow-radius: 4px;
        elevation: 3;
    `;

    const CardHeader = styled.View`
        flex-direction: row;
        align-items: center;
        margin-bottom: 10px;
    `;

    const Avatar = styled.Image`
        width: 48px;
        height: 48px;
        border-radius: 24px;
        margin-right: 12px;
    `;

    const HeaderInfo = styled.View``;

    const Title = styled.Text`
        font-weight: bold;
        color: ${(props) => props.color};
        flex-direction: row;
        align-items: center;
    `;

    const NewsTag = styled.Text`
        color: #f06292;
        font-size: 12px;
        background-color: #3f3f3f;
        padding-horizontal: 4px;
        border-radius: 4px;
        margin-left: 5px;
    `;

    const Subtitle = styled.Text`
        font-size: 12px;
        color: ${(props) => props.color};
    `;

    const PostImage = styled.Image`
        height: 150px;
        border-radius: 10px;
        margin-vertical: 10px;
    `;

    const PostTitle = styled.Text`
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 4px;
        color: ${(props) => props.color};
    `;

    const PostText = styled.Text`
        font-size: 13px;
        color: ${(props) => props.color};
    `;

    const Reactions = styled.View`
        flex-direction: row;
        margin-top: 10px;
    `;

    const ReactionButton = styled.TouchableOpacity`
        flex-direction: row;
        align-items: center;
        margin-right: 15px;
    `;

    const ReactionText = styled.Text`
        margin-left: 5px;
        color: ${(props) => props.color};
    `;

    const newsData = [
        {
            id: 1,
            avatar: 'https://seeklogo.com/images/E/eurogamer-logo-AF3E98B0F7-seeklogo.com.png',
            author: 'Eurogamer',
            tag: 'NEWS',
            date: 'yesterday • 2:20 pm',
            image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/379430/header.jpg',
            title: 'Florida tourist attraction sues Fortnite, seeks removal of in-game castle',
            text: 'Coral Castle Museum, a tourist attraction near Miami, is suing Fortnite maker Epic Games for trademark infringement and unfair competition.',
            commentsCount: 12,
        },
        {
            id: 2,
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Valve_Corporation_Logo.svg/1200px-Valve_Corporation_Logo.svg.png',
            author: 'Valve',
            tag: 'UPDATE',
            date: 'today • 9:00 am',
            image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/440/header.jpg',
            title: 'New Steam update improves game discovery',
            text: 'Steam introduces a revamped discovery queue and better personalized recommendations to help players find new favorites.',
            commentsCount: 8,
        },
    ];

    const handleLike = (id) => {
        setLikedPosts((prev) => {
            const isLiked = prev[id];
            const updatedLikes = { ...prev, [id]: !isLiked };
            setLikeCounts((counts) => ({
                ...counts,
                [id]: counts[id] + (isLiked ? -1 : 1),
            }));
            return updatedLikes;
        });
    };

    const renderPost = ({ item }) => (
        <PostCard backgroundColor={colors.card} shadowColor={colors.border}>
            <CardHeader>
                <Avatar source={{ uri: item.avatar }} />
                <HeaderInfo>
                    <Title color={colors.text}>
                        {item.author} <NewsTag>{item.tag}</NewsTag>
                    </Title>
                    <Subtitle color={colors.border}>{item.date}</Subtitle>
                </HeaderInfo>
            </CardHeader>

            <PostImage source={{ uri: item.image }} />
            <PostTitle color={colors.text}>{item.title}</PostTitle>
            <PostText color={colors.text}>{item.text}</PostText>

            <Reactions>
                <ReactionButton onPress={() => handleLike(item.id)}>
                    <Ionicons
                        name="thumbs-up"
                        size={18}
                        color={likedPosts[item.id] ? 'limegreen' : colors.border}
                    />
                    <ReactionText color={colors.text}>{likeCounts[item.id]}</ReactionText>
                </ReactionButton>
                <ReactionButton>
                    <Ionicons name="chatbubble-outline" size={18} color={colors.text} />
                    <ReactionText color={colors.text}>{item.commentsCount}</ReactionText>
                </ReactionButton>
            </Reactions>
        </PostCard>
    );

    return (
        <Container backgroundColor={colors.background}>
            <Header title="Community" />

            <TabsContainer>
                {newsTabs.map((tab) => (
                    <TabButton key={tab} active={activeTab === tab} onPress={() => setActiveTab(tab)}>
                        <TabText active={activeTab === tab}>{tab}</TabText>
                    </TabButton>
                ))}
            </TabsContainer>

            <FlatList
                data={newsData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderPost}
                showsVerticalScrollIndicator={false}
            />
        </Container>
    );
}
