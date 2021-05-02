import Auth from '@aws-amplify/auth';
import { DataStore, Predicates } from '@aws-amplify/datastore';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { View } from 'react-native';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from "styled-components/native";
import { VerticalFlexContainer } from '../../components/atoms/VerticalFlexContainer';
import PurpleButton from '../../components/molecules/PurpleButton';
import UserInputField from '../../components/molecules/UserInputField';
import { colors } from '../../globals/colors';
import { PublicStatSet, StatSet, UserInfo, UserStats } from '../../models';
import { RootStackParams } from '../RootStackParams';

type ScreenRouteProp = RouteProp<RootStackParams, 'SignIn'>
type ScreenNavigationProp = StackNavigationProp<RootStackParams, 'SignIn'>

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
const SignIn: React.FC<Props> = ({ navigation }) => {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const signIn = async () => {
        try {
            await Auth.signIn(email, password);
            const user = await Auth.currentAuthenticatedUser()
            console.log(user)
            navigation.navigate("Main")
        } catch (error) {
            showMessage({
                message: "Dit pasword eller din email er forkert",
                type: "danger",
                duration: 6000
            });
            console.log('error signing in', error);
        }
    }

    const signInClick = async () => {
        signIn()

    }

    const deleteAll = async () => {
        await DataStore.delete(StatSet, Predicates.ALL);
    }


    return (
        <VerticalFlexContainer style={{ width: '100%', height: '100%' }}>
            <View>
                <VerticalFlexContainer style={{ height: '46%', backgroundColor: colors.backgroundBlue }}>
                    <HeaderText>HELLO!</HeaderText>
                </VerticalFlexContainer>
                <VerticalFlexContainer style={{ height: '60%', backgroundColor: colors.mainWhite, borderRadius: 30 }}>
                    <SubHeaderText>Sign In</SubHeaderText>
                    <UserInputField setValue={setEmail} placeholder="Email here..." />
                    <UserInputField isPassword setValue={setPassword} placeholder="Password here..." />
                    <PurpleButton buttonText="Sign In!" onClick={signInClick} />
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <SubHeaderText style={{ fontSize: 17, marginTop: 20, marginLeft: 10 }}>Sign Up</SubHeaderText>
                    </TouchableOpacity>

                </VerticalFlexContainer>
            </View>

        </VerticalFlexContainer>
    )
}

export default SignIn