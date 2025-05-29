import React from 'react';
import styled from 'styled-components/native';
import { useTheme } from '@react-navigation/native';
import { FlatList } from 'react-native';
import Header from "../components/HeaderLogo";

const optionItems = [
    { key: '1', label: 'Remove Authenticator' },
    { key: '2', label: 'My Recovery Code' },
    { key: '3', label: 'Help' },
];

export default function SafetyScreen() {
    const { colors } = useTheme();

    const renderItem = ({ item }) => (
        <OptionRow>
            <OptionText>{item.label}</OptionText>
        </OptionRow>
    );

    return (
        <Container>
            <Header
                title="Safety"/>
            <Tabs>
                <TabButton bg="#394b59">
                    <TabText>Guard</TabText>
                </TabButton>
                <TabButton bg="#2b2f35">
                    <TabText>Confirmations</TabText>
                </TabButton>
            </Tabs>

            {/* Code */}
            <CodeContainer>
                <LoggedInText>Logged in as player</LoggedInText>
                <Code>N5KCV</Code>
                <CodeBar />
            </CodeContainer>

            {/* Info */}
            <InfoText>
                You’ll enter your code each time you enter your password to sign in to your Steam account.
            </InfoText>
            <TipText>
                Tip: If you don’t share your PC, you can select
                <LinkText> “Remember my password” </LinkText>
                when you sign in to the PC client to enter your password and authenticator code less often.
            </TipText>

            {/* Options */}
            <OptionsContainer>
                <FlatList
                    data={optionItems}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.key}
                />
            </OptionsContainer>
        </Container>
    );
}

const Container = styled.View`
  flex: 1;
  padding: 30px 20px 0 20px;
  background-color: ${(props) => props.theme.colors.background};
`;



const Tabs = styled.View`
  flex-direction: row;
  margin-bottom: 30px;
  border-radius: 8px;
  overflow: hidden;
`;

const TabButton = styled.TouchableOpacity`
  flex: 1;
  padding-vertical: 10px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.bg || '#2b2f35'};
`;

const TabText = styled.Text`
  color: #fff;
  font-size: 14px;
`;

const CodeContainer = styled.View`
  align-items: center;
  margin-bottom: 20px;
`;

const LoggedInText = styled.Text`
  color: #888;
  margin-bottom: 8px;
`;

const Code = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: #fff;
`;

const CodeBar = styled.View`
  height: 4px;
  width: 100px;
  background-color: #1e88e5;
  margin-top: 8px;
  border-radius: 2px;
`;

const InfoText = styled.Text`
  font-size: 13px;
  color: #ccc;
  text-align: center;
  margin-bottom: 10px;
`;

const TipText = styled.Text`
  font-size: 13px;
  color: #ccc;
  text-align: center;
  margin-bottom: 20px;
`;

const LinkText = styled.Text`
  color: #1e88e5;
`;

const OptionsContainer = styled.View`
  background-color: #1c1f26;
  border-radius: 10px;
  overflow: hidden;
`;

const OptionRow = styled.TouchableOpacity`
  padding: 12px 16px;
  border-bottom-width: 1px;
  border-bottom-color: #2f2f2f;
`;

const OptionText = styled.Text`
  color: #fff;
  font-size: 14px;
`;
