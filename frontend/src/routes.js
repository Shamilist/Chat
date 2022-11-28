const apiPath = '/api/v1';

const routes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
  homePage: () => '/',
  loginPage: () => '/login',
  signupPage: () => '/signup',
  pageNotFound: () => '*',
};

export default routes;
