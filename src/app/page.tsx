'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import Loader from '@/app/components/loader.tsx';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const fakeErrorResponse = (v: string) => {
    setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 1500)
    
    if (v === 'email') {
      setEmailError(`Email that you entered doesn't exist`)
    } else {
      setPasswordError(`Incorect password`)
    }
  }

  const passwordCheck = () => {
    setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 1500)

    setEmailError(`Email that you entered doesn't exist`)
  }

  const onButtonClick = () => {
    setEmailError('')
    setPasswordError('')
  
    if ('' === email) {
      setEmailError('Please enter your email')
      return
    } else if ('' === password) {
      setPasswordError('Please enter a password')
      return
    }
  
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email')
      return
    }

    if (email === 'incorrect@email.com') {
      return fakeErrorResponse('email')
    }

    if (password === '12345678') {
      return fakeErrorResponse('password')
    }
  
    if (password.length < 7) {
      setPasswordError('The password must be 8 characters or longer')
      return
    }

    setLoading(true)
  
    const timeoutId = setTimeout(() => {
      router.push('/otp')
    }, 2000)

    return () => {
      clearTimeout(timeoutId)
    }
  }

  return (
    <main className='h-full flex justify-center align-middle'>
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {!loading ? (
          <>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" action={onButtonClick}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      name="email"
                      type="text"
                      value={email}
                      placeholder="Enter your email here"
                      onChange={(ev) => setEmail(ev.target.value)}
                    />
                    <label className="block pt-1 text-xs font-normal leading-6 text-red-500">{emailError}</label>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      name="password"
                      type="password"
                      value={password}
                      placeholder="Enter your password here"
                      onChange={(ev) => setPassword(ev.target.value)}
                    />
                    <label className="block pt-1 text-xs font-normal leading-6 text-red-500">{passwordError}</label>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <Loader />
        )
        }
      </div>
    </main>
  )
}

export default Login
