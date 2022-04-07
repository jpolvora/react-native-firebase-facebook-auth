/**
 * @format
 */

import { AppRegistry } from 'react-native';
//import App from './App';
import Webview from './Webview';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => Webview);
