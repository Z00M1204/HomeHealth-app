import Auth from '@aws-amplify/auth'
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import firebase from 'firebase'
import * as React from 'react'
import { Text, View } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import styled from "styled-components/native"
import { CenterFlexContainer } from '../../../components/atoms/CenterFlexContainer'
import { HorizontalFlexContainer } from '../../../components/atoms/HorizontalFlexContainer'
import { VerticalFlexContainer } from '../../../components/atoms/VerticalFlexContainer'
import HomeHeader from '../../../components/molecules/HomeHeader'
import InfoBox from '../../../components/molecules/InfoBox'
import { colors } from '../../../globals/colors'
import { PublicStatSet, StatSet } from '../../../models'
import { TabScreenStackParams } from '../TabScreenStackParams'
import { WelcomeStackParams } from '../WelcomeStackParams'

type ScreenRouteProp = RouteProp<TabScreenStackParams, 'HomeScreen'>
type ScreenNavigationProp = StackNavigationProp<TabScreenStackParams, 'HomeScreen'>

type Props = {
    route: ScreenRouteProp
    navigation: ScreenNavigationProp
}


//styled-components
const ProcentText = styled.Text`
    color: ${colors.mainBlack};
    font-size: 35px;
    font-weight: 700;
    margin-left: 10px;
`

const NOMText = styled.Text`
    color: ${colors.mainBlack};
    opacity: 0.7;
    font-size: 15px;
`

const HomeScreen: React.FC<Props> = () => {

    const [loaded, setLoaded] = React.useState(false)
    const [tempValue, setTempValue] = React.useState(0)
    const [humidityValue, setHumidityValue] = React.useState(0)
    const [airPresValue, setAirPresValue] = React.useState(0)
    const [airQualValue, setAirQualValue] = React.useState(0)
    const [circleText, setCircleText] = React.useState(0)

    //Effect hook used to start the setInterval function when the screen renders
    React.useEffect(() => {
        //setInterval funciton to get get the data from the Firebase database and call the newAirQualPush() and createOrUpdatePublicStats() functions, every second.
        const interval = setInterval(() => {
            firebase.database()
                .ref('/')
                .on('value', snapshot => {
                    setTempValue(Math.round(snapshot.val().temperature))
                    setHumidityValue(Math.round(snapshot.val().humidity))
                    setAirPresValue(Math.round(snapshot.val().pressure))
                    setAirQualValue(Math.round(snapshot.val().gasResistance))
                });
            newAirQualPush()
            createOrUpdatePublicStats()
        }, 1000);

        return () => {
            setLoaded(true)
            clearInterval(interval);
        }
    })

    //Function used to create or update the PublicStatSet in the AWS Datastore database
    const createOrUpdatePublicStats = async () => {
        const daUser = await Auth.currentAuthenticatedUser()
        const userEmail = daUser.attributes.email
        const user = (await DataStore.query(PublicStatSet, c => c.AuthID("eq", userEmail)));

        const statSets = await DataStore.query(StatSet, c => c.Username("eq", userEmail), {
            sort: s => s.AirQuality(SortDirection.DESCENDING)
        });

        if (user.length > 0) {
            setCircleText(statSets[0].AirQuality)
            await DataStore.save(
                PublicStatSet.copyOf(user[0], updated => {
                    updated.TopAirQuality = statSets[0].AirQuality;
                })
            );
            setCircleText(statSets[0].AirQuality)

        } else {
            const daUser = await (Auth.currentAuthenticatedUser())
            const userEmail = daUser.attributes.email
            await DataStore.save(
                new PublicStatSet({
                    AuthID: userEmail,
                    Username: userEmail,
                    TopAirQuality: statSets[0].AirQuality
                })
            );
        }
    }

    //Function used to push a new StatSet to the AWS Datastore database
    const newAirQualPush = async () => {

        const daUser = await (Auth.currentAuthenticatedUser())
        const userEmail = daUser.attributes.email
        await DataStore.save(
            new StatSet({
                AirQuality: airQualValue,
                Username: userEmail
            })
        );
    }

    return (
        <VerticalFlexContainer style={{ height: '100%', width: '100%', }}>
            {loaded && (
                <View>
                    <HomeHeader headerTitle="Home" connectedStatus="Connected" />
                    <VerticalFlexContainer style={{ height: '50%', width: '100%' }}>
                        <CenterFlexContainer style={{ width: '100%', height: '35%' }}>
                            <HorizontalFlexContainer style={{ height: '40%', width: '100%' }}>
                                <InfoBox mainData={tempValue + ' °C'} title="Temperature" iconPath={require('../../../../assets/TempIcon.png')} />
                                <InfoBox mainData={humidityValue + '%'} title="Humidity" iconPath={require('../../../../assets/HumidityIcon.png')} />
                            </HorizontalFlexContainer>
                        </CenterFlexContainer>
                        <CenterFlexContainer style={{ width: '100%', height: '50%', marginTop: 6 }}>
                            <HorizontalFlexContainer style={{ height: '40%', width: '100%' }}>
                                <InfoBox mainData={airPresValue + ''} title="Air Pressure" iconPath={require('../../../../assets/AirIcon.png')}>

                                </InfoBox>
                                <InfoBox mainData={airQualValue + ''} title="Air quality" iconPath={require('../../../../assets/FireIcon.png')} />
                            </HorizontalFlexContainer>
                        </CenterFlexContainer>
                    </VerticalFlexContainer>
                    <CenterFlexContainer>
                        <AnimatedCircularProgress
                            size={200}
                            width={12}
                            fill={100}
                            tintColor={colors.mainPurple}
                            backgroundColor="#fff"
                            lineCap="round"
                        >
                            {
                                () => (
                                    <CenterFlexContainer style={{ height: '100%', width: '100%', backgroundColor: colors.mainWhite }}>
                                        <ProcentText>
                                            {circleText}
                                        </ProcentText>
                                        <NOMText>Air Quality Record</NOMText>
                                    </CenterFlexContainer>
                                )
                            }
                        </AnimatedCircularProgress>
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

export default HomeScreen