import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

export default class Metior extends React.component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Meteor Locator</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1 },
});
