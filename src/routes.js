const apiPath = 'https://js-test.kitactive.ru/api';

export default {
  registerPath: () => [apiPath, 'register'].join('/'),
  loginPath: () => [apiPath, 'login'].join('/'),
  logoutPath: () => [apiPath, 'logout'].join('/'),
  mediaGetPath: () => [apiPath, 'media'].join('/'),
  mediaUploadPath: () => [apiPath, 'media', 'upload'].join('/'),
  mediaIdGetPath: (id) => [apiPath, 'media', `${id}`].join('/'),
  mediaDeletePath: (id) => [apiPath, 'media', `${id}`].join('/'),
  registrationPage: () => '/registration',
  loginPage: () => '/login',
  accountPage: () => '/',
};
