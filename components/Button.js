import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'red',
    flex: 1,
    maxHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 2,
    textTransform: 'uppercase',
  },
})

const Button = (props) => {
  return (
    <TouchableOpacity title={props.text} onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={{ color: 'white', fontSize: 20 }}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Button
