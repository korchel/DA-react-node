export const documents = {
  title: 'Documents',
  create: 'Create document',
  searchPlaceholder: "Document or user's name",
  noData: 'No data',
  type: {
    NOTE: 'Note',
    REPORT: 'Report',
    PRESENTATION: 'Presentation',
    ARTICLE: 'Article',
  },
  quantity: {
    count_one: '{{count}} document',
    count_other: '{{count}} documents',
  },
  tableHeader: {
    number: 'Number',
    name: 'Name',
    author: 'Author',
    type: 'Type',
    content: 'Content',
    creationDate: 'Creation date',
    updateDate: 'Update date',
    actions: 'Actions',
  },
  detailsPage: {
    title: 'Document info',
    number: 'Number: ',
    author: 'Author: ',
    type: 'Type: ',
    content: 'Content: ',
    creationDate: 'Creation date: ',
    updateDate: 'Update date: ',
    delete: 'Delete document',
    edit: 'Update document',
  },
  modal: {
    title: {
      edit: 'Document update',
      create: 'New document',
    },
    form: {
      labels: {
        title: 'Name',
        number: 'Number',
        content: 'Content',
        type: 'Type',
        authorId: 'Author',
        availableFor: 'Make available for:',
        publicDocument: 'Make document public',
      },
      placeholders: {
        number: 'Enter a number',
        type: 'Choose type',
        availableFor: 'Choose users',
      },
    },
    delete: {
      areYouSure: 'Are you sure you want to delete this record?',
      toast: {
        error: 'Error occurred',
        success: 'Record deleted',
      },
    },
    create: {
      toast: {
        error: 'Error occurred',
        success: 'Document created',
      },
      button: 'Add document',
    },
    edit: {
      toast: {
        error: 'Error occurred',
        success: 'Document updated',
      },
      button: 'Save changes',
    },
  },
};
