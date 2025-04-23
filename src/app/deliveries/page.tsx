'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  PlusIcon, 
  MagnifyingGlassIcon, 
  PencilIcon, 
  TrashIcon,
  CheckCircleIcon,
  ClockIcon,
  TruckIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { api } from '@/lib/api';
import { Delivery, DeliveryStatus, Hamper, Recipient } from '@/types';

const DeliveriesPage: React.FC = () => {
  const router = useRouter();
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [hampers, setHampers] = useState<Record<string, Hamper>>({});
  const [recipients, setRecipients] = useState<Record<string, Recipient>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<DeliveryStatus | 'ALL'>('ALL');

  // Fetch deliveries, hampers, and recipients
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch deliveries
        const deliveriesResponse = await api.deliveries.getAll();
        if (deliveriesResponse.success && deliveriesResponse.data) {
          setDeliveries(deliveriesResponse.data);
        }

        // Fetch hampers
        const hampersResponse = await api.hampers.getAll();
        if (hampersResponse.success && hampersResponse.data) {
          const hamperMap: Record<string, Hamper> = {};
          hampersResponse.data.forEach((hamper: Hamper) => {
            hamperMap[hamper.id] = hamper;
          });
          setHampers(hamperMap);
        }

        // Fetch recipients
        const recipientsResponse = await api.recipients.getAll();
        if (recipientsResponse.success && recipientsResponse.data) {
          const recipientMap: Record<string, Recipient> = {};
          recipientsResponse.data.forEach((recipient: Recipient) => {
            recipientMap[recipient.id] = recipient;
          });
          setRecipients(recipientMap);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter deliveries based on search term and status filter
  const filteredDeliveries = deliveries.filter((delivery) => {
    const hamper = hampers[delivery.hamperId];
    const recipient = recipients[delivery.recipientId];
    
    // Filter by status
    if (statusFilter !== 'ALL' && delivery.status !== statusFilter) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        hamper?.name.toLowerCase().includes(searchLower) ||
        recipient?.firstName.toLowerCase().includes(searchLower) ||
        recipient?.lastName.toLowerCase().includes(searchLower) ||
        recipient?.address.city.toLowerCase().includes(searchLower) ||
        delivery.status.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  // Handle delivery deletion
  const handleDeleteDelivery = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this delivery?')) {
      try {
        const response = await api.deliveries.delete(id);
        if (response.success) {
          setDeliveries(deliveries.filter((delivery) => delivery.id !== id));
        }
      } catch (error) {
        console.error('Error deleting delivery:', error);
      }
    }
  };

  // Get status badge
  const getStatusBadge = (status: DeliveryStatus) => {
    switch (status) {
      case DeliveryStatus.PENDING:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <ClockIcon className="h-4 w-4 mr-1" />
            Pending
          </span>
        );
      case DeliveryStatus.ASSIGNED:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <CheckCircleIcon className="h-4 w-4 mr-1" />
            Assigned
          </span>
        );
      case DeliveryStatus.IN_TRANSIT:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            <TruckIcon className="h-4 w-4 mr-1" />
            In Transit
          </span>
        );
      case DeliveryStatus.DELIVERED:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircleIcon className="h-4 w-4 mr-1" />
            Delivered
          </span>
        );
      case DeliveryStatus.FAILED:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircleIcon className="h-4 w-4 mr-1" />
            Failed
          </span>
        );
      case DeliveryStatus.CANCELLED:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <XCircleIcon className="h-4 w-4 mr-1" />
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Unknown
          </span>
        );
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
          <h1 className="text-2xl font-semibold text-gray-900">Deliveries</h1>
          <button
            onClick={() => router.push('/deliveries/new')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Delivery
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Search */}
          <div className="max-w-lg">
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search deliveries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <label htmlFor="status-filter" className="text-sm font-medium text-gray-700">
              Status:
            </label>
            <select
              id="status-filter"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as DeliveryStatus | 'ALL')}
            >
              <option value="ALL">All Statuses</option>
              <option value={DeliveryStatus.PENDING}>Pending</option>
              <option value={DeliveryStatus.ASSIGNED}>Assigned</option>
              <option value={DeliveryStatus.IN_TRANSIT}>In Transit</option>
              <option value={DeliveryStatus.DELIVERED}>Delivered</option>
              <option value={DeliveryStatus.FAILED}>Failed</option>
              <option value={DeliveryStatus.CANCELLED}>Cancelled</option>
            </select>
          </div>
        </div>

        {/* Deliveries Table */}
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
                        Hamper
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Recipient
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Scheduled Date
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
                    {filteredDeliveries.length > 0 ? (
                      filteredDeliveries.map((delivery) => {
                        const hamper = hampers[delivery.hamperId];
                        const recipient = recipients[delivery.recipientId];
                        
                        return (
                          <tr key={delivery.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {hamper?.name || 'Unknown Hamper'}
                              </div>
                              <div className="text-sm text-gray-500">
                                {hamper?.contents.length || 0} items
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {recipient ? `${recipient.firstName} ${recipient.lastName}` : 'Unknown Recipient'}
                              </div>
                              <div className="text-sm text-gray-500">
                                {recipient?.address.city || ''}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {getStatusBadge(delivery.status)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {delivery.scheduledDate
                                  ? new Date(delivery.scheduledDate).toLocaleDateString()
                                  : 'Not scheduled'}
                              </div>
                              {delivery.deliveryDate && (
                                <div className="text-sm text-gray-500">
                                  Delivered: {new Date(delivery.deliveryDate).toLocaleDateString()}
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900 truncate max-w-xs">
                                {delivery.notes || 'No notes'}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => router.push(`/deliveries/${delivery.id}`)}
                                className="text-blue-600 hover:text-blue-900 mr-4"
                              >
                                <PencilIcon className="h-5 w-5" />
                                <span className="sr-only">Edit</span>
                              </button>
                              <button
                                onClick={() => handleDeleteDelivery(delivery.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <TrashIcon className="h-5 w-5" />
                                <span className="sr-only">Delete</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                          {searchTerm || statusFilter !== 'ALL'
                            ? 'No deliveries found matching your search or filter.'
                            : 'No deliveries found. Add your first delivery!'}
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

export default DeliveriesPage;
