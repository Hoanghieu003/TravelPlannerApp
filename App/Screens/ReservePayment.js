import analytics from '@react-native-firebase/analytics';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { WebView } from 'react-native-webview';
import getReserve from '../../Common/gql/queries/getReserve.gql';
import updateReserve from '../../Common/gql/mutations/updateReserve.gql';
import Util from '../../Common/Util';
import RootStore from '../Stores/RootStore';
/* 아임포트 모듈을 불러옵니다. */
import IMP from '../../forked_modules/iamport-react-native';
import { myAlert } from '../Components/MyAlert';
import { COLOR } from '../Constants/styles';
import { WIDTH_SCALE_RATIO, HEIGHT_SCALE_RATIO } from '../Constant/constant';
import { SkypeIndicator } from 'react-native-indicators';
import Const from '../../Common/Const';
import { Root } from 'native-base';

export default class ReservePayment extends React.PureComponent {
  constructor(props) {
    super(props);
    this._onMessage = this._onMessage.bind(this);
    this.state = {
      html: '',
      loadingIndicatorVisible: true,
      data: null,
    };
  }

  convertSpotName = (spotName) => {
    if (Util.encodeURI(spotName).length > 255) {
      return spotName.subString(0, 28);
    }
    return spotName;
  };

  async componentDidMount() {
    analytics().setCurrentScreen('Payment');
    if (!RootStore.config.iamport_id) {
      myAlert('', 'Cannot found iamport_id', () => Actions.pop());
    }
    // const param = {
    //   ver: '230', //fixed
    //   txntype: 'PAYMENT', //fixed
    //   charset: 'UTF-8', //fixed
    //   statusurl: `${RootStore.config.payment_host}/execute`,
    //   returnurl: `${RootStore.config.payment_host}/complete`,
    //   mid: RootStore.config.exim_payment_id, //fixed
    //   ostype: 'M', // os 타입은 mobile을 고정으로 한다.    //fixed
    //   displaytype: 'P', // p : popup (default) / r : redirect page //fiexed
    //   cur: 'KRW', // 통화 환율 usd 표시 // fixed
    //   ref: this.props.reserve.reserve_code,
    //   amt: this.props.reserve.total_payment,
    //   shop: this.convertSpotName(this.props.spotName),
    //   buyer: this.props.reserve.name,
    //   email: this.props.reserve.email,
    //   lang: 'EN', // 주 지원 언어는 KR, EN, CN, JP이며, 그 외 언어는 사용할 경우, 담당자와 사전에 협의해 주시기 바랍니다. //fix
    //   param1: '',
    //   param2: '',
    //   param3: 'mobile-app', // 결과창 선택용 mobile / web 으로 나뉜다.
    //   autoclose: 'N', //fixed
    //   fgkey: this.props.eximFgkey,
    // };

    // let inputData = '';
    // Object.keys(param).forEach(k => {
    //   inputData += `<input type="hidden" name="${k}" value="${param[k]}" />`;
    // });
    // const html = `
    //   <html>
    //     <head>
    //       <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    //     </head>
    //     <body leftmargin="0" topmargin="0" align="center" onload="javascript:document.regForm.submit();" />
    //       <form name="regForm" method="post" action="${RootStore.config.exim_payment_url}" />
    //       ${inputData}
    //     </body>
    //   </html>
    // `;

    // this.setState({ html });
  }

  async _onMessage(e) {
    if (e.nativeEvent.data.indexOf('__EXIM__') >= 0) {
      const variables = {
        code: this.props.reserve.code,
        language: RootStore.language,
      };
      const result = await RootStore.client.query({
        query: getReserve,
        variables,
      });
      const reserves = result.data.getReserveDetail.reserve;
      Actions.reserveComplete({ reserve: reserves });
    }
  }

  hideSpinner = () => {
    this.setState({ loadingIndicatorVisible: false });
  };

  onRollbackPayment = () => {
    Actions.replace('reserveComplete', { fromScreen: '', reserve: this.props.reserve });
  };

  render() {
    console.log('29148 RootStore.language:', RootStore.language);
    console.log('29148 this.props.reserve:', this.props.reserve);

    const abc = {
      pg: 'eximbay',
      pay_method: 'card',
      merchant_uid: `${this.props.reserve.reserve_code}`,
      // name: `${this.convertSpotName(this.props.spotName)}`, // ko giong
      name: `${this.props.spotName}:${this.props.spot_name_ko}`,
      // amount: 18000,
      amount: `${this.props.reserve.total_payment}`,
      // amount: '18,000 KRW',
      buyer_name: this.props.reserve.name,
      buyer_tel: this.props.reserve.telephone,
      buyer_email: this.props.reserve.email,
      buyer_addr: this.props.reserve.delivery_address,
      buyer_postcode: this.props.reserve.flight_number,
      currency: 'KRW',
      language: RootStore.language,
      popup: false,
      escrow: false,
      app_scheme: 'creatrip',
      notice_url: `${RootStore.config.host}/payment/iamport/webhook`,

      // notice_url: `https://cave.creatrip.com/payment/iamport/webhook`,
      // notice_url: `https://cave.creatrip.com:3001/payment/iamport/webhook`,

      // notice_url: `https://api.creatrip.com/payment/iamport/webhook`,
      // notice_url: `https://api.creatrip.com:3000/payment/iamport/webhook`,
      // [Deprecated v1.0.3]: m_redirect_url
    };
    console.log('29148 : ReservePayment -> render -> param abcd', abc);
    console.log(
      '29148 : ReservePayment -> render -> RootStore.config.iamport_id',
      RootStore.config.iamport_id,
    );

    return (
      <IMP.Payment //*** NOTE: WE NEED TO CLONE THIS LIB TO FORKED_MODULES BECAUSE SOURCE LIB ONLY SUPPORT KOREAN LANGUAGE IN EXIMBAY PG */
        userCode={RootStore.config.iamport_id} // 가맹점 식별코드
        loading={
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#ffffff',
            }}>
            <SkypeIndicator
              color={COLOR.appColor}
              size={30 * WIDTH_SCALE_RATIO}
              style={{
                paddingTop: 8 * HEIGHT_SCALE_RATIO,
                paddingBottom: 16 * HEIGHT_SCALE_RATIO,
              }}
            />
          </View>
        } // 웹뷰 로딩 컴포넌트
        data={abc} // 결제 데이터
        // open3rdPartyApp={false}
        callback={async (response) => {
          console.log('29148 call back goi ne nen ene e', response);
          if (
            response &&
            (response.imp_success === 'true' ||
              response.success === 'true' ||
              response.error_code === 'F1002')
          ) {
            //F1002 means this already paid
            setTimeout(async () => {
              const variables = {
                code: this.props.reserve.code,
                language: RootStore.language,
              };
              const result = await RootStore.client.query({
                query: getReserve,
                variables,
              });
              const reserves = result.data.getReserveDetail.reserve;
              Actions.reserveComplete({ reserve: reserves });
            }, 5000);
          } else if (response && response.error_msg && response.error_msg.includes('F0004')) {
            this.onRollbackPayment();
          } else {
            myAlert('', 'Payment fail, Please try again later.', this.onRollbackPayment);
          }
        }} // 결제 종료 후 콜백
      />
    );
  }
}

ReservePayment.propTypes = {
  spotCode: PropTypes.number,
  spotName: PropTypes.string,
  reserve: PropTypes.object,
  eximFgkey: PropTypes.string,
  endGoBack: PropTypes.bool,
};
