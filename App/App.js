import React from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import { SafeAreaView } from 'react-navigation';
import CustomSpinner from './Components/CustomSpinner';
import ModalGallery from './Components/ModalGallery';
import { IS_ANDROID } from './Constant/constant';
import Routes from './Routes';

export default class App extends React.PureComponent {
  componentDidMount() {
    StatusBar.setBarStyle('dark-content');
    if (IS_ANDROID) StatusBar.setBackgroundColor(Platform.Version < 23 ? 'black' : 'white');
  }
  render() {
    return (
      <MenuProvider
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <SafeAreaView forceInset={{ bottom: 'never' }} style={{ flex: 1, backgroundColor: '#fff' }}>
          <Routes />

          <View style={{ position: 'absolute', top: 0 }}>
            <CustomSpinner color="#00afa0" />
            <ModalGallery />
          </View>
        </SafeAreaView>
      </MenuProvider>
    );
  }
}
