import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import logo from '../../images/coupang-eats-logo.png';
import { ErrorMessage } from '../../components/errorMessage';

interface FormData {
  email: string;
  password: string;
}

export const Login: React.FunctionComponent = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: 'onChange' });
  const onSubmit = () => {
    const values = getValues();
    console.log(values);
  };
  return (
    <div className="container h-screen mx-auto flex flex-col items-center">
      <div
        style={{
          backgroundImage: `url(${logo})`,
          backgroundSize: 600,
          backgroundRepeat: 'no-repeat',
        }}
        className="p-32 bg-contain bg-center"
      ></div>
      <div className="w-1/4 h-auto flex justify-center border border-gray-300 rounded-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full p-5 flex flex-col items-center"
        >
          <input
            {...register('email', {
              required: true,
              //eslint-disable-next-line
              pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            type={'email'}
            placeholder={'Email'}
            className="bg-gray-50 w-full px-2 py-3 border border-gray-300 rounded-sm mb-3 focus:outline-none"
          />
          {errors.email?.type === 'pattern' && (
            <ErrorMessage message={'Incorrectly email.'} />
          )}
          {errors.email?.type === 'required' && (
            <ErrorMessage message={'Email is required.'} />
          )}
          <input
            {...register('password', { required: true })}
            type={'password'}
            placeholder={'Password'}
            className="bg-gray-50 w-full px-2 py-3 border border-gray-300 rounded-sm mb-3 focus:outline-none"
          />
          {errors.password?.type === 'required' && (
            <ErrorMessage message={'Password is required.'} />
          )}
          <button
            type={'submit'}
            className={`w-full bg-blue-300 p-4 rounded-sm text-white font-medium ${
              isValid ? 'bg-opacity-100' : 'bg-opacity-30 pointer-events-none'
            }`}
          >
            Log In
          </button>
          <div className="border-t border-gray-300 h-px w-full my-8"></div>
          <span className="font-medium">
            You don't have account?{' '}
            <Link
              to="create-account"
              className="text-blue-300 font-medium ml-2"
            >
              Sign up here!
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};
