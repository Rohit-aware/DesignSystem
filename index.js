/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { activateFonts } from './src/theme/projectTheme';


// Font config activated before render — never inside a component
activateFonts();
AppRegistry.registerComponent(appName, () => App);
