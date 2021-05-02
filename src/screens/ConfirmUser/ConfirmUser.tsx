import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'
import { WelcomeStackParams } from 'screens/SignUp/WelcomeStackParams'
import colors from "globals/colors";
import styled from "styled-components/native";
import { VerticalFlexContainer } from '../../components/atoms/VerticalFlexContainer';
import UserInputField from '../../components/molecules/UserInputField';
import PurpleButton from '../../components/molecules/PurpleButton';
import Auth from '@aws-amplify/auth';
import { RootStackParams } from '../RootStackParams';
import { DataStore } from '@aws-amplify/datastore';
import { UserInfo } from '../../models';
import { CenterFlexContainer } from '../../components/atoms/CenterFlexContainer';
import { View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

type ScreenRouteProp = RouteProp<RootStackParams, 'ConfirmUser'>
type ScreenNavigationProp = StackNavigationProp<RootStackParams, 'ConfirmUser'>

type Props = {
    route: ScreenRouteProp
    navigation: ScreenNavigationProp
}

const ConfirmUser: React.FC<Props> = ({ route, navigation }) => {

    const [code, setCode] = React.useState('')

    const confirmUserClick = async () => {
        try {
            await Auth.confirmSignUp(route.params?.username, code);
            navigation.navigate("SignIn")
        } catch (error) {
            showMessage({
                message: "Fejl i confirmation kode",
                type: "danger",
                duration: 6000
            });
        }
    }

    return (
        <CenterFlexContainer>
            <View style={{ width: '100%', height: '100%', marginTop: 50, alignItems: 'center' }}>
                <UserInputField isWhite setValue={setCode} placeholder="Confirmation code here..." />
                <PurpleButton buttonText="Confirm Sign Up!" onClick={confirmUserClick} />
            </View>
        </CenterFlexContainer>
    )
}

export default ConfirmUser