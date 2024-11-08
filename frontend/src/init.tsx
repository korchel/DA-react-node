import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

import { resources } from './locales/resources';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import store from './store';
import ErrorBoundary from './components/ErrorBoundary';
import { ErrorPage } from './pages/ErrorPage';

export const init = () => {
  const i18n = i18next.createInstance();
  i18n.use(initReactI18next).init({
    resources,
    lng: localStorage.getItem('language') || 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
    debug: true,
  });

  return (
    <I18nextProvider i18n={i18n}>
      <ErrorBoundary fallback={<ErrorPage />}>
        <Provider store={store}>
          <AuthProvider>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </AuthProvider>
        </Provider>
      </ErrorBoundary>
    </I18nextProvider>
  );
};
