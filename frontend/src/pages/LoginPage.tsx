import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ButtonComponent,
  InputField,
  ErrorMessage,
  Title,
  ActionButton,
} from '../components/ui';
import { routes } from '../routes';
import { useAuth } from '../context/AuthContext';
import { normalizeI18nString } from '../utils/normalizeI18nString';

interface ILoginData {
  username: string;
  password: string;
}

export const LoginPage = () => {
  const { t } = useTranslation();
  const {
    register,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginData>();
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [authFailed, setauthFailed] = useState<boolean>(false);

  const [passwordInputType, setInputType] = useState('password');
  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setPasswordShown((prevState) => !prevState);
    setInputType((prevState) =>
      prevState === 'password' ? 'text' : 'password',
    );
  };

  const onSubmit = (data: ILoginData) => {
    setauthFailed(false);
    setButtonDisabled(true);
    fetch(routes.loginPath(), {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          const { role, id, username } = data.user;
          logIn({ role, id, username });
          navigate(routes.documentsRoute());
        } else {
          if (data.status === 403) {
            setauthFailed(true);
            setButtonDisabled(false);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setFocus('username');
  }, [setFocus]);

  return (
    <div className='h-full flex items-center justify-center'>
      <div
        className='relative md:min-w-[400px] shadow-lg rounded-md
        bg-white dark:bg-secondaryDark
        p-4 sm:p-6 md:p-8'
      >
        <form
          className='flex flex-col gap-5 md:gap-7'
          onSubmit={handleSubmit(onSubmit)}
        >
          <Title>{t('loginPage.title')}</Title>
          <InputField
            autoComplete='on'
            placeholder={t('loginPage.placeholders.userName')}
            error={t(normalizeI18nString(errors.username?.message))}
            {...register('username', {
              required: {
                value: true,
                message: 'errorMessages.required',
              },
            })}
          />
          <InputField
            autoComplete='on'
            type={passwordInputType as 'password' | 'text'}
            placeholder={t('loginPage.placeholders.password')}
            error={t(normalizeI18nString(errors.password?.message))}
            {...register('password', {
              required: {
                value: true,
                message: 'errorMessages.required',
              },
              minLength: {
                value: 8,
                message: 'errorMessages.passwordLength',
              },
              maxLength: {
                value: 14,
                message: 'errorMessages.passwordLength',
              },
            })}
            actionButton={
              <ActionButton
                className='absolute top-2 right-3'
                onClick={toggleShowPassword}
                actionType={passwordShown ? 'hidePassword' : 'showPassword'}
              />
            }
          />
          {authFailed && !errors.password && (
            <ErrorMessage className='bottom-14 sm:bottom-16 md:bottom-20'>
              {t('errorMessages.wrongPasswordOrUsername')}
            </ErrorMessage>
          )}
          <ButtonComponent
            disabled={buttonDisabled}
            type='submit'
            variant='primary'
            className='mt-4 md:mt-0'
          >
            {t('loginPage.button')}
          </ButtonComponent>
        </form>
      </div>
    </div>
  );
};
