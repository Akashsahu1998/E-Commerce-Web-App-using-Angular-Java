export default {
    oidc: {
        clientId: '0oa20s2wadhsX0Eqn5d7',   // public identifier of the client app
        issuer: 'http://dev-91861588.okta.com/oauth2/default',  // issuer of tokens, URL when authorizing with Okta Authorization Server
        redirectUri: 'http://localhost:4200/login/callback',    // Once user logs in send them here
        scopes: ['openid', 'profile', 'email']   // Scopes provides access to information about a user
    }                                               // openid : required for authentication requests 
}                                               // profile : user's first name, last name, phone etc
                                                // email : user's email address

