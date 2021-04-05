import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [n, setn] = React.useState(0);
  React.useEffect(() => {
    const intTimer = setInterval(() => {
      setn(n + 1);
    }, 10000);
    return () => clearInterval(intTimer);
  }, []);
  return (
    <View style={styles.container}>
      <Text>{n}: Open up App to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
