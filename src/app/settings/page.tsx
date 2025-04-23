'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';

// Define the form schema with Zod
const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(6, 'Current password is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Confirm password is required'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'password' | 'notifications'>('profile');
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isProfileSubmitting, setIsProfileSubmitting] = useState(false);
  const [isPasswordSubmitting, setIsPasswordSubmitting] = useState(false);

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
    reset: resetProfile,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onProfileSubmit = async (data: ProfileFormData) => {
    setIsProfileSubmitting(true);
    setProfileSuccess(false);
    setProfileError(null);

    try {
      // In a real app, this would call an API to update the user's profile
      console.log('Updating profile with:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProfileSuccess(true);
    } catch (error) {
      console.error('Error updating profile:', error);
      setProfileError('Failed to update profile. Please try again.');
    } finally {
      setIsProfileSubmitting(false);
    }
  };

  const onPasswordSubmit = async (data: PasswordFormData) => {
    setIsPasswordSubmitting(true);
    setPasswordSuccess(false);
    setPasswordError(null);

    try {
      // In a real app, this would call an API to change the user's password
      console.log('Changing password');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPasswordSuccess(true);
      resetPassword();
    } catch (error) {
      console.error('Error changing password:', error);
      setPasswordError('Failed to change password. Please try again.');
    } finally {
      setIsPasswordSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`${
                activeTab === 'profile'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`${
                activeTab === 'password'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Password
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`${
                activeTab === 'notifications'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Notifications
            </button>
          </nav>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Profile Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Update your personal information.
              </p>
            </div>
            
            {profileSuccess && (
              <div className="rounded-md bg-green-50 p-4 mx-6 mb-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">
                      Profile updated
                    </h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>Your profile information has been updated successfully.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {profileError && (
              <div className="rounded-md bg-red-50 p-4 mx-6 mb-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Error
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{profileError}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <form onSubmit={handleProfileSubmit(onProfileSubmit)}>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="firstName"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        {...registerProfile('firstName')}
                      />
                      {profileErrors.firstName && (
                        <p className="mt-1 text-sm text-red-600">
                          {profileErrors.firstName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="lastName"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        {...registerProfile('lastName')}
                      />
                      {profileErrors.lastName && (
                        <p className="mt-1 text-sm text-red-600">
                          {profileErrors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        id="email"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        {...registerProfile('email')}
                      />
                      {profileErrors.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {profileErrors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone number
                    </label>
                    <div className="mt-1">
                      <input
                        type="tel"
                        id="phone"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        {...registerProfile('phone')}
                      />
                      {profileErrors.phone && (
                        <p className="mt-1 text-sm text-red-600">
                          {profileErrors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  disabled={isProfileSubmitting}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
                >
                  {isProfileSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                      Saving...
                    </>
                  ) : (
                    'Save'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Password Tab */}
        {activeTab === 'password' && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Change Password
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Update your password.
              </p>
            </div>
            
            {passwordSuccess && (
              <div className="rounded-md bg-green-50 p-4 mx-6 mb-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">
                      Password updated
                    </h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>Your password has been updated successfully.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {passwordError && (
              <div className="rounded-md bg-red-50 p-4 mx-6 mb-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Error
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{passwordError}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <form onSubmit={handlePasswordSubmit(onPasswordSubmit)}>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="currentPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Current Password
                    </label>
                    <div className="mt-1">
                      <input
                        type="password"
                        id="currentPassword"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        {...registerPassword('currentPassword')}
                      />
                      {passwordErrors.currentPassword && (
                        <p className="mt-1 text-sm text-red-600">
                          {passwordErrors.currentPassword.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      New Password
                    </label>
                    <div className="mt-1">
                      <input
                        type="password"
                        id="newPassword"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        {...registerPassword('newPassword')}
                      />
                      {passwordErrors.newPassword && (
                        <p className="mt-1 text-sm text-red-600">
                          {passwordErrors.newPassword.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm New Password
                    </label>
                    <div className="mt-1">
                      <input
                        type="password"
                        id="confirmPassword"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        {...registerPassword('confirmPassword')}
                      />
                      {passwordErrors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">
                          {passwordErrors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  disabled={isPasswordSubmitting}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
                >
                  {isPasswordSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                      Saving...
                    </>
                  ) : (
                    'Change Password'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Notification Settings
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Manage your notification preferences.
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <div className="space-y-6">
                <fieldset>
                  <legend className="text-base font-medium text-gray-900">Email Notifications</legend>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="delivery-updates"
                          name="delivery-updates"
                          type="checkbox"
                          defaultChecked
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="delivery-updates" className="font-medium text-gray-700">
                          Delivery Updates
                        </label>
                        <p className="text-gray-500">Get notified when a delivery status changes.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="new-hampers"
                          name="new-hampers"
                          type="checkbox"
                          defaultChecked
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="new-hampers" className="font-medium text-gray-700">
                          New Hampers
                        </label>
                        <p className="text-gray-500">Get notified when new hampers are created.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="recipient-updates"
                          name="recipient-updates"
                          type="checkbox"
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="recipient-updates" className="font-medium text-gray-700">
                          Recipient Updates
                        </label>
                        <p className="text-gray-500">Get notified when recipient information is updated.</p>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="text-base font-medium text-gray-900">SMS Notifications</legend>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="sms-delivery-updates"
                          name="sms-delivery-updates"
                          type="checkbox"
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="sms-delivery-updates" className="font-medium text-gray-700">
                          Delivery Updates
                        </label>
                        <p className="text-gray-500">Get SMS notifications for delivery status changes.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="sms-urgent-notifications"
                          name="sms-urgent-notifications"
                          type="checkbox"
                          defaultChecked
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="sms-urgent-notifications" className="font-medium text-gray-700">
                          Urgent Notifications
                        </label>
                        <p className="text-gray-500">Get SMS notifications for urgent matters.</p>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="button"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
