import { documents } from './documents';
import { files } from './files';
import { signupPage } from './signupPage';
import { users } from './users';
import { loginPage } from './loginPage';
import { error } from './error';

export const en = {
  yes: 'yes',
  no: 'no',
  pageDummy: "There's nothing here yet. Come back later.",
  header: {
    english: 'English',
    russian: 'Russian',
    login: 'Log in',
    logout: 'Log out',
    signup: 'Sign up',
    nav: {
      search: 'Search',
      profile: 'Profile',
      files: 'Files',
      documents: 'Documents',
      users: 'Users',
    },
  },
  notFoundPage: {
    title: 'Page not found',
    button: 'Home',
  },
  errorMessages: {
    required: 'Required field',
    passwordLength: '8 to 14 characters',
    confirmPassword: 'Passwords do not match',
    wrongPasswordOrUsername: 'Wrong username or password',
    userExists: 'User already exists',
    inValidEmail: 'Incorrect email',
    docTitleLength: '2 to 50 characters',
    wrongFileType: 'Invalid image file type',
    wrongFileSize: 'File size should not exceed 10MB',
  },
  loginPage,
  signupPage,
  documents,
  files,
  users,
  cancel: 'Cancel',
  delete: 'Delete',
  download: 'Download',
  see: 'See details',
  edit: 'Edit',
  error,
  emptyTable: 'The table is empty',
  show: 'Show:',
};
