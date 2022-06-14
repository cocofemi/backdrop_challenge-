import { Provider } from 'react-redux';
import BottomTabNavigator from './routes/bottomTabNavigator';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <BottomTabNavigator />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
  );
}


