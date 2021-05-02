import * as React from 'react'
import { Text } from 'react-native';
import styled from "styled-components/native";
import {colors} from '../../globals/colors'

interface Props {
    buttonText: string
    onClick: any
    isPx?: boolean
}

const Container = styled.TouchableOpacity<{isPx?: boolean}>`
    height: 55px;
    width: ${props => props.isPx ? "100%" : "90%"};
    background-color: ${colors.mainPurple};
    border-radius: 15px;
    margin-left: ${props => props.isPx ? "0px" : "10px"};
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const PurpleButton: React.FC<Props> = ({onClick, buttonText, isPx}) => {

    return (
        <Container onPress={onClick} isPx={isPx} >
            <Text style={{fontSize: 17, color: colors.mainWhite, fontWeight: '700'}}>{buttonText}</Text>
        </Container>
    )
}

export default PurpleButton
 