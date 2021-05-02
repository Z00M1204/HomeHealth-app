import { NavigationContainer } from '@react-navigation/native'
import { getPersistor } from '@rematch/persist'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import firebase from 'firebase'

import Index from './src/screens'
import { store } from './src/state/store'
import { navigationRef } from './src/utils/navigationRef'

import Amplify, { Auth } from 'aws-amplify';
// @ts-ignore
import awsconfig from './src/aws-exports';
import { LogBox } from 'react-native'
import FlashMessage from 'react-native-flash-message'

Amplify.configure(awsconfig);

export default function App() {

    var firebaseConfig = {
        apiKey: "AIzaSyAsyIeA82aCUZDJ0P3BvZCdj_wUDn_wr9M",
        authDomain: "ddu2-luftsensor.firebaseapp.com",
        databaseURL: "https://ddu2-luftsensor-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "ddu2-luftsensor",
        storageBucket: "ddu2-luftsensor.appspot.com",
        messagingSenderId: "468687353127",
        appId: "1:468687353127:web:0ce8e701b494e5790b2502",
        measurementId: "G-MNW88ZELKT"
    };

    LogBox.ignoreLogs(['Warning: ...']); 
    LogBox.ignoreAllLogs();

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }
    return (
        <>
            <StatusBar style="auto" />
            <PersistGate persistor={getPersistor()}>
                <Provider store={store}>
                    <NavigationContainer ref={navigationRef}>
                        <SafeAreaProvider>
                            <Index />
                            <FlashMessage position="top" />
                        </SafeAreaProvider>
                    </NavigationContainer>
                </Provider>
            </PersistGate>
        </>
    )
}
