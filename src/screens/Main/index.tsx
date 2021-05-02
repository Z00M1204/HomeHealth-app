import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { TabScreenStackParams } from './TabScreenStackParams';
import HomeScreen from './HomeScreen/HomeScreen';

//@ts-ignore
import Icon from 'react-native-vector-icons/MaterialIcons';
import ExploreScreen from './ExploreScreen/ExploreScreen';
import { colors } from '../../globals/colors';
import ProfileScreen from './ProfileScreen/ProfileScreen';



const Tab = createMaterialBottomTabNavigator();

const Main: React.FC = () => (
    <Tab.Navigator
        initialRouteName="HomeScreen"
        activeColor="#f0edf6"
        shifting={true}
        barStyle={{ backgroundColor: colors.mainWhite }}
    >
        <Tab.Screen
            name="ExploreScreen"
            component={ExploreScreen}
            options={{
                tabBarColor: colors.mainWhite,
                tabBarLabel: '',
                tabBarIcon: ({ focused }) => {
                    if (focused === true) {
                        return (
                            <Icon name="explore" size={34} style={{ height: 34, width: 34 }} color={colors.mainPurple} />
                        )
                    }
                    else {
                        return (
                            <Icon name="explore" size={34} style={{ height: 34, width: 34 }} color="#c6cad3" />
                        )
                    }
                },
            }}
        />
        <Tab.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
                tabBarLabel: '',
                tabBarColor: colors.mainWhite,
                tabBarIcon: ({ focused }) => {
                    if (focused === true) {
                        return (
                            <Icon name="home" size={34} style={{ height: 34, width: 34 }} color={colors.mainPurple} />
                        )
                    }
                    else {
                        return (
                            <Icon name="home" size={34} style={{ height: 34, width: 34 }} color="#c6cad3" />
                        )
                    }
                },
            }}
        />

        <Tab.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{
                tabBarColor: colors.mainWhite,
                tabBarLabel: '',
                tabBarIcon: ({ focused }) => {
                    if (focused === true) {
                        return (
                            <Icon name="person" size={34} style={{ height: 34, width: 34 }} color={colors.mainPurple} />
                        )
                    }
                    else {
                        return (
                            <Icon name="person" size={34} style={{ height: 34, width: 34 }} color="#c6cad3" />
                        )
                    }
                },
            }}
        />
    </Tab.Navigator>
)

export default Main
