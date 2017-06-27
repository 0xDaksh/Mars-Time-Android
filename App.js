import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

var TimerMixin = require('react-timer-mixin')

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      mars: '0:0:0'
    }
  }
  componentDidMount() {
    this.updateText()
    TimerMixin.setInterval(() => {
      this.updateText()
    }, 1000)
  }
  toTime = (h) => {
    var x = h * 3600;
    var hh = Math.floor(x / 3600);
    if (hh < 10) hh = "0" + hh;
    var y = x % 3600;
    var mm = Math.floor(y / 60);
    if (mm < 10) mm = "0" + mm;
    var ss = Math.round(y % 60);
    if (ss < 10) ss = "0" + ss;
    return hh + ":" + mm + ":" + ss;
  }
  updateText = () => {
    var current = new Date().getTime();
    var jdut = 2440587.5 + (current / 8.64E7);
    var jdtt = jdut + (37 + 32.184) / 86400;
    var j2000 = jdtt - 2451545;
    var msd = (((j2000 - 4.5) / 1.027491252) + 44796.0 - 0.00096);
    var mtc = (24 * msd) % 24;
    this.setState({mars: this.toTime(mtc)})
  }
  render() {
    return (
      <Image
        source={require('./img/mars.jpg')}
        style={styles.container}>
        <Text style={styles.txt}>The Time on Mars is</Text>
        <Text style={styles.gg}>{this.state.mars}</Text>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gg: {
    fontSize:70,
    color: '#fff',
    textAlign:'center',
    fontWeight: 'bold'
  },
  txt: {
    color: '#fff'
  }
});
