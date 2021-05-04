import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import ConfirmUser from './ConfirmUser/ConfirmUser'
import Main from './Main'
import { RootStackParams } from './RootStackParams'
import SignIn from './SignIn/SignIn'
import SignUp from './SignUp/SignUp'


const Root = createStackNavigator<RootStackParams>()

const Index: React.FC = () => (
    <Root.Navigator
        screenOptions={{
            headerShown: false,
        }}>
        <Root.Screen name="SignIn" component={SignIn} />
        <Root.Screen name="SignUp" component={SignUp} />
        <Root.Screen name="Main" component={Main} />
        <Root.Screen name="ConfirmUser" component={ConfirmUser} />
    </Root.Navigator>
)

export default Index
