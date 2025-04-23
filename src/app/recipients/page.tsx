'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  UserPlusIcon, 
  MagnifyingGlassIcon, 
  PencilIcon, 
  TrashIcon 
} from '@heroicons/react/24/outline';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { api } from '@/lib/api';
import { Recipient } from '@/types';

const RecipientsPage: React.FC = () => {
  const router = useRouter();
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch recipients
  useEffect(() => {
    const fetchRecipients = async () => {
      try {
        const response = await api.recipients.getAll();
        if (response.success && response.data) {
          setRecipients(response.data);
        }
      } catch (error) {
        console.error('Error fetching recipients:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipients();
  }, []);

  // Filter recipients based on search term
  const filteredRecipients = recipients.filter(
    (recipient) =>
      recipient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipient.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipient.phone?.includes(searchTerm) ||
      recipient.address.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle recipient deletion
  const handleDeleteRecipient = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this recipient?')) {
      try {
        const response = await api.recipients.delete(id);
        if (response.success) {
          setRecipients(recipients.filter((recipient) => recipient.id !== id));
        }
      } catch (error) {
        console.error('Error deleting recipient:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Recipients</h1>
          <button
            onClick={() => router.push('/recipients/new')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <UserPlusIcon className="h-5 w-5 mr-2" />
            Add Recipient
          </button>
        </div>

        {/* Search */}
        <div className="max-w-lg">
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="Search recipients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Recipients Table */}
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Contact
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Address
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Notes
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredRecipients.length > 0 ? (
                      filteredRecipients.map((recipient) => (
                        <tr key={recipient.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                {recipient.photoUrl ? (
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src={recipient.photoUrl}
                                    alt={`${recipient.firstName} ${recipient.lastName}`}
                                  />
                                ) : (
                                  <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                    <span className="text-gray-600 font-medium">
                                      {recipient.firstName[0]}
                                      {recipient.lastName[0]}
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {recipient.firstName} {recipient.lastName}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {recipient.email}
                            </div>
                            <div className="text-sm text-gray-500">
                              {recipient.phone}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {recipient.address.street}
                            </div>
                            <div className="text-sm text-gray-500">
                              {recipient.address.city}, {recipient.address.postalCode}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 truncate max-w-xs">
                              {recipient.notes || 'No notes'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => router.push(`/recipients/${recipient.id}`)}
                              className="text-blue-600 hover:text-blue-900 mr-4"
                            >
                              <PencilIcon className="h-5 w-5" />
                              <span className="sr-only">Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteRecipient(recipient.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <TrashIcon className="h-5 w-5" />
                              <span className="sr-only">Delete</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                          {searchTerm
                            ? 'No recipients found matching your search.'
                            : 'No recipients found. Add your first recipient!'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RecipientsPage;
