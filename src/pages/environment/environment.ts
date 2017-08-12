export const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "APP_ID.firebaseapp.com",
  databaseURL: "https://APP_ID.firebaseio.com",
  projectId: "APP_ID",
  storageBucket: "APP_ID.appspot.com",
  messagingSenderId: "MESSAGE_SENDER_ID"
};

export const facebookConfig = {
  apiKey: '',
  clientToken: ''
};

export const twitterConfig = {
  apiKey: '',
  accessToken: '',
  appOnlyAuth: 'https://api.twitter.com/oauth2/token',
  requestTokenURL: 'https://api.twitter.com/oauth/request_token',
  authorizeURL: 'https://api.twitter.com/oauth/authorize',
  accessTokenURL: 'https://api.twitter.com/oauth/access_token'
};

export const campusBooks = {
  apiKey: '',
  apiURL: 'http://api2.campusbooks.com/12/rest/',
  apiPrices: 'http://api2.campusbooks.com/12/rest/prices?key=&isbn=',
  apiBookInfo: 'http://api2.campusbooks.com/12/rest/bookinfo?key=&isbn=',
  apiSearch: 'http://api2.campusbooks.com/12/rest/search?key=',
  apiBookPrices: 'http://api2.campusbooks.com/12/rest/bookprices?key=&isbn=',
  apiBuyBackPrices: 'http://api2.campusbooks.com/12/rest/buybackprices?key=&isbn=',
  apiMerchants: 'http://api2.campusbooks.com/12/rest/merchants?key='
};
