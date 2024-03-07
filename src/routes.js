const apiPath = 'https://js-test.kitactive.ru/api';

const routes = {
  registerPath: () => [apiPath, 'register'].join('/'),
  loginPath: () => [apiPath, 'login'].join('/'),
  logoutPath: () => [apiPath, 'logout'].join('/'),
  mediaGetPath: () => [apiPath, 'media'].join('/'),
  mediaUploadPath: () => [apiPath, 'media', 'upload'].join('/'),
  mediaIdGetPath: () => [apiPath, 'media'].join('/'),
  mediaDeletePath: () => [apiPath, 'media'].join('/'),
  registrationPage: () => '/registration',
  loginPage: () => '/login',
  accountPage: () => '/',
};

export default routes;
