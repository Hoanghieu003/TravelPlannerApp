import analytics from '@react-native-firebase/analytics';
import React, { Fragment } from 'react';
import { ScrollView, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import BaseHeaderWithSearch from '../Components/BaseHeaderWithSearch';
import Divider from '../Components/Divider';
import MyTouchableOpacity from '../Components/MyTouchableOpacity';
import PText from '../Components/PText';
import { HEIGHT_SCALE_RATIO, WIDTH, WIDTH_SCALE_RATIO, IS_IOS } from '../Constant/constant';
import { COLOR, ptButton, ptText, ptShadow } from '../Constants/styles';
import RootStore from '../Stores/RootStore';

export default class Policy extends React.PureComponent {
  constructor(props) {
    super(props);
    this.rate = (WIDTH * 0.45) / 300;
    this.logoWidth = 300 * this.rate * 1.3;
    this.logoHeight = 122 * this.rate * 1.3;
    this.thirdPartyIconSize = 60 * this.rate;
    this.onAgreePress = this.onAgreePress.bind(this);
    this.onCancelPress = this.onCancelPress.bind(this);

    this.language = this.onGetLanguage(RootStore.language);
  }

  onGetLanguage = (language) => {
    switch (language) {
      case 'en':
        return 'en';

      case 'ko':
        return 'ko';

      // case 'zh-CN':
      //   return 'cn';
      //   N';
      //   break;

      // case 'zh-TW':
      //   return 'tw';
      //   W';
      //   break;

      case 'jp':
        return 'jp';

      case 'th':
        return 'th';

      case 'hk':
        return 'hk';

      case 'vi':
        return 'vn';

      default:
        return '';
    }
  };
  onAgreePress() {
    Actions.push('register');
    // Actions.pop();
  }

  onCancelPress() {
    Actions.pop();
  }

  componentDidMount() {
    analytics().setCurrentScreen('Policy');

    //   function facebookClick() {
    //     window.postMessage("Facebook button done got clicked");
    // }
    // var _fb_button = document.getElementById("your-facebook-button");
    // _fb_button.addEventListener("click", facebookClick, false);
  }
  onNavigationStateChange = (navState) => {
    if (navState && navState.url && navState.url.includes('/signup')) {
      this.webView.stopLoading();

      console.log('phat: MyWebView -> navState', navState.url);
      this.onAgreePress();
    } else {
    }
  };

  render() {
    // console.log('29148 ngon ngu ne nha nha nha', RootStore.language);
    return (
      <View style={{ flex: 1 }}>
        <View style={{ position: 'absolute', zIndex: 9999 }}>
          <BaseHeaderWithSearch
            showBack
            backgroundColorWhite
            rightIconType={null}
            isClose
            color={COLOR.appColor}
          />
        </View>
        <View
          style={{
            // width: WIDTH,
            // height: HEIGHT,
            // backgroundColor: 'red',
            // justifyContent: 'center',
            alignItems: 'center',
          }}>
          {IS_IOS ? (
            <View
              style={[
                ptShadow.BLUR10,
                { top: 80 * HEIGHT_SCALE_RATIO, width: '80%', height: '78%', position: 'absolute' },
              ]}
            />
          ) : (
            <View />
          )}

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={[
              ptShadow.BLUR0,
              {
                padding: 20 * WIDTH_SCALE_RATIO,
                marginTop: 70 * HEIGHT_SCALE_RATIO,
                marginVertical: 10 * WIDTH_SCALE_RATIO,

                // backgroundColor: COLOR.WHITE,
                // borderWidth: 1,
                width: '90%',
                height: '68%',
              },
            ]}>
            <PText style={[ptText.BODY2, { color: COLOR.GREY40 }]}>Privacy policy</PText>
            <Divider
              style={{
                backgroundColor: COLOR.GREY20,
                marginTop: 10 * HEIGHT_SCALE_RATIO,
                marginBottom: 10 * HEIGHT_SCALE_RATIO,
              }}
            />
            <PText style={[ptText.BODY2, { color: COLOR.GREY40 }]}>{`CREATRIP PRIVACY POLICY
Creatrip (hereinafter referred to as “Creatrip”, “we”, “us” or “our”) operates a platform and community marketplace that helps people form offline experiences and relationships directly with one another, where they can create, list, discover and book unique accommodations around the world, whether through our website or our mobile applications (“Platform”).

This Privacy Policy is intended to inform you about how we treat Personal Information that we process about you. If you do not agree to any part of this Privacy Policy, then we cannot provide the Platform or Services to you, and you should stop accessing the Platform and deactivate your Creatrip Account.


DEFINITIONS
Where the definition of a term does not appear in this Privacy Policy (such as “Listing”, “Accommodation”, “Content,” “Services” etc.), it shall be given its definition as outlined in our our Terms of Service.

“Affiliates” means companies related by common ownership or control. They can be financial and non-financial companies.

“Aggregated Information” means information about all of our users or specific groups or categories of users that we combine together so that it no longer identifies or references an individual user.

“Data Controller” means Creatrip, the company responsible for the use and processing of Personal Information.

“Third Parties” means companies or persons not related by common ownership or control (i.e. non-affiliates) or other unrelated individuals. Third Parties can be financial and non-financial companies, or persons other than you and Creatrip.

“Personal Information” means information (which may include sensitive information) relating to a living individual who is or can be identified either from that information or from that information in conjunction with other information that is in, or is likely to come into, the possession of the Data Controller.


WHAT TYPES OF INFORMATION DOES CREATRIP GATHER ABOUT ITS USERS?

Information that you give us
We receive, store and process information, including Personal Information, that you make available to us when accessing or using our Platform and Services. Examples include when you:


fill in any form on the Platform, such as when you register or update the details of your user account, or when you supply ID and other verification information;

access or use the Platform, such as to search for or post Accommodations, make or accept bookings, pay for Accommodations, book or pay for any associated services that may be available (such as but not limited to cleaning), post comments or reviews, or communicate with other users;

link your account on a Third-Party site (e.g. Facebook) to your Creatrip Account, in which case we will obtain the Personal Information that you have provided to the Third-Party site, to the extent allowed by your settings with the Third-Party site and authorized by you;

communicate with Creatrip; and

share information with another Member.


Information we get from your use of our Platform
We also receive, store and process information, possibly including Personal Information, when you access or use our Platform and Services, including but not limited to:


Mobile Data
When you use certain features of the Platform, in particular our mobile applications we may receive, store and process different types of information about your location, including general information (e.g. IP address, zip code) and more specific information (e.g. GPS-based functionality on mobile devices used to access the Platform or specific features of the platform). If you access the Platform through a mobile device and you do not want your device to provide us with location-tracking information, you can disable the GPS or other location-tracking functions on your device, provided your device allows you to do this. See your device manufacturer’s instructions for further details.


Contact Information
You may use your contact information, such as your email address, phone number or Line account ID to create or customize your account or to enable certain account features, for example, for login verification. If you provide us with your email address, phone number or Line account ID, you agree to receive emails to that email address, text messages to that phone number or messages to that Line account, as the case may be. We may use your contact information to send you information about our Platform and Services, to market to you, and to help prevent spam, fraud, or abuse.


Log Data
We may also receive, store and process Log Data, which is information that is automatically recorded by our servers whenever you access or use the Platform, regardless of whether you are registered with Creatrip or logged in to your Creatrip Account, such as your IP Address, the date and time you access or use the Platform, the hardware and software you are using, referring and exit pages and URLs, the number of clicks, device event information, pages viewed and the order of those pages, and the amount of time spent on particular pages.


Cookies and other Tracking Technologies
Creatrip uses cookies and other similar technologies, such as mobile application and other device identifiers, on the Platform. We may also allow our business partners to use their cookies and other tracking technologies on the Platform. As a result, when you access or use the Platform, you will provide or make available certain information to us and to our business partners.

While you may disable the usage of cookies through your browser settings, we do not change our practices in response to a “Do Not Track” signal in the HTTP header from your browser or mobile application. We track your activities if you click on advertisements for Creatrip services on Third-Party platforms such as search engines and social networks, and may use analytics to track what you do in response to those advertisements.

We may, either directly or through Third Parties we engage to provide services to us, also continue to track your behavior on our own Platform for purposes of our own customer support, analytics, research, product development, fraud prevention, risk assessment, regulatory compliance, investigation, as well as to enable you to use and access the Platform and pay for your activities on the Platform. We may also, either directly or through Third-Parties we engage to provide services to us, track your behavior on our own Platform to market and advertise our services to you on the Platform and Third-Party websites. Third Parties that use cookies and other tracking technologies to deliver targeted advertisements on our Platform and/or Third-Party websites may offer you a way to prevent such targeted advertisements by opting-out at the websites of industry groups such as the Network Advertising Initiative and/or the Digital Advertising Alliance. You may also be able to control advertising cookies provided by publishers, for example Google’s Ad Preference Manager. Please note that even if you choose to opt-out of receiving targeted advertising, you may still receive advertising on or about the Platform – it just will not be tailored to your interests. In addition, if you disable cookies, you may lose some of the features and functionality of using our Platform, Application and Services, as cookies are necessary to track and enhance your use and access.

Third Parties may not collect information about users’ online activities on the Platform except as described in this policy and our Cookie Policy.


Third-Party social plugins
Our Platform may use social plugins which are provided and operated by Third-Parties, such as Facebook’s Like Button.

As a result of this, you may send to the Third-Party the information that you are viewing on a certain part of our Platform. If you are not logged into your account with the Third-Party, then the Third Party may not know your identity. If you are logged into your account with the Third Party, then the Third Party may be able to link information about your visit to our Platform to your account with them. Similarly, your interactions with the social plugin may be recorded by the Third Party.

Please refer to the Third Party’s privacy policy to find out more about its data practices, such as what data is collected about you and how the Third Party uses such data.



HOW CREATRIP USES AND PROCESSES THE INFORMATION THAT YOU PROVIDE OR MAKE AVAILABLE

We use, store and process information about you for the following general purposes:

to enable you to access and use the Platform;

to enable you to communicate with other Members, including but not limited to by sending them messages or other information during the Booking (accommodation, travel packages, etc.) process;

to operate, protect, improve and optimize the Platform, Creatrip’s business, and our users’ experience, such as to perform analytics, conduct research, personalize or otherwise customize your experience, and to provide customer service;

to help create and maintain a trusted and safer environment on the Platform and Services, such as detection and prevention of actual and potential fraud and other harmful activity, conducting investigations and risk assessments, enforcing our Terms and policies, verifying the address of your listings, verifying any identifications provided by you (including by comparing the photo on that identification to another photo you provide to us), and conducting checks against databases and information sources (such as but not limited to public government databases) for fraud detection and prevention, risk assessment and harm prevention purposes. In this regard, we may do any or all of the foregoing with or without further notifying you;

to send you service, support and administrative messages, reminders, technical notices, updates, security alerts, and information requested by you;

to send you marketing, advertising, and promotional messages and other information that may be of interest to you, including information about Creatrip, our services, or general promotions for partner campaigns and services. You can unsubscribe or opt-out from receiving these communications in your settings (in the “Account” section) when you login to your Creatrip Account;

if a Guest has an employment or consulting relationship with a company or other organization that participates in the Creatrip Hanbok Discount, and that Guest has linked their Creatrip Account to that organization, to administer the Creatrip Hanbok Discount;

to administer referral programs, rewards, surveys, sweepstakes, contests, or other promotional activities or events sponsored or managed by Creatrip or our Third Party business partners; and

to comply with our legal obligations, resolve any disputes that we may have with any of our users, and enforce our agreements with Third Parties.


How Creatrip Uses and Processes User Communications
We may, either directly or through Third-Parties we engage to provide services to us, review, scan, or analyze your communications with other users exchanged via the Platform for fraud prevention, risk assessment, regulatory compliance, investigation, product development, research and customer support purposes. For example, as part of our fraud prevention efforts, the Platform may scan and analyze messages and attachments to mask contact information and references to other websites. This helps to prevent fraudulent actors from asking Guests to send them money outside of the Platform, such as by bank transfer or other money transfer methods. We may also scan, review or analyze messages for research and product development purposes to help make search, booking and user communications more efficient and effective, as well as to debug, improve and expand product offerings. We will not review, scan, or analyze your communications for sending Third-Party marketing messages to you. We will also not sell these reviews or analyses of communications to Third Parties. We will also use automated methods to carry out these reviews or analyses where reasonably possible. However, from time to time we may have to manually review some communications. By using the Platform, you consent that Creatrip, in its sole discretion, may, either directly or through Third-Parties we engage to provide services to us, review, scan, analyze, and store your communications, whether done manually or through automated means.



WHEN CREATRIP DISCLOSES OR SHARES YOUR PERSONAL INFORMATION, AND TO WHOM
IMPORTANT: When you use the Platform, your data may be sent to the United States and possibly other countries in accordance with this Privacy Policy.

We may transfer, store, use and process your information, including any Personal Information. By using the Platform, you consent to transferring your data to South Korea. Please note that laws vary from jurisdiction to jurisdiction, and so laws and regulations relating to privacy and data disclosure, applicable to the places where your information is transferred to or stored, used or processed in, may be different from the laws and regulations applicable to the place where you are resident.


Your Personal Information may be transferred, stored, used, processed and disclosed as follows:


Parts of your public profile page that contain some Personal Information may be displayed in other parts of the Platform to other users for marketing purposes or if you post content in a community forum or other features on the Platform that are visible to the general public.

Your public Listing page will always include some minimum information such as the city and neighborhood where the Accommodation is located, your listing description, your calendar availability, your public profile photo, your responsiveness in replying to Guests’ queries, and any additional information you share with other Members. Your public Listing page may also include aggregated demand information (such as number of page views over a period of time). Parts of your public Listing page may be displayed in other parts of the Platform to other Members and/or Third Party platforms for marketing purposes. The Platform may also display the Accommodation’s approximate geographic location on a map, such that a user can see the general area of the Accommodation.

The Platform allows your public profile to be included in search engines, in which case your public profile will be indexed by search engines and may be published as search results. This option is enabled by default, and you may opt out of this feature by changing your settings on the Platform. If you change your settings or the information on your public profile, Third-Party search engines may not update their databases quickly or at all. We do not control the practices of Third-Party search engines, and they may use caches containing outdated information, including any information indexed by the search engine before you change your settings or the information on your public profile.

When your request to book an Accommodation is accepted by the Host(s) or when a Guest books your Accommodation, we will disclose some of your Personal Information to the Host(s) and any confirmed Guest(s). However, your billing and payout information will never be shared with another user.

You may link your account on a Third-Party social networking site to your Creatrip Account. We refer to a person’s contacts on these Third-Party sites as “Friends”. When you create this linkage:

some of the information you provide to us from the linking of your accounts may be published on your Creatrip Account profile;

your activities on the Platform may be displayed to your Friends on the Platform and/or that Third-Party site;

a link to your public profile on that Third-Party social networking site may be included in your Creatrip public profile;

other Creatrip users may be able to see any common Friends that you may have with them, or that you are a Friend of their Friend if applicable;

other Creatrip users may be able to see any schools, hometowns or other groups you have in common with them as listed on your linked social networking site(s);

the information you provide to us from the linking of your accounts may be stored, processed and transmitted for fraud prevention and risk assessment purposes; and

the publication and display of information that you provide to Creatrip through this linkage is subject to your settings and authorizations on the Platform and the Third-Party site.


We may distribute parts of the Platform (including your Listing) for display on sites operated by Creatrip’s business partners and affiliates, using technologies such as HTML widgets. If and when your Listings are displayed on a partner’s site, information from your public profile page may also be displayed.

For any jurisdiction in which we facilitate the Collection and Remittance of Taxes or Opt-in for Host Remittance of Taxes as described in the “Taxes” section of the Terms of Service, Hosts and Guests expressly grant us permission, without further notice, to store, transfer and disclose data and other information relating to them or to their transactions, bookings, Accommodations and Occupancy Taxes, including, but not limited to, personally identifiable information such as Host or Guest’s name, listing addresses, transaction dates and amounts, tax identification number(s), the amount of taxes received by Hosts from Guests, or allegedly due, contact information and similar information, to the relevant Tax Authority.

You acknowledge, consent and agree that Creatrip may access, preserve and disclose your account information and Collective Content if required to do so by law or in a good faith belief that such access, preservation or disclosure is reasonably necessary (a) to respond to claims asserted against Creatrip; (b) to comply with legal process (for example, subpoenas and warrants), including legal process associated with national security and law enforcement; (c) to enforce and administer our agreements with users, such as the Terms of Service, the Payments Terms of Service, this Privacy Policy, and the Host Guarantee Terms and Conditions; (d) for fraud prevention, risk assessment, investigation, customer support, product development and de-bugging purposes; or (e) to protect the rights, property or personal safety of Creatrip, its users or members of the public.
We will use commercially reasonable efforts to notify users about law enforcement requests for their data unless:


providing notice is prohibited by the legal process itself, by court order we receive, or by applicable law; or

we believe that providing notice would (a) be futile, (b) be ineffective, or (c) would create a risk of injury or bodily harm to an individual or group, or (d) create or increase a risk of fraud upon Creatrip’s property, its Members, the Platform, Application, or Services (collectively, “Risk Scenarios”).

In instances where Creatrip complies with legal requests for user data without notice to the user for the reasons described above, Creatrip will use commercially reasonable efforts to notify that user about the request after the fact if we determine in good faith that we are no longer legally prohibited from doing so and that no Risk Scenarios apply.


We may also publish, disclose and use Aggregated Information and non-personal information for industry and market analysis, demographic profiling, marketing and advertising, and other business purposes.


BUSINESS TRANSFERS BY CREATRIP
If Creatrip undertakes or is involved in any merger, acquisition, reorganization, sale of assets or bankruptcy or insolvency event, then we may sell, transfer or share some or all of our assets, including your Personal Information. In this event, we will notify you before your Personal Information is transferred and becomes subject to a different privacy policy.


HOW TO ACCESS, CHANGE OR DELETE YOUR INFORMATION, OR CANCEL YOUR CREATRIP ACCOUNT
You may review, update, correct or delete the Personal Information in your Creatrip Account. If you would like to correct your information or cancel your Creatrip Account entirely, you can do so by logging in to your Creatrip Account. Please also note that any reviews, forum postings and similar materials posted by you may continue to be publicly available on the Platform in association with your first name, even after your Creatrip Account is cancelled.


SECURING YOUR PERSONAL INFORMATION
We are continuously implementing and updating administrative, technical, and physical security measures to help protect your Personal Information against unauthorized access, destruction or alteration. However, no method of transmission over the Internet, and no method of storing electronic information, can be 100% secure. So, we cannot guarantee the security of your transmissions to us and of your Personal Information that we store.


YOUR PRIVACY WHEN YOU ACCESS THIRD-PARTY WEBSITES AND RESOURCES
The Platform will contain links to other websites not owned or controlled by Creatrip. Creatrip does not have any control over Third-Party websites. These other websites may place their own cookies, web beacons or other files on your device, or collect and solicit Personal Information from you. They will have their own rules about the collection, use and disclosure of Personal Information. We encourage you to read the terms of use and privacy policies of the other websites that you visit.

Some portions of the Platform implement Google Maps/Earth mapping services, including Google Maps API(s). Your use of Google Maps/Earth is subject to Google’s terms of use (located at www.google.com/intl/en_us/help/terms_maps.html) and Google’s privacy policy (located atwww.google.com/privacy.html), as may be amended by Google from time to time


SPECIAL FEATURES AND PROGRAMS

Referral service and requesting references
The Platform provides a referral service that allows you to invite your friends and contacts to use the Platform. The Platform also allows you to ask your friends and contacts to write a reference for you, to be published on your Creatrip profile.

We may integrate the Platform with third party sites such as Facebook, so that you can send invitation messages or requests for references via the third party site itself. These messages will be sent by the third party site, and Creatrip does not collect or retain the contact information that is used to send them.

You may also send invitation/request emails via the Platform itself, in which case we will ask you for the contact information to which to send your invitation/request. You can type in the email addresses or other contact information manually, or you can choose to import the contacts in your address book(s). In both cases, we may use and store this information for the sole purposes of allowing you to send your friends and contacts an invitation or request for a reference, and for fraud detection and prevention. With respect to referrals, we will also store the email addresses of your invitees to track if your friend joins Creatrip in response to your referral.

If you request us to import your contacts, we will collect, but not store, the username and password for the email account you wish to import your contacts from. We will use this information only for the purpose of importing your contacts.


Affiliate Program
If you are allowed to join Creatrip’s Affiliate Program and you sign up for it, you will have to provide us with certain Personal Information to enable us to provide the Affiliate Program to you.



CHANGES TO THIS PRIVACY POLICY
We may change how we collect and then use Personal Information at any time and without prior notice, at our sole discretion. We may change this Privacy Policy at any time. If we make material changes to the Privacy Policy, we will notify you either by posting the changed Privacy Policy on the Platform or by sending an email to you. We will also update the “Last Updated” date at the top of this Privacy Policy. If we let you know of changes through an email communication, then the date on which we send the email will be deemed to be the date of your receipt of that email.

It’s important that you review the changed Privacy Policy. If you do not wish to agree to the changed Privacy Policy, then we will not be able to continue providing the Platform and Services to you, and your only option will be to stop accessing the Platform and Services and deactivate your Creatrip Account.


GOT FEEDBACK?
Your opinion matters to us! If you’d like to provide feedback to us about this Privacy Policy, please email us at support@creatrip.net. For all other questions or concerns, please email us at support@creatrip.net


COOKIE POLICY
Creatrip uses “cookies” in conjunction with the Platform to obtain information. A cookie is a small data file that is transferred to your device (e.g. your phone or your computer) for record-keeping purposes. For example, a cookie could allow the Platform to recognize your browser, while another could store your preferences and other information.

Your browser may allow you to set how it handles cookies, such as declining all cookies or prompting you to decide whether to accept each cookie. But please note that some parts of the Platform may not work as intended or may not work at all without cookies.


Creatrip cookies and Third Party cookies
Creatrip may place our cookies on your device via the Platform. Accordingly, our Privacy Policy will apply to our treatment of the information we obtain via our cookies.

We may also allow our business partners to place cookies on your device. For example, we use Google Analytics for web analytics, and so Google may also set cookies on your device. As further explained below, Third Parties may also place cookies on your device for advertising purposes.

There are two types of cookies used on the Platform, namely “persistent cookies” and “session cookies”.

Session cookies will normally expire when you close your browser, while persistent cookies will remain on your device after you close your browser, and can be used again the next time you access the Platform.


Other technologies
The Platform may also use other technologies with similar functionality to cookies, such as web beacons and tracking URLs to obtain Log Data about users. We may also use web beacons and tracking URLs in our messages to you to determine whether you have opened a certain message or accessed a certain link.


Uses for Creatrip cookies
Creatrip uses cookies and similar tracking technologies for a number of purposes, such as the following:


to enable, facilitate and streamline the functioning of the Platform across different webpages, devices and browser sessions.

to simplify your access to and use of the Platform and make it more seamless.

to monitor and analyze the performance, operation and effectiveness of the Platform, so that we can improve and optimize it.

to show you content (which may include advertisements) that is more relevant to you.

for fraud detection and prevention.


Uses for Third-Party cookies
Our partners’ cookies are intended to obtain information to help them provide services to Creatrip. For example, Third Parties we engage to provide services to us may track your behavior on our Platform to market and advertise Creatrip listings or services to you on the Platform and Third-party websites, or to help us detect or prevent fraud or conduct risk assessments. Third Parties websites that use cookies and other tracking technologies to deliver targeted advertisements on our Platform and/or Third-Party websites may offer you a way to prevent such targeted advertisements by opting-out at the websites of industry groups such as the Network Advertising Initiative and/or the Digital Advertising Alliance. You may also be able to control advertising cookies provided by publishers, for example Google’s Ad Preference Manager. Please note that even if you choose to opt-out of receiving targeted advertising, you may still receive advertising on or about the Platform – it just will not be tailored to your interests.

In addition, Facebook places a cookie via the Platform that allows Facebook to obtain aggregated, non-Personal Information to optimize their services. For example, if a user clicks on an advertisement for the Creatrip mobile app on Facebook and subsequently installs the app, this cookie will inform Facebook that a user (who is not personally identified) has installed the app after clicking on the advertisement. This cookie may also inform Facebook that a user is using the app, without identifying the specific actions taken by the user in the app.


Disabling Cookies
Most browsers automatically accept cookies, but you can modify your browser setting to decline cookies by visiting the Help portion of your browser’s toolbar. If you choose to decline cookies, please note that you may not be able to sign in, customize, or use some of the interactive features of the Platform. Flash cookies operate differently than browser cookies, and cookie management tools available in a web browser will not remove flash cookies. To learn more about how to manage flash cookies, you can visit the the Adobe website and make changes at the Global Privacy Settings Panel.


Changes to this Cookie Policy
We can change this Cookie Policy at any time. If we make material changes to the Cookie Policy, we will let you know either by posting the changed Cookie Policy on the Platform or by sending you an email.

It’s important that you review the changed Cookie Policy. If you do not wish to agree to the changed Cookie Policy, then we cannot continue to provide the Platform to you, and your only option is to stop accessing the Platform and Services and deactivate your Creatrip Account.


`}</PText>
          </ScrollView>
          {/* <View style={{ width: WIDTH, height: 100, backgroundColor: 'red' }} /> */}
          <View
            style={{
              flexDirection: 'row',
              // backgroundColor: 'red',
              alignSelf: 'flex-end',
              marginRight: 25 * WIDTH_SCALE_RATIO,
            }}>
            <MyTouchableOpacity
              style={{
                ...ptButton.OUTLINE,
                width: ptButton.OUTLINE.width * 0.8,
                height: ptButton.OUTLINE.height * 0.8,
                borderRadius: 20 * WIDTH_SCALE_RATIO,
                marginRight: 16 * WIDTH_SCALE_RATIO,
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
              }}
              rounded
              bordered
              onPress={() => {
                this.onCancelPress();
              }}>
              <PText uppercase={false} style={{ textAlign: 'center', color: COLOR.PRIMARY }}>
                {RootStore.i18n.t('login.cancel').toUpperCase()}
              </PText>
            </MyTouchableOpacity>
            <MyTouchableOpacity
              style={{
                ...ptButton.FILL,
                width: ptButton.FILL.width * 0.8,
                height: ptButton.FILL.height * 0.8,

                borderRadius: 20 * WIDTH_SCALE_RATIO,
                // marginBottom: 100 * HEIGHT_SCALE_RATIO,
                // position: 'absolute',
                // paddingHorizontal: 21 * WIDTH_SCALE_RATIO,
                // paddingVertical: 6 * HEIGHT_SCALE_RATIO,
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
              }}
              rounded
              bordered
              onPress={() => {
                this.onAgreePress();
              }}>
              <PText uppercase={false} style={{ textAlign: 'center', color: COLOR.WHITE }}>
                {RootStore.i18n.t('login.sign-up').toUpperCase()}
              </PText>
            </MyTouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
