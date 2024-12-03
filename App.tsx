import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './navigators/AppNavigator';
import CustomTabsNavigator from './navigators/customTabsNavigator';
const App: React.FC = () => {
  const [isAuthed, setIsAuthed] = useState(false);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        {isAuthed ? <CustomTabsNavigator /> : <AppNavigator setIsAuthed={setIsAuthed}  />}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
