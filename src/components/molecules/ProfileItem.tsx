import * as React from 'react'
import styled from "styled-components/native";
import {colors} from '../../globals/colors'
import { SubHeaderText } from '../atoms/SubHeaderText';

interface Props {
    title: string
    data: string
    isWhite?: boolean
    bigItem?: boolean
}

const BackgroundContainer = styled.View<{isWhite: boolean, bigItem: boolean}>`
    height: 200px;
    width: ${props => props.bigItem ? '300px' : ' 150px'};
    background-color: ${props => props.isWhite ? colors.mainWhite : colors.mainPurple};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    margin-right: 10px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
`

const ProfileItem: React.FC<Props> = ({title, data, isWhite, bigItem}) => {

    return (
        <BackgroundContainer bigItem={bigItem} isWhite={isWhite} >
            <SubHeaderText style={{color: isWhite? colors.mainBlack : colors.mainWhite, fontSize: 13}}>{title}</SubHeaderText>
            <SubHeaderText style={{color: isWhite? colors.mainBlack : colors.mainWhite, fontSize: 45}}>{data}</SubHeaderText>
        </BackgroundContainer>
    )
}

export default ProfileItem 
