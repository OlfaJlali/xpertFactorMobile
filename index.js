/**
 * @format
 */

import { enableScreens } from 'react-native-screens';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-gesture-handler'; // Important

enableScreens(); // Add this line
AppRegistry.registerComponent(appName, () => App);
