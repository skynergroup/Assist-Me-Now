'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  PlusIcon, 
  MagnifyingGlassIcon, 
  PencilIcon, 
  TrashIcon 
} from '@heroicons/react/24/outline';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { api } from '@/lib/api';
import { Hamper } from '@/types';

const HampersPage: React.FC = () => {
  const router = useRouter();
  const [hampers, setHampers] = useState<Hamper[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch hampers
  useEffect(() => {
    const fetchHampers = async () => {
      try {
        const response = await api.hampers.getAll();
        if (response.success && response.data) {
          setHampers(response.data);
        }
      } catch (error) {
        console.error('Error fetching hampers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHampers();
  }, []);

  // Filter hampers based on search term
  const filteredHampers = hampers.filter(
    (hamper) =>
      hamper.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hamper.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hamper.contents.some(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  // Handle hamper deletion
  const handleDeleteHamper = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this hamper?')) {
      try {
        const response = await api.hampers.delete(id);
        if (response.success) {
          setHampers(hampers.filter((hamper) => hamper.id !== id));
        }
      } catch (error) {
        console.error('Error deleting hamper:', error);
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
          <h1 className="text-2xl font-semibold text-gray-900">Hampers</h1>
          <button
            onClick={() => router.push('/hampers/new')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Hamper
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
              placeholder="Search hampers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Hampers Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredHampers.length > 0 ? (
            filteredHampers.map((hamper) => (
              <div
                key={hamper.id}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {hamper.name}
                    </h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => router.push(`/hampers/${hamper.id}`)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <PencilIcon className="h-5 w-5" />
                        <span className="sr-only">Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteHamper(hamper.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <TrashIcon className="h-5 w-5" />
                        <span className="sr-only">Delete</span>
                      </button>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {hamper.description || 'No description provided'}
                  </p>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900">Contents:</h4>
                    <ul className="mt-2 divide-y divide-gray-200">
                      {hamper.contents.map((item, index) => (
                        <li key={index} className="py-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-900">{item.name}</span>
                            <span className="text-sm text-gray-500">
                              {item.quantity} {item.quantity > 1 ? 'items' : 'item'}
                            </span>
                          </div>
                          {item.category && (
                            <span className="text-xs text-gray-500">
                              Category: {item.category}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <span className="font-medium text-gray-500">
                      Total Items: {hamper.contents.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-white overflow-hidden shadow rounded-lg p-6 text-center">
              <p className="text-gray-500">
                {searchTerm
                  ? 'No hampers found matching your search.'
                  : 'No hampers found. Add your first hamper!'}
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HampersPage;
