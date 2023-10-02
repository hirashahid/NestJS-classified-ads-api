export default () => ({
  JWT: {
    auth_token: process.env.JWT_SECRET_KEY,
    timeout: process.env.JWT_EXPIRY_TIME,
  },
});
