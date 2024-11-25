const apiPath = `${process.env.URL}/api`;

export const routes = {
  loginRoute: () => '/login',
  signupRoute: () => '/signup',

  searchRoute: () => '/search',

  documentsRoute: () => '/',
  documentDetailsRoute: (id: number) => `/documents/${id}`,

  usersRoute: () => '/users',
  userDetailsRoute: (id: string | number | undefined) => `/users/${id}`,

  filesRoute: () => '/files',
  fileDetailsRoute: (id: number) => `/files/${id}`,

  loginPath: () => [apiPath, 'auth', 'sign-in'].join('/'),
  signupPath: () => [apiPath, 'auth', 'sign-up'].join('/'),

  thumbnailPath: (id) => [apiPath, 'files', `${id}/thumbnail`].join('/'),
  fileDownloadPath: (id) => [apiPath, 'files', `download/${id}`].join('/'),
};
