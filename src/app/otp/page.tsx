'use client'
import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useRouter } from 'next/navigation';
import Loader from '@/app/components/loader.tsx';

export default function LoginOTP() {
  const [otp, setOtp] = useState('');
  const [correctOtp, setCorrectOtp] = useState(0);
  const [otpError, setOtpError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const getOtp = () => {
    setCorrectOtp(Math.floor(Math.random() * (9999 - 1001)) + 1000)
  }

  const checkOtp = () => {
    console.log(otp, 'otp--------->')
    if (otp !== correctOtp.toString()) {
      setOtpError('Incorrect PIN')
      return 
    }
    
    setLoading(true)
  
    const timeoutId = setTimeout(() => {
      router.push('/table')
    }, 2000)

    return () => {
      clearTimeout(timeoutId)
    }
  }

  return (
    <main className='h-full flex justify-center align-middle'>
      <div className="flex flex-col justify-center align-middle px-6 py-12 lg:px-8">
        <h2 className="mb-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          OTP authenticator
        </h2>
        {!loading ? (
          correctOtp !== 0 ? (
            <>
            <OtpInput
              value={otp}
              inputType='number'
              onChange={setOtp}
              numInputs={4}
              renderInput={(props) => <input {...props}/>}
              inputStyle={{
                border: "1px solid black",
                borderRadius: "8px",
                marginRight: "8px",
                width: "54px",
                height: "54px",
                fontSize: "12px",
                color: "#000",
                fontWeight: "400",
              }}
            />
            <label className="block pt-1 text-xs font-normal leading-6 text-red-500">{otpError}</label>
            <p>
              {correctOtp}
            </p>
            <div className="mt-10">
              <button
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                onClick={checkOtp}
              >
                Submit
              </button>
            </div>
          </>
        ) : ( 
          <div className="mt-10">
              <button
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                onClick={getOtp}
              >
                Send Pin
              </button>
            </div>
        )
        ) : (
          <Loader />
        )}
      </div>
    </main>
  );
}
