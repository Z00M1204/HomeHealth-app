import * as React from 'react'
import { Image } from 'react-native';
import styled from "styled-components/native";
import { colors } from '../../globals/colors'
import { CenterFlexContainer } from '../atoms/CenterFlexContainer';
import { HorizontalFlexContainer } from '../atoms/HorizontalFlexContainer';


const BackgroundContainer = styled.View`
    background-color: ${colors.mainWhite};
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);
    height: 130px;
    border-radius: 11px;
    display: flex;
    width: 47%;
    margin-left: 7px;
`

const IconBackground = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${colors.iconGray};
    height: 40px;
    width: 40px;
    border-radius: 100px;
`

const HeaderText = styled.Text`
    color: ${colors.mainBlack};
    font-size: 16px;
    font-weight: 700;
    margin-left: 10px;
`

const BodyText = styled.Text`
    color: ${colors.mainBlack};
    font-size: 24px;
    margin-bottom: 20%;
    font-weight: 700;
`

interface Props {
    iconPath: any
    title: string
    mainData: string
}

const InfoBox: React.FC<Props> = ({ iconPath, title, mainData }) => {


    return (
        <BackgroundContainer>
            <HorizontalFlexContainer style={{ height: '40%', width: '100%', marginLeft: '6%', alignItems: 'center' }}>
                <IconBackground>
                    <Image
                        style={{ height: 20, width: 20, resizeMode: 'contain' }}
                        source={iconPath}
                    />
                </IconBackground>
                <HeaderText>{title}</HeaderText>
            </HorizontalFlexContainer>
            <CenterFlexContainer style={{ height: '60%', width: '100%' }}>
                <BodyText>{mainData}</BodyText>
            </CenterFlexContainer>

        </BackgroundContainer>
    )
}

export default InfoBox
