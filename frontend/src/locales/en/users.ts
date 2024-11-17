export const users = {
  title: 'Users',
  searchPlaceholder: "User's name",
  quantity: {
    count_one: '{{count}} users',
    count_other: '{{count}} users',
  },
  tableHeader: {
    userName: 'Username',
    name: 'Name',
    lastName: 'Last name',
    role: 'Role',
    registration: 'Registration date',
  },
  roles: {
    ROLE_ADMIN: 'Administrator',
    ROLE_USER: 'User',
    ROLE_MODERATOR: 'Moderator',
  },
  detailsPage: {
    title: 'User info ',
    username: 'User name: ',
    name: 'Name: ',
    lastName: 'Last name: ',
    email: 'e-mail: ',
    role: 'Role',
    delete: 'Delete user',
    edit: 'Update data',
    registration: 'Registration date',
  },
  modal: {
    title: {
      edit: 'Update user data',
    },
    form: {
      labels: {
        username: 'Username',
        email: 'email',
        name: 'Name',
        lastname: 'Last name',
      },
      plaveholders: {},
    },
    edit: {
      toast: {
        error: 'Error occurred',
        success: 'User info updated',
      },
      button: 'Save changes',
    },
    delete: {
      areYouSure: 'Are you sure you want to delete this user?',
      toast: {
        error: 'Error occurred',
        success: 'User deleted',
      },
    },
  },
};
