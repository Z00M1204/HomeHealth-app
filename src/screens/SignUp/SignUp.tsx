import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { VerticalFlexContainer } from '../../components/atoms/VerticalFlexContainer';
import { colors } from '../../globals/colors';
import { RootStackParams } from '../RootStackParams';
import styled from "styled-components/native";
import UserInputField from '../../components/molecules/UserInputField';
import PurpleButton from '../../components/molecules/PurpleButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Auth from '@aws-amplify/auth';
import FlashMessage, { showMessage } from "react-native-flash-message";

type ScreenRouteProp = RouteProp<RootStackParams, 'SignUp'>
type ScreenNavigationProp = StackNavigationProp<RootStackParams, 'SignUp'>

type Props = {
    route: ScreenRouteProp
    navigation: ScreenNavigationProp
}

const HeaderText = styled.Text`
    font-size: 50px;
    color: ${colors.mainBlack};
    font-weight: 700;
    margin-top: 50px;
    margin-left: 10px;
`

const SubHeaderText = styled.Text`
    font-size: 35px;
    color: ${colors.mainBlack};
    font-weight: 700;
    margin-top: 30px;
    margin-left: 10px;  
`

const SignUp: React.FC<Props> = ({ navigation }) => {

    const [password, setPassword] = React.useState('')
    //username is an email in this case
    const [username, setUsername] = React.useState('')

    //Function used to sign up
    const signUp = async () => {
        //Function used to check if the email and password entered are valid
        const inputsAreValid = () => {
            return username.length > 6 && password.length > 8
        }

        if (!inputsAreValid()) {
            showMessage({
                message: "Dit password eller din email er forkert",
                type: "danger",
                duration: 6000
            });
        }
        //Try catch statement to sign the user up, and throw an error if the sign up fails
        try {
            const { user } = await Auth.signUp({
                username,
                password,
                attributes: {
                    email: username,
                }
            });
            navigation.navigate('ConfirmUser', { username: username, password: password })
        } catch (error) {
            showMessage({
                message: "Dit password eller din email er forkert",
                type: "danger",
                duration: 6000
            });
        }
    }

    const signUpClick = () => {
        signUp()
    }

    return (
        <VerticalFlexContainer style={{ width: '100%', height: '100%' }}>
            <VerticalFlexContainer style={{ height: '47%', backgroundColor: colors.backgroundBlue }}>
                <HeaderText>Let's start!</HeaderText>
            </VerticalFlexContainer>
            <VerticalFlexContainer style={{ height: '65%', backgroundColor: colors.mainWhite, borderRadius: 30 }}>
                <SubHeaderText>Sign Up</SubHeaderText>
                <UserInputField setValue={setUsername} placeholder="Email here..." />
                <UserInputField isPassword setValue={setPassword} placeholder="Password here..." />
                <PurpleButton buttonText="Sign Up!" onClick={signUpClick} />
                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                    <SubHeaderText style={{ fontSize: 17, marginTop: 20, marginLeft: 10 }}>Already have an account?</SubHeaderText>
                </TouchableOpacity>
            </VerticalFlexContainer>
        </VerticalFlexContainer>
    )
}

export default SignUp