import React from 'react';
import { Helmet } from 'react-helmet';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { Loading } from '../../components/loading';
import useMe from '../../hooks/useMe';

interface FormValues {
  key: string;
}

export const Home: React.FC = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const { data, loading } = useMe();
  const history = useHistory();
  const onSubmit: SubmitHandler<FormValues> = data => {
    const { key } = data;
    history.push({
      pathname: `/search`,
      search: `?key=${key}`,
    });
  };
  console.log(data);
  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <div
          className='container max-w-full w-full h-screen flex items-center justify-center bg-no-repeat bg-cover bg-center'
          style={{
            backgroundImage: `url('https://pbs.twimg.com/media/EgQH3KAU8AEL4qX.jpg')`,
          }}
        >
          <div className='left-0 top-0 max-w-full w-full h-screen bg-white bg-opacity-30 flex items-center justify-center'>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='container mx-auto'
            >
              <input
                {...register('key')}
                type={'Search'}
                placeholder={'Search dish u want 🤎'}
                className='w-full p-6 border border-gray-300 rounded-md focus:outline-none placeholder-yellow-700 focus:border-yellow-900 text-3xl text-yellow-700'
              />
            </form>
          </div>
        </div>
      </>
    );
  }
};
