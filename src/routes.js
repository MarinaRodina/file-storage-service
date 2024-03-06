const apiPath = 'https://js-test.kitactive.ru/api';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
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
