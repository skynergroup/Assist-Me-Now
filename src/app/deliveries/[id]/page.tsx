'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { api } from '@/lib/api';
import { Delivery, DeliveryStatus, Hamper, Recipient } from '@/types';

// Define the form schema with Zod
const deliverySchema = z.object({
  hamperId: z.string().min(1, 'Hamper is required'),
  recipientId: z.string().min(1, 'Recipient is required'),
  status: z.nativeEnum(DeliveryStatus),
  scheduledDate: z.string().optional(),
  deliveryDate: z.string().optional(),
  notes: z.string().optional(),
});

type DeliveryFormData = z.infer<typeof deliverySchema>;

interface DeliveryDetailPageProps {
  params: {
    id: string;
  };
}

const DeliveryDetailPage: React.FC<DeliveryDetailPageProps> = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [delivery, setDelivery] = useState<Delivery | null>(null);
  const [hampers, setHampers] = useState<Hamper[]>([]);
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DeliveryFormData>({
    resolver: zodResolver(deliverySchema),
  });

  // Fetch delivery, hampers, and recipients
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch delivery
        const deliveryResponse = await api.deliveries.getById(id);
        if (deliveryResponse.success && deliveryResponse.data) {
          setDelivery(deliveryResponse.data);
        }

        // Fetch hampers
        const hampersResponse = await api.hampers.getAll();
        if (hampersResponse.success && hampersResponse.data) {
          setHampers(hampersResponse.data);
        }

        // Fetch recipients
        const recipientsResponse = await api.recipients.getAll();
        if (recipientsResponse.success && recipientsResponse.data) {
          setRecipients(recipientsResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load delivery data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Set form values when delivery data is loaded
  useEffect(() => {
    if (delivery) {
      reset({
        hamperId: delivery.hamperId,
        recipientId: delivery.recipientId,
        status: delivery.status,
        scheduledDate: delivery.scheduledDate ? new Date(delivery.scheduledDate).toISOString().slice(0, 16) : '',
        deliveryDate: delivery.deliveryDate ? new Date(delivery.deliveryDate).toISOString().slice(0, 16) : '',
        notes: delivery.notes || '',
      });
    }
  }, [delivery, reset]);

  const onSubmit = async (data: DeliveryFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Format the data for the API
      const deliveryData = {
        hamperId: data.hamperId,
        recipientId: data.recipientId,
        status: data.status,
        scheduledDate: data.scheduledDate || undefined,
        deliveryDate: data.deliveryDate || undefined,
        notes: data.notes || undefined,
      };

      const response = await api.deliveries.update(id, deliveryData);

      if (response.success) {
        router.push('/deliveries');
      } else {
        setError(response.error || 'Failed to update delivery');
      }
    } catch (err) {
      console.error('Error updating delivery:', err);
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

  if (!delivery && !isLoading) {
    return (
      <DashboardLayout>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
          <h1 className="text-xl font-semibold text-gray-900 mb-4">Delivery Not Found</h1>
          <p className="text-gray-600 mb-4">
            The delivery you are looking for could not be found.
          </p>
          <button
            onClick={() => router.push('/deliveries')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back to Deliveries
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Edit Delivery</h1>
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
          {/* Delivery Information */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Delivery Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Edit the details for this delivery.
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="hamperId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Hamper
                  </label>
                  <div className="mt-1">
                    <select
                      id="hamperId"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      {...register('hamperId')}
                    >
                      <option value="">Select a hamper</option>
                      {hampers.map((hamper) => (
                        <option key={hamper.id} value={hamper.id}>
                          {hamper.name}
                        </option>
                      ))}
                    </select>
                    {errors.hamperId && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.hamperId.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="recipientId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Recipient
                  </label>
                  <div className="mt-1">
                    <select
                      id="recipientId"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      {...register('recipientId')}
                    >
                      <option value="">Select a recipient</option>
                      {recipients.map((recipient) => (
                        <option key={recipient.id} value={recipient.id}>
                          {recipient.firstName} {recipient.lastName}
                        </option>
                      ))}
                    </select>
                    {errors.recipientId && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.recipientId.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Status
                  </label>
                  <div className="mt-1">
                    <select
                      id="status"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      {...register('status')}
                    >
                      <option value={DeliveryStatus.PENDING}>Pending</option>
                      <option value={DeliveryStatus.ASSIGNED}>Assigned</option>
                      <option value={DeliveryStatus.IN_TRANSIT}>In Transit</option>
                      <option value={DeliveryStatus.DELIVERED}>Delivered</option>
                      <option value={DeliveryStatus.FAILED}>Failed</option>
                      <option value={DeliveryStatus.CANCELLED}>Cancelled</option>
                    </select>
                    {errors.status && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.status.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="scheduledDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Scheduled Date (optional)
                  </label>
                  <div className="mt-1">
                    <input
                      type="datetime-local"
                      id="scheduledDate"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      {...register('scheduledDate')}
                    />
                    {errors.scheduledDate && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.scheduledDate.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="deliveryDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Delivery Date (optional)
                  </label>
                  <div className="mt-1">
                    <input
                      type="datetime-local"
                      id="deliveryDate"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      {...register('deliveryDate')}
                    />
                    {errors.deliveryDate && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.deliveryDate.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="notes"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Notes (optional)
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="notes"
                      rows={3}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      {...register('notes')}
                    />
                    {errors.notes && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.notes.message}
                      </p>
                    )}
                  </div>
                </div>
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
                'Update Delivery'
              )}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default DeliveryDetailPage;
