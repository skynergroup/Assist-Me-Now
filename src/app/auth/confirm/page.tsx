'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';

// Define the form schema with Zod
const confirmSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  code: z.string().min(6, 'Verification code is required'),
});

type ConfirmFormData = z.infer<typeof confirmSchema>;

const ConfirmPage: React.FC = () => {
  const { confirmSignUp } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmSchema),
  });

  // Set the username from the URL query parameter if available
  useEffect(() => {
    const username = searchParams.get('username');
    if (username) {
      setValue('username', username);
    }
  }, [searchParams, setValue]);

  const onSubmit = async (data: ConfirmFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      await confirmSignUp(data.username, data.code);
      setIsConfirmed(true);
    } catch (err) {
      console.error('Confirmation error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'An error occurred during confirmation. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isConfirmed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <div className="flex justify-center">
              <Image
                src="/images/assist-me-now-logo.png"
                alt="Assist Me Now Logo"
                width={200}
                height={150}
                priority
              />
            </div>
            <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
              Account Confirmed
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Your account has been successfully verified.
            </p>
          </div>
          <div className="mt-8 space-y-6">
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    Verification successful
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>
                      Your account has been verified. You can now sign in to access the application.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Link
                href="/auth/login"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#003A5D] hover:bg-[#00304d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003A5D]"
              >
                Go to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <Image
              src="/images/assist-me-now-logo.png"
              alt="Assist Me Now Logo"
              width={200}
              height={150}
              priority
            />
          </div>
          <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
            Verify your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please enter the verification code sent to your email
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                {...register('username')}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="code" className="sr-only">
                Verification Code
              </label>
              <input
                id="code"
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Verification Code"
                {...register('code')}
              />
              {errors.code && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.code.message}
                </p>
              )}
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Verification failed
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#003A5D] hover:bg-[#00304d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003A5D] disabled:bg-[#6a8ea3]"
            >
              {isLoading ? (
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </span>
              ) : null}
              Verify Account
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <Link
            href="/auth/login"
            className="font-medium text-[#003A5D] hover:text-[#00304d]"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPage;
