import * as React from 'react'
import { Text } from 'react-native';
import styled from "styled-components/native";
import { colors } from '../../globals/colors'

interface Props {
    setValue: any
    placeholder: string
    isPassword?: boolean
    isWhite?: boolean
}

const Container = styled.View<{isWhite?: boolean}>`
    height: 60px;
    width: 90%;
    background-color: ${props => props.isWhite ? colors.mainWhite : colors.backgroundBlue};
    border-radius: 15px;
    margin-left: 10px;
    margin-top: 20px;
    display: flex;
    justify-content: center;
`

const InputFieldContainer = styled.TextInput`
    margin-left: 10px;  
`

const UserInputField: React.FC<Props> = ({setValue, placeholder, isPassword, isWhite}) => {

    return (
        <Container isWhite={isWhite}>
            <InputFieldContainer 
                onChangeText={(e: any) => setValue(e)}
                placeholder={placeholder}
                secureTextEntry={isPassword}
            />
        </Container>
    )
}

export default UserInputField
