import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TodoList from './screens/todo-list';
import { QueryClient, QueryClientProvider } from 'react-query';
import {RecoilRoot} from 'recoil';
import AppNavigator from './screens/navigations';


export default function App() {
  const queryCLient = new QueryClient()

  return (
    <QueryClientProvider client={queryCLient}>
      <RecoilRoot>
        <AppNavigator />
      </RecoilRoot>
    </QueryClientProvider>
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
