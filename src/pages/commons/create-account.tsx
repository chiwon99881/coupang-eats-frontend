import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import logo from '../../images/coupang-eats-logo.png';
import { UserRole } from '../../constants';
import { ErrorMessage } from '../../components/errorMessage';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { createUserMutation, createUserMutationVariables } from '../../__generated__/createUserMutation';
import { Loading } from '../../components/loading';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const CREATE_USER_MUTATION = gql`
  mutation createUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      ok
      error
      user {
        id
      }
    }
  }
`;

interface FormValues {
  email: string;
  password: string;
  phone: string;
  address: string;
  role: UserRole;
}

export const CreateAccount: React.FC = () => {
  const history = useHistory();
  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm<FormValues>({ mode: 'onChange' })

  const onCompleted = (data: createUserMutation) => {
    const { createUser: {ok, error, user} } = data;
    if(ok) {
      if(user) {
        toast.success('Create account successfully 🤍, Go login !')
        setTimeout(() => {
          history.push("/")
        }, 3000);
      }
    } else {
      toast.error(`${error} 😥`)
      console.log(error);
    }
  }

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    try {
      const { email, password, phone, address, role } = data;
      createUser({variables: {input: {email, password, phone, address, role}}});
    } catch(error) {
      console.log(error);
    }
  };

  const [createUser, {loading: createUserLoading}] = useMutation<createUserMutation, createUserMutationVariables>(CREATE_USER_MUTATION, {onCompleted})

  return (
    <>
    <Helmet><title>Create Account</title></Helmet>
    <div className="container mx-auto h-screen flex flex-col items-center">
      <div
        style={{
          backgroundImage: `url(${logo})`,
          backgroundSize: 600,
          backgroundRepeat: 'no-repeat',
        }}
        className="p-32 bg-contain bg-center"
      />
      <div className="w-1/4 h-auto flex justify-center border border-gray-300 rounded-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full p-5 flex flex-col items-center"
        >
          <input
            type={'email'}
            className="form-input"
            placeholder={'Email'}
            {...register('email', {
              required: true,
              // eslint-disable-next-line
              pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          {errors.email?.type === "required" && <ErrorMessage message={"Email is required."} />}
          {errors.email?.type === "pattern" && <ErrorMessage message={"Invalid email."} />}
          <input
            type={'password'}
            placeholder={'Password'}
            className="form-input"
            {...register('password', { required: true })}
          />
          {errors.password?.type === "required" && <ErrorMessage message={"Password is required."} />}
          <input
            type={'text'}
            placeholder={'Phone Number'}
            className="form-input"
            {...register('phone', {
              required: true,
              pattern: /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/,
            })}
          />
          {errors.phone?.type === "required" && <ErrorMessage message={"Phone Number is required."} />}
          {errors.phone?.type === "pattern" && <ErrorMessage message={"Invalid Phone Number."} />}
          <input
            type={'text'}
            placeholder={'Address'}
            className="form-input"
            {...register('address', { required: true })}
          />
          {errors.password?.type === "required" && <ErrorMessage message={"Address is required."} />}
          <select className="form-input" {...register('role', {required: true})}>
            <option value={""} disabled selected>Select Role</option>
            {Object.keys(UserRole).map((role, index) => {
              return (
                <option value={role} key={index}>
                  {role}
                </option>
              );
            })}
          </select>
          {errors.role?.type === "required" && <ErrorMessage message={'Role is required.'} />}
          {createUserLoading ? <Loading /> : <button type={'submit'} className={`w-full bg-blue-300 p-4 rounded-sm text-white font-medium ${isValid ? 'bg-opacity-100' : 'bg-opacity-30 pointer-events-none'}`}>Create account</button>}
          <div className="border-t border-gray-300 w-full h-px my-5"></div>
          <span className="font-medium">You already have account?<Link to={"/"} className="text-blue-300 font-medium ml-2">Login here!</Link></span>
        </form>
      </div>
    </div>
    </>
  );
};
