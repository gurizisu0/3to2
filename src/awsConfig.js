import { CognitoAuth } from 'amazon-cognito-auth-js/dist/amazon-cognito-auth';
export const AuthConfig = {
  // identityPoolId はCognito Identity PoolのFederatedItentityProviderにGoogleやFacebookを登録している場合に必要。
  // このサンプルではCognito User PoolのユーザーとしてGoogleやFacebookのユーザーをログインさせる(UserPoolのログインIDが付与される)
  // identityPoolId: "us-east-1:6317760e-ae25-4c71-9901-855dd1d9c435", //REQUIRED - Amazon Cognito Identity Pool ID
  region: "ap-northeast-1", // REQUIRED - Amazon Cognito Region
  userPoolId: "ap-northeast-1_U6t5H5sXk", //OPTIONAL - Amazon Cognito User Pool ID
  userPoolWebClientId: "1n9rdtcc650uhmb9tat9brakh" //OPTIONAL - Amazon Cognito Web Client ID
};

export const GetCognitoAuth = (identifyProvider, onSuccess, onFailure)=>{

  var authData = {
    ClientId : '1n9rdtcc650uhmb9tat9brakh', // Your client id here
    AppWebDomain : 'https://guildusers.auth.ap-northeast-1.amazoncognito.com',
    TokenScopesArray : ['email', 'openid'],
    RedirectUriSignIn : 'http://localhost:8080/',
    RedirectUriSignOut : 'http://localhost:8080/',
    IdentityProvider: identifyProvider
  };
  var auth = new CognitoAuth(authData);
  auth.userhandler = {
    onSuccess: function(result) {
      if (onSuccess){onSuccess(result);}
      console.log(result);
    },
    onFailure: function(err) {
      console.log(err);
      if (onFailure){onFailure(err);}
    }
  };
  auth.useCodeGrantFlow();

  return auth;

};
