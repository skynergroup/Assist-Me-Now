'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { api } from '@/lib/api';
import { Hamper } from '@/types';

// Define the form schema with Zod
const hamperItemSchema = z.object({
  name: z.string().min(1, 'Item name is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  category: z.string().optional(),
});

const hamperSchema = z.object({
  name: z.string().min(1, 'Hamper name is required'),
  description: z.string().optional(),
  contents: z.array(hamperItemSchema).min(1, 'At least one item is required'),
});

type HamperFormData = z.infer<typeof hamperSchema>;

interface HamperDetailPageProps {
  params: {
    id: string;
  };
}

const HamperDetailPage: React.FC<HamperDetailPageProps> = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [hamper, setHamper] = useState<Hamper | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<HamperFormData>({
    resolver: zodResolver(hamperSchema),
    defaultValues: {
      contents: [{ name: '', quantity: 1, category: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'contents',
  });

  // Fetch hamper data
  useEffect(() => {
    const fetchHamper = async () => {
      try {
        const response = await api.hampers.getById(id);
        if (response.success && response.data) {
          setHamper(response.data);
          
          // Set form values
          reset({
            name: response.data.name,
            description: response.data.description || '',
            contents: response.data.contents.map(item => ({
              name: item.name,
              quantity: item.quantity,
              category: item.category || '',
            })),
          });
        } else {
          setError('Failed to load hamper data');
        }
      } catch (err) {
        console.error('Error fetching hamper:', err);
        setError('An error occurred while loading the hamper data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHamper();
  }, [id, reset]);

  const onSubmit = async (data: HamperFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Format the data for the API
      const hamperData = {
        name: data.name,
        description: data.description || undefined,
        contents: data.contents.map(item => ({
          name: item.name,
          quantity: item.quantity,
          category: item.category || undefined,
        })),
      };

      const response = await api.hampers.update(id, hamperData);

      if (response.success) {
        router.push('/hampers');
      } else {
        setError(response.error || 'Failed to update hamper');
      }
    } catch (err) {
      console.error('Error updating hamper:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
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

  if (!hamper && !isLoading) {
    return (
      <DashboardLayout>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
          <h1 className="text-xl font-semibold text-gray-900 mb-4">Hamper Not Found</h1>
          <p className="text-gray-600 mb-4">
            The hamper you are looking for could not be found.
          </p>
          <button
            onClick={() => router.push('/hampers')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back to Hampers
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Edit Hamper</h1>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back
          </button>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Hamper Information */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Hamper Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Edit the basic details for this hamper.
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Hamper Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="name"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      {...register('name')}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description (optional)
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      rows={3}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      {...register('description')}
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hamper Contents */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Hamper Contents
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Edit items included in this hamper.
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              {errors.contents && errors.contents.type === 'min' && (
                <p className="mb-4 text-sm text-red-600">
                  {errors.contents.message}
                </p>
              )}

              {fields.map((field, index) => (
                <div key={field.id} className="mb-6 pb-6 border-b border-gray-200 last:border-0 last:mb-0 last:pb-0">
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor={`contents.${index}.name`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Item Name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id={`contents.${index}.name`}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          {...register(`contents.${index}.name` as const)}
                        />
                        {errors.contents?.[index]?.name && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.contents[index]?.name?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-1">
                      <label
                        htmlFor={`contents.${index}.quantity`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Quantity
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          id={`contents.${index}.quantity`}
                          min="1"
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          {...register(`contents.${index}.quantity` as const, {
                            valueAsNumber: true,
                          })}
                        />
                        {errors.contents?.[index]?.quantity && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.contents[index]?.quantity?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor={`contents.${index}.category`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Category (optional)
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id={`contents.${index}.category`}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          {...register(`contents.${index}.category` as const)}
                        />
                        {errors.contents?.[index]?.category && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.contents[index]?.category?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 flex items-end">
                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <TrashIcon className="h-4 w-4 mr-1" />
                          Remove Item
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => append({ name: '', quantity: 1, category: '' })}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Add Item
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              {isSubmitting ? (
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
                'Update Hamper'
              )}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default HamperDetailPage;
