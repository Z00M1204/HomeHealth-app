import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'
import { WelcomeStackParams } from 'screens/SignUp/WelcomeStackParams'
import colors from "globals/colors";
import styled from "styled-components/native";
import { VerticalFlexContainer } from '../../components/atoms/VerticalFlexContainer';
import UserInputField from '../../components/molecules/UserInputField';
import PurpleButton from '../../components/molecules/PurpleButton';
import { DataStore } from '@aws-amplify/datastore';
import { UserInfo } from '../../models';
import Auth from '@aws-amplify/auth';

type ScreenRouteProp = RouteProp<WelcomeStackParams, 'WelcomeScreen'>
type ScreenNavigationProp = StackNavigationProp<WelcomeStackParams, 'WelcomeScreen'>

type Props = {
    route: ScreenRouteProp
    navigation: ScreenNavigationProp
}

const UsernameScreen: React.FC<Props> = ({navigation}) => {
    const [username, setUsername] = React.useState('')

    const confirmUserClick = async () => {


        navigation.navigate("SignIn")
    }

    return (
        <VerticalFlexContainer>
            <UserInputField setValue={setUsername} placeholder="Username here..." />
            <PurpleButton buttonText="Set username!" onClick={confirmUserClick} />
        </VerticalFlexContainer>
    )
}

export default UsernameScreen