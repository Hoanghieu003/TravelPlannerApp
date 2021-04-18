import { NativeModules } from 'react-native';

const { LineLoginManager } = NativeModules;

class LineLogin {
  login = () => {
    return LineLoginManager.login();
  };

  logout = () => {
    LineLoginManager.logout();
  };
}

export default new LineLogin();
