import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import Colors from '../../constants/Colors';
const TitleText = props => (
  <Text style={{ ...styles.title, ...props.style }}>{props.children}</Text>
);

const styles = StyleSheet.create({
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color:Colors.title
  }
});

export default TitleText;
