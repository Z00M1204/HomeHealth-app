import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'
import { CenterFlexContainer } from '../../../components/atoms/CenterFlexContainer'
import { VerticalFlexContainer } from '../../../components/atoms/VerticalFlexContainer'
import HomeHeader from '../../../components/molecules/HomeHeader'
import UserImage from '../../../components/molecules/UserImage'
import { TabScreenStackParams } from '../TabScreenStackParams'
import styled from 'styled-components/native'
import { colors } from '../../../globals/colors'
import { HorizontalFlexContainer } from '../../../components/atoms/HorizontalFlexContainer'
import ProfileItem from '../../../components/molecules/ProfileItem'
import { Image, Text, View } from 'react-native'
import PurpleButton from '../../../components/molecules/PurpleButton'
import Auth from '@aws-amplify/auth'
import { DataStore, SortDirection } from '@aws-amplify/datastore'
import { PublicStatSet, StatSet, UserInfo } from '../../../models'

type ScreenRouteProp = RouteProp<TabScreenStackParams, 'ProfileScreen'>
type ScreenNavigationProp = StackNavigationProp<TabScreenStackParams, 'ProfileScreen'>

type Props = {
    route: ScreenRouteProp
    navigation: ScreenNavigationProp
}

const HeaderText = styled.Text`
    font-size: 20px;
    color: ${colors.mainBlack};
    font-weight: 700;
    margin-top: 20px;
`

const ProfileScreen: React.FC<Props> = ({ navigation }) => {

    const [email, setEmail] = React.useState('')
    const [highestAirQual, setHighestAirQual] = React.useState(0)
    const [loaded, setLoaded] = React.useState(false)
    const [recAmount, setRecAmount] = React.useState(0)
    
    //Effect hook used to start the setInterval function when the screen renders
    React.useEffect(() => {
        //setInterval funciton to call the getUserInfo() funciton, every 5th second.
        const interval = setInterval(() => {
            getUserInfo()
        }, 5000);

        return () => clearInterval(interval);
    }, [])
    //Function used to get user information from AWS Datastore
    const getUserInfo = async () => {
        const daUser = await (Auth.currentAuthenticatedUser())
        const userEmail = daUser.attributes.email
        setEmail(userEmail)
        const statSets = await DataStore.query(StatSet, c => c.Username("eq", userEmail), {
            sort: s => s.AirQuality(SortDirection.DESCENDING)
        });
        setHighestAirQual(statSets[0].AirQuality)
        setRecAmount(statSets.length)
        setLoaded(true)
    }

    //Function used to sign out the current user
    const signOut = async () => {
        try {
            const user = await Auth.currentAuthenticatedUser()
            await user.signOut();
        } catch (error) {
        }
        navigation.navigate("SignIn")
    }

    //Function used to call the signOut() function
    const signOutClick = () => {
        signOut()
    }

    return (
        <VerticalFlexContainer style={{ height: '100%', width: '100%' }}>
            {loaded && (
                <View>
                    <CenterFlexContainer style={{ height: '20%', width: '100%', marginTop: 20 }}>
                        <HeaderText>{email}</HeaderText>
                    </CenterFlexContainer>
                    <CenterFlexContainer>
                        <HorizontalFlexContainer style={{ width: '85%', height: 200 }}>
                            <ProfileItem title="Your Air Quality Record" data={highestAirQual !== null ? highestAirQual.toString() : '0'} bigItem />
                        </HorizontalFlexContainer>
                    </CenterFlexContainer>
                    <CenterFlexContainer>
                        <VerticalFlexContainer style={{ width: '85%', height: 200, marginTop: 15 }}>
                            <ProfileItem title="We have captured your temp: " data={recAmount + ' times'} bigItem isWhite />

                        </VerticalFlexContainer>
                        <VerticalFlexContainer style={{ width: 300 }}>
                            <PurpleButton isPx buttonText="Sign Out!" onClick={signOutClick} />
                        </VerticalFlexContainer>
                    </CenterFlexContainer>

                </View>
            )}
            {!loaded && (
                <CenterFlexContainer style={{ height: '100%', width: '100%' }}>
                    <Text>loading...</Text>
                </CenterFlexContainer>
            )}
        </VerticalFlexContainer>
    )
}

export default ProfileScreen