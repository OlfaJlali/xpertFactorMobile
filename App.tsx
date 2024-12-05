import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './navigators/AppNavigator';
import CustomTabsNavigator from './navigators/customTabsNavigator';
import { ShowProvider, useShow } from './context/ShowContext'; // Import the context
import {TabProvider } from './context/TabContext'
const App: React.FC = () => {
  const [isAuthed, setIsAuthed] = useState(false);

  return (
    <ShowProvider>  
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          {isAuthed ? 
          <TabProvider>
          <CustomTabsNavigator />
        </TabProvider>
          : <AppNavigator setIsAuthed={setIsAuthed} />}
        </NavigationContainer>
      </GestureHandlerRootView>
    </ShowProvider>
  );
};

export default App;
