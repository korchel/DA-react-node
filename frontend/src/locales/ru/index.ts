import { documents } from './documents';
import { files } from './files';
import { signupPage } from './signupPage';
import { users } from './users';
import { loginPage } from './loginPage';
import { error } from './error';

export const ru = {
  pageDummy: 'Здесь пока ничего нет. Зайдите попозже.',
  header: {
    english: 'Английский',
    russian: 'Русский',
    login: 'Войти',
    logout: 'Выйти',
    signup: 'Регистрация',
    nav: {
      search: 'Поиск',
      profile: 'Профиль',
      files: 'Файлы',
      documents: 'Документы',
      users: 'Пользователи',
    },
  },
  notFoundPage: {
    title: 'Страница не найдена',
    button: 'На главную',
  },
  errorMessages: {
    reuired: 'Обязательное поле',
    passwordLength: 'Длина пароля должна быть от 8 до 14 символов',
    confirmPassword: 'Пароли должны совпадать',
    wrongPasswordOrUsername: 'Неправильное имя пользователя или пароль',
    userExists: 'Такой пользователь уже существует',
    inValidEmail: 'Невалидный адрес электронной почты',
  },
  loginPage,
  signupPage,
  documents,
  files,
  users,
  cancel: 'Отмена',
  delete: 'Удалить',
  download: 'Скачать',
  see: 'Посмотреть',
  edit: 'Изменить',
  error,
  emptyTable: 'Таблица пуста',
  show: 'Показывать по:',
};
