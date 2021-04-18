import { AppRegistry, Text, TextInput, LogBox } from 'react-native';
import App from './App/App';
import { name as appName } from './app.json';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested',
  // 'Warning: Failed prop type: Invalid prop `touchableComponent`',
  // 'Require cycle: node_modules',
  // 'Calling `getNode()`',
  // 'Animated: `useNativeDriver` was not specified.',
  // 'Non-serializable values were found in the navigation state',
  // 'Sending `onAnimatedValueUpdate` with no listeners registered.',
  'currentlyFocusedField is deprecated and will be removed in a future release. Use currentlyFocusedInput',
  'Warning: Encountered two children with the same key',
  // 'Looks like you',
]);
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
if (!__DEV__) console.log = () => {};
AppRegistry.registerComponent(appName, () => App);
