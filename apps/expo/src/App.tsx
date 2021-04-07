import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ui, AppBar } from '@rolledex/ui';
import Constants from 'expo-constants';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@rolledex/sdk';
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#00695c',
    accent: '#6a1b9a',
  },
};
export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <PaperProvider theme={theme}>
        <AppBar />
        <View style={styles.container}>
          <Text>
            extra: {JSON.stringify(Constants.manifest.extra, null, 2)}
          </Text>
          <Ui></Ui>
          <StatusBar style="auto" />
        </View>
      </PaperProvider>
    </ApolloProvider>
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
