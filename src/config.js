const config = {
    s3: {
      REGION: "YOUR_S3_UPLOADS_BUCKET_REGION",
      BUCKET: "YOUR_S3_UPLOADS_BUCKET_NAME",
    },
    apiGateway: {
      REGION: "YOUR_API_GATEWAY_REGION",
      URL: "YOUR_API_GATEWAY_URL",
    },
    cognito: {
      REGION: "us-east-2",
      USER_POOL_ID: "us-east-2_Hk1EXV4eb",
      APP_CLIENT_ID: "61dpaukk97aevf3mh2dru9cqrr",
      IDENTITY_POOL_ID: "us-east-2:773ada83-0491-401c-9100-39d6d3fdcde7",
    },
  };
  
  export default config;
  