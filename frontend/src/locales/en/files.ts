export const files = {
  title: 'Files',
  create: 'Add file',
  searchPlaceholder: "File or user's name",
  quantity: {
    count_one: '{{count}} file',
    count_other: '{{count}} files',
  },
  tableHeader: {
    fileName: 'Name',
    author: 'Author',
    fileType: 'Type',
    creationDate: 'Creation date',
    updateDate: 'Update date',
    actions: 'Actions',
  },
  detailsPage: {
    title: 'File ',
    name: 'Name: ',
    available: 'Available for: ',
    forEverybody: 'всех',
    forNoone: 'никого',
    author: 'Author: ',
    type: 'Type: ',
    creationDate: 'Creation date: ',
    delete: 'Delete file',
    edit: 'Edit file',
  },
  modal: {
    title: {
      edit: 'Update file permissions',
      create: 'File upload',
    },
    form: {
      labels: {
        availableFor: 'Make available for:',
        publicFile: 'Make file public',
        addFile: 'Add file',
      },
      placeholders: {
        availableFor: 'Choose users',
      },
    },
    delete: {
      areYouSure: 'Are you sure you want to delete this file?',
      toast: {
        error: 'Error occurred',
        success: 'File deleted',
      },
    },
    upload: {
      toast: {
        error: 'Error occurred',
        success: 'File added',
      },
      button: 'Upload file',
    },
    edit: {
      toast: {
        error: 'Error occurred',
        success: 'Access to file changed',
      },
      button: 'Save changes',
    },
  },
};
