import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  ButtonComponent,
  InputField,
  ErrorMessage,
  Title,
} from '../components/ui';
import { routes } from '../routes';
import { normalizeI18nString } from '../utils/normalizeI18nString';

interface ISignupData {
  name: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export const SignupPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    register,
    setFocus,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ISignupData>();
  const [signupFailed, setSignupFailed] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onSubmit = (data: ISignupData) => {
    setSignupFailed(false);
    setButtonDisabled(true);
    fetch(routes.signupPath(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          navigate(routes.loginRoute());
        } else {
          if (response.status === 400) {
            setSignupFailed(true);
            setButtonDisabled(false);
          }
        }
      })
      .catch((error) => console.log(error));
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
          className='flex flex-col gap-3 sm:gap-5 md:gap-7'
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Title>{t('signupPage.title')}</Title>
          <InputField
            placeholder={t('signupPage.placeholders.username')}
            error={t(normalizeI18nString(errors.username?.message))}
            {...register('username', {
              required: { value: true, message: 'errorMessages.required' },
            })}
          />
          <InputField
            autoComplete='on'
            type='email'
            placeholder={t('signupPage.placeholders.email')}
            error={t(normalizeI18nString(errors.email?.message))}
            {...register('email', {
              required: {
                value: true,
                message: 'errorMessages.required',
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'errorMessages.inValidEmail',
              },
            })}
          />
          <InputField
            placeholder={t('signupPage.placeholders.name')}
            error={t(normalizeI18nString(errors.name?.message))}
            {...register('name', {
              required: { value: true, message: 'errorMessages.required' },
            })}
          />
          <InputField
            error={t(normalizeI18nString(errors.lastname?.message))}
            placeholder={t('signupPage.placeholders.lastname')}
            {...register('lastname', {
              required: { value: true, message: 'errorMessages.required' },
            })}
          />
          <InputField
            autoComplete='new-password'
            type='password'
            placeholder={t('signupPage.placeholders.password')}
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
          />
          <InputField
            autoComplete='new-password'
            type='password'
            placeholder={t('signupPage.placeholders.repeatPassword')}
            error={t(normalizeI18nString(errors.passwordConfirm?.message))}
            {...register('passwordConfirm', {
              required: {
                value: true,
                message: 'errorMessages.required',
              },
              validate: (value) => {
                const password = getValues('password');
                return value === password || 'errorMessages.confirmPassword';
              },
            })}
          />
          {signupFailed && (
            <ErrorMessage className='bottom-14 sm:bottom-16 md:bottom-20'>
              {t('errorMessages.userExists')}
            </ErrorMessage>
          )}
          <ButtonComponent
            disabled={buttonDisabled}
            type='submit'
            variant='primary'
            className='mt-5 md:mt-0'
          >
            {t('signupPage.button')}
          </ButtonComponent>
        </form>
      </div>
    </div>
  );
};
