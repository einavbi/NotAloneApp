import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  Platform,
  ActivityIndicator,
  StyleSheet
} from 'react-native';



const AddContactScreen = props => {
 return (
    <View><Text>add Emergency ContactS page</Text></View>   
 );
}
const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});
export const screenOptions = {
  headerTitle: 'Add Emergency Contact '
};
export default AddContactScreen;
