import Auth from '@aws-amplify/auth'
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore'
import CircularProgress from '@material-ui/core/CircularProgress'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { CenterFlexContainer } from '../../../components/atoms/CenterFlexContainer'
import { VerticalFlexContainer } from '../../../components/atoms/VerticalFlexContainer'
import HomeHeader from '../../../components/molecules/HomeHeader'
import LeaderboardItem from '../../../components/molecules/LeaderboardItem'
import { PublicStatSet, StatSet } from '../../../models'
import { TabScreenStackParams } from '../TabScreenStackParams'

type ScreenRouteProp = RouteProp<TabScreenStackParams, 'ExploreScreen'>
type ScreenNavigationProp = StackNavigationProp<TabScreenStackParams, 'ExploreScreen'>

type Props = {
    route: ScreenRouteProp
    navigation: ScreenNavigationProp
}

const ExploreScreen: React.FC<Props> = (p) => {

    const [loaded, setLoaded] = React.useState(false)
    const [leaderList, setLeaderList] = React.useState([])
    const [myPosition, setMyPosition] = React.useState(0)

    //Effect hook that loads the leaderboard when the screen renders
    React.useEffect(() => {
        getLeaderBoard()
    }, [])

    //Function used to get the leaderboard from AWS and update the state hooks
    const getLeaderBoard = async () => {
        const statSets = await DataStore.query(PublicStatSet, Predicates.ALL, {
            sort: s => s.TopAirQuality(SortDirection.DESCENDING)
        });

        const filteredList = []

        for (let i = 0; i < statSets.length; i++) {
            if (statSets[i].Username !== null && statSets[i].TopAirQuality !== null) {
                filteredList.push(statSets[i])
            }
        }
        const daUser = await Auth.currentAuthenticatedUser()
        const userEmail = daUser.attributes.email

        const currentStatSet = await DataStore.query(StatSet, c => c.Username("eq", userEmail), {
            sort: s => s.AirQuality(SortDirection.DESCENDING)
        });

        setMyPosition(currentStatSet[0].AirQuality)
        setLeaderList(filteredList)
        setLoaded(true)
    }

    return (
        <VerticalFlexContainer style={{ width: '100%', height: '100%', alignItems: 'center' }}>
            {loaded && (
                <View>
                    <HomeHeader headerTitle="Leaderboard" connectedStatus="Connected" />
                    <View>
                        <Text></Text>
                    </View>
                    <ScrollView style={{ borderRadius: 15 }}>
                        <LeaderboardItem personName="" position={myPosition} isYou />
                        {leaderList.map((item, key) => (
                            <LeaderboardItem personName={item.Username} position={item.TopAirQuality} key={key} />
                        ))}
                        <View style={{ marginBottom: 10 }} />
                    </ScrollView>
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

export default ExploreScreen