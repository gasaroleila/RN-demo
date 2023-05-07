import React from "react";
import { Text, StyleSheet, View, Button } from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";

const HomeScreen = ({ navigation }) => {
  return <View>
    {/* <Text style={styles.text}>RN List Building</Text> */}
    <Button
      onPress={() => navigation.navigate('SimpleList')}
          title="Simple List Implementation" />
      
      <Button
      onPress={() => navigation.navigate('ListSeparators')}
          title="List Separators" />
      
      <Button
      onPress={() => navigation.navigate('ListSelections')}
          title="List Selections" />
      
      <Button
      onPress={() => navigation.navigate('SwipeToDeleteList')}
          title="Swipe To Delete" />
      
      <Button
      onPress={() => navigation.navigate('PullToRefreshList')}
      title="Pull To Refresh" />
    

    {/* <TouchableOpacity onPress={() => props.navigation.navigate('Components')}>
       <Text>Component demo</Text>
     </TouchableOpacity> */}
  </View>
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default HomeScreen;
