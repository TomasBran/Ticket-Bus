import logo from '../assets/logo.png';
import { supabase } from '../supabaseClient';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ErrorAlert from './ErrorAlert';

const REDIRECT_URL = `${import.meta.env.VITE_BASE_URL}/app`;

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    signInWithEmail();
  }

  async function signInWithGoogle() {
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: REDIRECT_URL
      }
    });
  }

  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

    // If log-in fails
    if (error) {
      // Handle the error
      setErrorMessage(error.message);
      console.error(error.message);
      // If log-in is successful
    } else if (data) {
      // Redirect the user to a new page
      navigate('/app');
    }
  }

  return (
    <div className='mx-auto w-full max-w-sm lg:w-96'>
      <div>
        <img className='h-10 w-auto' src={logo} alt='Your Company' />
        <h2 className='mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          Sign in to your account
        </h2>
        <p className='mt-2 text-sm leading-6 text-gray-500'>
          Not a member?
          <Link
            to='/register'
            className='font-semibold text-blue-600 hover:text-blue-500 ml-1'
          >
            Create an account
          </Link>
        </p>
      </div>

      <div className={errorMessage ? 'mt-4' : 'mt-8'}>
        {errorMessage && <ErrorAlert errorMessage={errorMessage} />}
        <div>
          <form
            onSubmit={(e) => handleSubmit(e)}
            method='POST'
            className='space-y-6'
          >
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Email address
              </label>
              <div className='mt-2'>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-2'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Password
              </label>
              <div className='mt-2'>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-2'
                />
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <input
                  id='remember-me'
                  name='remember-me'
                  type='checkbox'
                  className='h-4 w-4 rounded border-gray-300 text-blue-600'
                />
                <label
                  htmlFor='remember-me'
                  className='ml-3 block text-sm leading-6 text-gray-700'
                >
                  Remember me
                </label>
              </div>

              <div className='text-sm leading-6'>
                <a
                  href='#'
                  className='font-semibold text-blue-600 hover:text-blue-500'
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
              >
                Sign in
              </button>
            </div>
          </form>
        </div>

        <div className='mt-10'>
          <div className='relative'>
            <div
              className='absolute inset-0 flex items-center'
              aria-hidden='true'
            >
              <div className='w-full border-t border-gray-200' />
            </div>
            <div className='relative flex justify-center text-sm font-medium leading-6'>
              <span className='bg-white px-6 text-gray-900'>
                Or continue with
              </span>
            </div>
          </div>

          <div className='mt-6'>
            <button
              onClick={() => {
                signInWithGoogle();
              }}
              className='flex w-full items-center justify-center gap-3 rounded-md shadow-md px-3 py-1.5 text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
            >
              <svg
                stroke='currentColor'
                fill='currentColor'
                strokeWidth='0'
                version='1.1'
                x='0px'
                y='0px'
                viewBox='0 0 44 44'
                height='1em'
                width='1em'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill='#FFC107'
                  d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'
                ></path>
                <path
                  fill='#FF3D00'
                  d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'
                ></path>
                <path
                  fill='#4CAF50'
                  d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'
                ></path>
                <path
                  fill='#1976D2'
                  d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'
                ></path>
              </svg>
              <span className='text-sm font-semibold leading-6'>Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
