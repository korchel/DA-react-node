export const users = {
  title: 'Список пользователей',
  searchPlaceholder: 'Имя пользователя',
  quantity: {
    count_one: '{{count}} пользователль',
    count_few: '{{count}} пользователя',
    count_many: '{{count}} пользователей',
  },
  tableHeader: {
    userName: 'Имя пользователя',
    name: 'Имя',
    lastName: 'Фамилия',
    roles: 'Роли',
    registration: 'Дата регистрации',
  },
  roles: {
    ROLE_ADMIN: 'Администартор',
    ROLE_USER: 'Пользователь',
    ROLE_MODERATOR: 'Модератор',
  },
  detailsPage: {
    title: 'Информация о пользователе ',
    username: 'Имя пользователя: ',
    name: 'Имя: ',
    lastName: 'Фамилия: ',
    email: 'e-mail: ',
    roles: 'Роли: ',
    delete: 'Удалить пользователя',
    edit: 'Редактировать данные',
  },
  modal: {
    title: {
      edit: 'Редактирование данных пользователя',
    },
    form: {
      labels: {
        username: 'Имя пользователя',
        email: 'Адрес электронной почты',
        name: 'Имя',
        lastname: 'Фамилия',
      },
      plaveholders: {},
    },
    edit: {
      toast: {
        error: 'Произошла ошибка',
        success: 'Данные пользователя изменены',
      },
      button: 'Сохранить изменения',
    },
    delete: {
      areYouSure: 'Вы уверены, что хотите удалить этого пользователя?',
      toast: {
        error: 'Произошла ошибка',
        success: 'Пользователь удален',
      },
    },
  },
};
