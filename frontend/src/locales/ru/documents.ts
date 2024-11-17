export const documents = {
  title: 'Список документов',
  create: 'Создать документ',
  searchPlaceholder: 'Документ или пользователь',
  noData: 'Нет данных',
  type: {
    NOTE: 'Записка',
    REPORT: 'Отчет',
    PRESENTATION: 'Презентация',
    ARTICLE: 'Статья',
  },
  quantity: {
    count_one: '{{count}} документ',
    count_few: '{{count}} документа',
    count_many: '{{count}} документов',
  },
  tableHeader: {
    number: 'Номер',
    name: 'Название',
    author: 'Автор',
    type: 'Тип',
    content: 'Содержание',
    creationDate: 'Дата создания',
    updateDate: 'Дата обновления',
    actions: 'Действия',
  },
  detailsPage: {
    title: 'Информация о документе ',
    number: 'Номер: ',
    author: 'Автор: ',
    type: 'Тип: ',
    public: 'Доступен всем: ',
    content: 'Содержание: ',
    creationDate: 'Дата создания: ',
    updateDate: 'Дата обновления: ',
    delete: 'Удалить документ',
    edit: 'Изменить документ',
  },
  modal: {
    title: {
      edit: 'Редактирование документа',
      create: 'Создание документа',
    },
    form: {
      labels: {
        title: 'Название',
        number: 'Номер документа',
        content: 'Содержание',
        type: 'Тип документа',
        authorId: 'Автор',
        availableFor: 'Сделать доступным для:',
        publicDocument: 'Сделать документ публичным',
      },
      placeholders: {
        number: 'Введите число',
        type: 'Выберите тип',
        availableFor: 'Выберите пользователей',
      },
    },
    delete: {
      areYouSure: 'Вы уверены, что хотите удалить эту запись?',
      toast: {
        error: 'Произошла ошибка',
        success: 'Запись удалена',
      },
    },
    create: {
      toast: {
        error: 'Произошла ошибка',
        success: 'Документ создан',
      },
      button: 'Добавить документ',
    },
    edit: {
      toast: {
        error: 'Произошла ошибка',
        success: 'Документ изменен',
      },
      button: 'Сохранить изменения',
    },
  },
};
