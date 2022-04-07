import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import Authenticated from './screens/Authenticated';
import Authentication from './screens/Authentication';

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  async function signIn() {
    try {
      // Attempt login with permissions
      LoginManager.setLoginBehavior('native_only');
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
      ]);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      // Sign-in the user with the credential
      return auth().signInWithCredential(facebookCredential);
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    auth().onAuthStateChanged((userState) => {
      setAuthenticated(!!userState);
    });
  }, []);

  if (authenticated) {
    return <Authenticated />;
  }
  return <Authentication signIn={signIn} />;
}
