import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './navigators/AppNavigator';
import CustomTabsNavigator from './navigators/customTabsNavigator';
import { ShowProvider } from './context/ShowContext';
import { TabProvider } from './context/TabContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AdditionalTabProvider } from './context/AdditionalTabContext';
import { RenderingProvider } from './context/RenderingContext';
import { LocalStorageService } from './data/storage/LocalStorageService';
import { ActivityIndicator } from 'react-native';
import LoadingView from './components/LoadingView';
import Intercom, { Visibility } from '@intercom/intercom-react-native';
const storageService = new LocalStorageService();

const App: React.FC = () => {


  useEffect(() => {
    Intercom.loginUnidentifiedUser();
    Intercom.setLauncherVisibility(Visibility.GONE);
  }, []);
  
  

  return (
    <AuthProvider storageService={storageService}>
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
  const { isAuthenticated, isLoading } = useAuth();

  // Render nothing while loading
  if (isLoading) {
    return <LoadingView />;
  }

  return isAuthenticated ? (
    <TabProvider>
      <AdditionalTabProvider>
        <RenderingProvider>
          <CustomTabsNavigator />
        </RenderingProvider>
      </AdditionalTabProvider>
    </TabProvider>
  ) : (
    <AppNavigator />
  );
};

export default App;
