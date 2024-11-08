import { useTranslation } from 'react-i18next';

import { DropDown } from '../ui';

export const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();

  const handleChangeLanguage = (language: string) => {
    if (language === i18n.language) return;
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  };

  const languages = {
    ru: t('header.russian'),
    en: t('header.english'),
  };

  return (
    <DropDown
      options={languages}
      name={languages[i18n.language]}
      action={handleChangeLanguage}
    />
  );
};
