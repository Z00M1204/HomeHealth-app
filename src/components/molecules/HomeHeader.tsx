import * as React from 'react'
import styled from 'styled-components/native'
import { colors } from '../../globals/colors'
import { CenterFlexContainer } from '../atoms/CenterFlexContainer'
import { HorizontalFlexContainer } from '../atoms/HorizontalFlexContainer'
import { RoundImage } from '../atoms/RoundImage'

import { VerticalFlexContainer } from '../atoms/VerticalFlexContainer'
import UserImage from './UserImage'

interface Props {
    headerTitle: string,
    connectedStatus: string,
    hideIcon?: boolean,
}

const HeaderText = styled.Text`
    font-size: 35px;
    color: ${colors.mainBlack};
    font-weight: 700;
`

const ConnectionText = styled.Text`
    font-size: 12px;
    color: ${colors.mainBlack};
    font-weight: 700;
`

const ConnectionCircle = styled.View`
    height: 8px;
    width: 8px;
    background-color: ${colors.mainPurple};
    border-radius: 90px;
    margin-right: 10px;
`

const HomeHeader: React.FC<Props> = ({ headerTitle, connectedStatus, hideIcon,  }) => {

    return (
        <VerticalFlexContainer style={{ height: '12%', width: '100%', paddingLeft: 20, marginTop: '10%' }}>
            <HorizontalFlexContainer style={{ height: '100%', width: '100%' }} >
                <HorizontalFlexContainer style={{ height: '100%', width: '70%' }} >
                    <VerticalFlexContainer style={{ height: '100%', width: '100%' }} >
                        <HeaderText>{headerTitle}</HeaderText>
                        <HorizontalFlexContainer style={{ alignItems: 'center' }}>
                            <ConnectionCircle />
                            <ConnectionText>{connectedStatus}</ConnectionText>
                        </HorizontalFlexContainer>
                    </VerticalFlexContainer>
                </HorizontalFlexContainer>
              
            </HorizontalFlexContainer>

        </VerticalFlexContainer>
    )
}

export default HomeHeader
