import React, { useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from '@react-navigation/native';
import Header from '../components/HeaderLogo';
import GameCard from '../components/GameCard'; // <-- імпорт GameCard

const GAME_DATA = {
    'Top Sellers': [
        {
            id: '1',
            title: 'Grand Theft Auto V',
            platform: 'Windows',
            oldPrice: '$20',
            newPrice: '$10',
            discount: '-50%',
            image: { uri: 'https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg' },
        },
        {
            id: '2',
            title: 'Battlefield 4™',
            platform: 'Windows',
            newPrice: '$35',
            image: { uri: 'https://cdn.akamai.steamstatic.com/steam/apps/1238860/header.jpg' },
        },
    ],
    'Free to play': [
        {
            id: '3',
            title: 'Warframe',
            platform: 'Windows, Mac',
            newPrice: 'Free',
            image: { uri: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/230410/73f2628439b0f5e28bf9398405a78f8d5dedd73b/header.jpg?t=1747840075' },
        },
    ],
    'Early Access': [
        {
            id: '4',
            title: 'Horizon Zero Dawn',
            platform: 'Windows',
            newPrice: '$38',
            image: { uri: 'https://cdn.akamai.steamstatic.com/steam/apps/1151640/header.jpg' },
        },
    ],
};

export default function StoreScreen() {
    const { colors } = useTheme();
    const [activeTab, setActiveTab] = useState('Top Sellers');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const filteredGames = (GAME_DATA[activeTab] || []).filter((game) =>
        game.title.toLowerCase().includes(searchQuery.toLowerCase())
    );


    const renderGameItem = ({ item }) => (
        <GameCard game={item} textColor={colors.text} />
    );

    const renderHeader = () => (
        <View>
            <Header title="Store" onSearchPress={() => setIsSearching(true)} />

            {isSearching && (
                <SearchInput
                    placeholder="Search games..."
                    placeholderTextColor="#888"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    autoFocus
                />
            )}

            <Banner>
                <BannerImage source={{ uri: 'https://cdn.akamai.steamstatic.com/steam/apps/381210/header.jpg' }} />
                <BannerTextContainer>
                    <BannerTitle>Dead by Daylight</BannerTitle>
                    <BannerSubtitle>Recommended by your friend, Player</BannerSubtitle>
                    <DiscountRow>
                        <DiscountBadge>
                            <DiscountText>-70%</DiscountText>
                        </DiscountBadge>
                        <StrikeText>$18</StrikeText>
                        <FinalPrice>$5</FinalPrice>
                    </DiscountRow>
                </BannerTextContainer>
            </Banner>

            <TabsContainer>
                {Object.keys(GAME_DATA).map((tab) => (
                    <TabButton
                        key={tab}
                        active={activeTab === tab}
                        onPress={() => setActiveTab(tab)}
                    >
                        <TabText>{tab}</TabText>
                    </TabButton>
                ))}
            </TabsContainer>
        </View>
    );

    return (
        <Container backgroundColor={colors.background}>
            <FlatList
                data={filteredGames}
                renderItem={renderGameItem}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={renderHeader}
                contentContainerStyle={{ paddingBottom: 80 }}
            />
        </Container>
    );
}

const Container = styled.View`
  flex: 1;
  padding: 30px 16px 0 16px;
  background-color: ${(props) => props.backgroundColor};
`;

const SearchInput = styled.TextInput`
  background-color: #2c2f3f;
  color: #fff;
  padding: 8px 12px;
  border-radius: 8px;
  margin-bottom: 12px;
`;

const Banner = styled.View`
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
`;

const BannerImage = styled.Image`
  width: 100%;
  height: 180px;
`;

const BannerTextContainer = styled.View`
  position: absolute;
  bottom: 10px;
  left: 10px;
`;

const BannerTitle = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;

const BannerSubtitle = styled.Text`
  color: #ddd;
  font-size: 12px;
  margin: 4px 0;
`;

const DiscountRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StrikeText = styled.Text`
  color: #ccc;
  text-decoration: line-through;
  margin: 0 6px;
`;

const FinalPrice = styled.Text`
  color: #fff;
  font-weight: bold;
`;

const DiscountBadge = styled.View`
  background-color: #4caf50;
  border-radius: 4px;
  padding: 2px 6px;
`;

const DiscountText = styled.Text`
  color: #fff;
  font-size: 12px;
  font-weight: bold;
`;

const TabsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const TabButton = styled(TouchableOpacity)`
  background-color: ${(props) => (props.active ? '#1E88E5' : '#2c2f3f')};
  padding: 6px 12px;
  border-radius: 20px;
`;

const TabText = styled.Text`
  color: #fff;
  font-size: 13px;
`;

const GameItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

const GameImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 6px;
`;

const GameInfo = styled.View`
  flex: 1;
  margin-left: 10px;
`;

const GameTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => props.color};
`;

const PlatformText = styled.Text`
  color: #aaa;
  font-size: 12px;
`;

const GamePrice = styled.View`
  align-items: flex-end;
`;

const OldPrice = styled.Text`
  color: #aaa;
  text-decoration: line-through;
  font-size: 12px;
`;

const NewPrice = styled.Text`
  font-weight: bold;
  color: ${(props) => props.color};
`;
