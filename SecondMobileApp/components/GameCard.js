// components/GameCard.js
import React from 'react';
import styled from 'styled-components/native';

const Card = styled.View`
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

const DiscountBadge = styled.View`
  background-color: #4caf50;
  border-radius: 4px;
  padding: 2px 6px;
  margin-top: 4px;
`;

const DiscountText = styled.Text`
  color: #fff;
  font-size: 12px;
  font-weight: bold;
`;

export default function GameCard({ game, textColor }) {
    return (
        <Card>
            <GameImage source={game.image} />
            <GameInfo>
                <GameTitle color={textColor}>{game.title}</GameTitle>
                <PlatformText>{game.platform}</PlatformText>
            </GameInfo>
            <GamePrice>
                {game.oldPrice && <OldPrice>{game.oldPrice}</OldPrice>}
                <NewPrice color={textColor}>{game.newPrice}</NewPrice>
                {game.discount && (
                    <DiscountBadge>
                        <DiscountText>{game.discount}</DiscountText>
                    </DiscountBadge>
                )}
            </GamePrice>
        </Card>
    );
}
