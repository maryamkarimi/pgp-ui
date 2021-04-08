const config = {
  s3: {
    REGION: 'us-east-2',
    BUCKET: 'porngenomeimages190606-dev',
  },
  apiGateway: {
    NAME: 'pgp',
    REGION: 'us-east-2',
    URL: 'https://nfl0p3kia2.execute-api.us-east-2.amazonaws.com/Prod',
  },
  cognito: {
    REGION: 'us-east-2',
    USER_POOL_ID: 'us-east-2_Hk1EXV4eb',
    APP_CLIENT_ID: '61dpaukk97aevf3mh2dru9cqrr',
    IDENTITY_POOL_ID: 'us-east-2:23f2f77a-03f2-43c7-96a8-deee517dc93f',
  },
};

export default config;
