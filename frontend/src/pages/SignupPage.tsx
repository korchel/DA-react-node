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
            error={errors.username}
            {...register('username', {
              required: { value: true, message: t('errorMessages.reuired') },
            })}
          />
          <InputField
            autoComplete='on'
            type='email'
            placeholder={t('signupPage.placeholders.email')}
            error={errors.email}
            {...register('email', {
              required: {
                value: true,
                message: t('errorMessages.reuired'),
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: t('errorMessages.inValidEmail'),
              },
            })}
          />
          <InputField
            placeholder={t('signupPage.placeholders.name')}
            error={errors.name}
            {...register('name', {
              required: { value: true, message: t('errorMessages.reuired') },
            })}
          />
          <InputField
            error={errors.lastname}
            placeholder={t('signupPage.placeholders.lastname')}
            {...register('lastname', {
              required: { value: true, message: t('errorMessages.reuired') },
            })}
          />
          <InputField
            autoComplete='new-password'
            type='password'
            placeholder={t('signupPage.placeholders.password')}
            error={errors.password}
            {...register('password', {
              required: {
                value: true,
                message: t('errorMessages.reuired'),
              },
              minLength: {
                value: 8,
                message: t('errorMessages.passwordLength'),
              },
              maxLength: {
                value: 14,
                message: t('errorMessages.passwordLength'),
              },
            })}
          />
          <InputField
            autoComplete='new-password'
            type='password'
            placeholder={t('signupPage.placeholders.repeatPassword')}
            error={errors.passwordConfirm}
            {...register('passwordConfirm', {
              required: {
                value: true,
                message: t('errorMessages.reuired'),
              },
              validate: (value) => {
                const password = getValues('password');
                return value === password || t('errorMessages.confirmPassword');
              },
            })}
          />
          {signupFailed && (
            <ErrorMessage className='bottom-16'>
              {t('errorMessages.userExists')}
            </ErrorMessage>
          )}
          <ButtonComponent
            disabled={buttonDisabled}
            type='submit'
            variant='primary'
          >
            {t('signupPage.button')}
          </ButtonComponent>
        </form>
      </div>
    </div>
  );
};
