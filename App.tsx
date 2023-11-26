import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import { NativeBaseProvider } from 'native-base'
import { StatusBar } from 'react-native'

import { LogLevel, OneSignal, OSNotification } from 'react-native-onesignal'

import { Routes } from './src/routes'

import { Loading } from './src/components/Loading'
import { THEME } from './src/theme'

import { useEffect, useState } from 'react'
import { CartContextProvider } from './src/contexts/CartContext'
import { TagUserInfoCreate } from './src/notifications/notificationsTags'
import { Notification } from './src/components/Notification'

OneSignal.Debug.setLogLevel(LogLevel.Verbose)
OneSignal.initialize('1c65aee1-399c-46df-8cf5-d13f6416191a')
OneSignal.Notifications.requestPermission(true)

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  TagUserInfoCreate()

  useEffect(() => {
    const unsubscribe = OneSignal.Notifications.addEventListener(
      'click',
      (event) => {
        console.log('Clicou na notificação', JSON.stringify(event, null, 2))
      }
    )
    return () => unsubscribe
  }, [])

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  )
}
