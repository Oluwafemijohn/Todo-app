import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import {RecoilRoot} from 'recoil';
import AppNavigator from './navigation';

export default function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <AppNavigator />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

