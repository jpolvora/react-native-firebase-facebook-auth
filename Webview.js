import React, { createRef } from 'react';
import { WebView } from 'react-native-webview';

const script = /* js */ `
  (function () {
    window._msgCount = window._msgCount || 0
    setTimeout(() => {
    window._msgCount++
      window.ReactNativeWebView.postMessage('Hello!');
    }, 2000);
    true;
  })();`;

let webViewRef;

let currentUrl = null;

const handleLoad = ({ nativeEvent }) => {
  console.log('loaded', nativeEvent);

  if (webViewRef && webViewRef.current != null) {
    webViewRef.current.injectJavascript(script);
  }
};

const handleError = ({ nativeEvent }) => console.error(nativeEvent);

const handleWebViewNavigationStateChange = (newNavState) => {
  const { url } = newNavState;
  console.log(url);
  currentUrl = url;
  if (!url) {
    return;
  }

  if (webViewRef && webViewRef.current != null) {
    webViewRef.current.injectJavascript(script);
  }
};

export default function Webview() {
  return (
    <WebView
      source={{ uri: 'https://cedweb.azurewebsites.net' }}
      onMessage={() => {}}
      ref={webViewRef}
      javaScriptEnabled
      onHttpError={handleError}
      onError={handleError}
      onLoad={handleLoad}
      onNavigationStateChange={handleWebViewNavigationStateChange}
    />
  );
}
