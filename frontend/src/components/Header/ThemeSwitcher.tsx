import { useEffect, useState } from 'react';

import { Switcher } from '../ui';
import { MoonIcon, SunIcon } from '../ui/icons';
import { useTheme } from '../../context/ThemeContext';

interface IThemeSwitcher {
  className?: string;
}

export const ThemeSwitcher = ({ className }: IThemeSwitcher) => {
  const { theme, setDarkTheme, setLightTheme } = useTheme();
  const [isToggled, setIsToggled] = useState(theme == 'dark');

  const handleChangeTheme = () => {
    setIsToggled((state) => !state);
  };

  useEffect(() => {
    if (isToggled) setDarkTheme();
    if (!isToggled) setLightTheme();
  }, [isToggled]);

  return (
    <Switcher
      className={className}
      isToggled={isToggled}
      onToggle={handleChangeTheme}
      icons={{
        left: <SunIcon className='absolute text-white z-20 left-0.5 top-0.5' />,
        right: (
          <MoonIcon className='absolute text-whiteDark z-20 right-0.5 top-[3px]' />
        ),
      }}
    />
  );
};
