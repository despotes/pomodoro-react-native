import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Vibration,
} from 'react-native'
import PropType from 'prop-types'
import Button from './Button'

const vibrate = () => Vibration.vibrate([500, 500, 500])

const ShowTimer = (props) => (
  <View>
    <Text style={{ fontSize: 40, textAlign: 'center', color: 'green' }}>
      {props.turn % 2 === 0 ? 'Time to Work' : 'Pause'}
    </Text>
    <Text style={{ fontSize: 100, color: 'green' }}>
      {props.turn % 2 === 0 ? props.work : props.pause}
    </Text>
  </View>
)

ShowTimer.PropType = {
  turn: PropType.number,
  work: PropType.string,
  pause: PropType.string,
}

export default class CountDown extends Component {
  constructor() {
    super()
    this.state = {
      work: '25:00',
      pause: '05:00',
      pomodori: 0,
      turn: 0,
      start: false,
    }

    // time in minutes of the pause, workingTime and longPause
    this.longPause = 0.35 // 0.35 = 20 seconds for testing
    this.pause = 0.1 //  0.1 = 5 seconds for testing
    this.workTime = 0.44 // 0.44 = 25 seconds for testing

    // Interval variable to reset when unMounting
    this.x
  }

  addPomodori() {
    this.setState((prevState) => ({ pomodori: prevState.pomodori + 1 }))
  }

  reset() {
    console.log('Cancel Pressed')
    clearInterval(this.x)
    this.setState({
      work: '25:00',
      pause: '05:00',
      pomodori: 0,
      turn: 0,
      start: false,
      running: false,
    })
  }

  // Check at fourth pomodoro and give a longer Pause after the fourth Pomodoro
  checkFour(pomodori) {
    if (pomodori > 0 && pomodori % 4 == 0) return true
    else false
  }

  // Calculate the next timing
  // if pause 5:00 minutes,
  // if worktime 25:00 minutes
  // 20:00 minutes pause after the fourth Pomodoro
  nextTiming() {
    this.setState((prevState) => ({ running: !prevState.running }))

    // long pause if having 4 pomodoros
    if (this.checkFour(this.state.pomodori)) this.countdown(this.longPause)
    else if (this.state.turn % 2 === 0) this.countdown(this.workTime)
    else this.countdown(this.pause)
  }

  startPomodoro = () => {
    console.log(this.state.start)
    this.setState((prevState) => ({
      start: !prevState.start,
      running: !prevState.running,
    }))
    this.countdown(0.44)
  }

  countdown(minutes) {
    let time = 1000 * 60 * minutes
    this.x = setInterval(() => {
      time = time - 1000
      let minutes = Math.floor(time / (60 * 1000))
      let seconds = Math.floor((time % (60 * 1000)) / 1000)

      if (this.state.turn % 2 == 0) {
        this.setState({
          work: `${('00' + minutes).slice(-2)}:${('00' + seconds).slice(-2)}`,
        })
      } else {
        this.setState({
          pause: `${('00' + minutes).slice(-2)}:${('00' + seconds).slice(-2)}`,
        })
      }
      if (time <= 0) {
        clearInterval(this.x)
        this.setState((prevState) => {
          const newState = {
            turn: prevState.turn + 1,
            running: !prevState.running,
          }

          if (prevState.turn % 2 === 0) {
            newState.work = '25:00'
          } else {
            newState.pause = prevState.pomodori === 3 ? '20:00' : '5:00'
          }

          return newState
        })

        if (this.state.turn % 2 !== 0) this.addPomodori()

        vibrate()

        // Give an alert when finished the turn with ok or cance for starting the next One
        Alert.alert(
          'Timer',
          this.state.turn % 2 !== 0 ? 'Now Pause' : 'Now Work',
          [
            { text: 'reset', onPress: () => this.reset() },
            { text: 'OK', onPress: () => this.nextTiming() },
          ],
          { cancelable: false },
        )
      }
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.x)
  }

  render() {
    return (
      <View>
        <Text style={[styles.red_center, styles.medium, styles.bold]}>
          Pomodori
        </Text>
        <Text style={[styles.red_center, styles.big, styles.bold]}>
          {this.state.pomodori}
        </Text>
        <ShowTimer
          turn={this.state.turn}
          work={this.state.work}
          pause={this.state.pause}
        />
        {!this.state.start ? (
          <Button text="start" onPress={() => this.startPomodoro()} />
        ) : null}
        {this.state.start && !this.state.running ? (
          <Button text="Next" onPress={() => this.nextTiming()} />
        ) : null}

        <Button text="Reset" onPress={() => this.reset()} />
      </View>
    )
  }
}

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
  red_center: {
    color: 'red',
    textAlign: 'center',
  },
  big: { fontSize: 80 },
  medium: { fontSize: 40 },
  bold: { fontWeight: 'bold' },
})
