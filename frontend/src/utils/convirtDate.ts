export const convirtDate = (isosDateString, currentLanguage) => {
  const locales = {
    ru: 'ru-RU',
    en: 'en-US',
  };
  const readableDate = new Date(isosDateString);
  const date = readableDate.toLocaleDateString(locales[currentLanguage]);
  const time = readableDate.toLocaleTimeString(locales[currentLanguage], {hour: '2-digit', minute:'2-digit'})

  return `${date} ${time}`;
};
