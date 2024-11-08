import {resources} from '../src/locales/resources';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: typeof resources['ru'];
  }
}
