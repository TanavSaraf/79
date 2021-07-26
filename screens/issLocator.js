import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

export default class Iss extends React.component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Locator Screen</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1 },
});
