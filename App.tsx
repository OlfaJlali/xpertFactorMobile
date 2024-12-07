import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './navigators/AppNavigator';
import CustomTabsNavigator from './navigators/customTabsNavigator';
import { ShowProvider } from './context/ShowContext';
import { TabProvider } from './context/TabContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AdditionalTabProvider } from './context/AdditionalTabContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ShowProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <AppContent />
          </NavigationContainer>
        </GestureHandlerRootView>
      </ShowProvider>
    </AuthProvider>
  );
};

// Separate the conditional rendering logic for better readability
const AppContent: React.FC = () => {
  const { isAuthed } = useAuth();
  
  return isAuthed ? (
    <TabProvider>
      <AdditionalTabProvider>
        <CustomTabsNavigator />
      </AdditionalTabProvider>
    </TabProvider>
  ) : (
    <AppNavigator />
  );
};

export default App;
