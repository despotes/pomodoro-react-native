import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

import Countdown from './components/Countdown'

export default function App() {
  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/tomato1.png')}
        style={{ width: 193, height: 110 }}
      />
      <Countdown />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
