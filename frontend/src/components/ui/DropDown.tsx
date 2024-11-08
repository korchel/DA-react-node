import { DetailedHTMLProps, HTMLAttributes, useRef, useState } from 'react';
import { ButtonComponent } from './ButtonComponent';
import clsx from 'clsx';
import { useClickOutside } from '../../hooks';

interface IDropDown
  extends DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement> {
  name: string | null;
  options: Record<string, string>;
  action: (param: string) => void;
}

export const DropDown = ({ name, options, action, className }: IDropDown) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const ref = useRef(null);

  const handleChooseOption = (e) => {
    const param = e.target.dataset.param;
    setMenuOpen(false);
    action(param);
  };

  const handleClickOutside = () => {
    setMenuOpen(false);
  };

  const handleOpenMenu = () => {
    setMenuOpen((state) => !state);
  };

  useClickOutside(ref, handleClickOutside);

  return (
    <div className={clsx(className, 'relative')}>
      <ButtonComponent variant='outline' onClick={handleOpenMenu}>
        {name}
      </ButtonComponent>
      <div
        ref={ref}
        className={clsx(
          menuOpen ? 'block' : 'hidden',
          'absolute right-0 top-10',
        )}
      >
        {Object.keys(options).map((option) => (
          <ButtonComponent
            variant='borderLess'
            className='w-full text-right rounded-none'
            onClick={(e) => handleChooseOption(e)}
            data-param={option}
            key={option}
          >
            {options[option]}
          </ButtonComponent>
        ))}
      </div>
    </div>
  );
};
