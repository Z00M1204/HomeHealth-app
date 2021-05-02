import * as React from 'react'
import { Text, View } from 'react-native';
import styled from "styled-components/native";
import { colors } from '../../globals/colors'
import { CenterFlexContainer } from '../atoms/CenterFlexContainer';
import { HorizontalFlexContainer } from '../atoms/HorizontalFlexContainer';
import { RoundImage } from '../atoms/RoundImage';
import { SubHeaderText } from '../atoms/SubHeaderText';
import { VerticalFlexContainer } from '../atoms/VerticalFlexContainer';
import UserImage from './UserImage';

interface Props {
    personName: string
    position: number
    imgUrl?: string
    isYou?: boolean
}

const Container = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: ${colors.mainWhite};
    border-radius: 15px;
    height: 75px;
    width: 100%;
    margin-top: 15px;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);
`

const RankContainer = styled.View`
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    width: 40%;
    height: 100%;
`

const YouContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: ${colors.mainPurple};
    border-radius: 15px;
    height: 60px;
    width: 100%;
    margin-top: 10px;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);
`

const LeaderboardItem: React.FC<Props> = ({ personName, position, imgUrl, isYou }) => {

    return (
        <View>
            {!isYou && (
                <Container>
                    <HorizontalFlexContainer style={{width: '55%'}} >
                        <SubHeaderText style={{ fontSize: 13, marginLeft: 20}}>{personName}</SubHeaderText>
                    </HorizontalFlexContainer>
                    <RankContainer>
                        <HorizontalFlexContainer style={{width: '35%', alignItems: 'center'}}>
                            <SubHeaderText style={{ fontSize: 18 }}>{position}</SubHeaderText>
                        </HorizontalFlexContainer>
                    </RankContainer>
                </Container>
            )}

            {isYou && (
                <YouContainer>
                    <HorizontalFlexContainer style={{width: '55%'}}>
                        <SubHeaderText style={{ fontSize: 18, marginLeft: 20, color: colors.mainWhite }}>You</SubHeaderText>
                    </HorizontalFlexContainer>
                    <RankContainer>
                        <HorizontalFlexContainer style={{width: '35%', alignItems: 'center'}}>
                            <SubHeaderText style={{ fontSize: 18, color: colors.mainWhite }}>{position}</SubHeaderText>
                        </HorizontalFlexContainer>
                    </RankContainer>
                </YouContainer>
            )}

        </View>

    )
}

export default LeaderboardItem
