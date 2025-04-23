'use client';

import React, { useEffect, useState, useMemo } from 'react';
import {
  UserGroupIcon,
  ArchiveBoxIcon,
  TruckIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { api } from '@/lib/api';
import { DeliveryStatus } from '@/types';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRecipients: 0,
    totalHampers: 0,
    totalDeliveries: 0,
    completedDeliveries: 0,
  });

  const [deliveryData, setDeliveryData] = useState({
    labels: [] as string[],
    data: [] as number[],
  });

  const [statusData, setStatusData] = useState({
    labels: [] as string[],
    data: [] as number[],
  });

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real application, these would be API calls
        // For now, we'll use mock data

        // Mock data for statistics
        setStats({
          totalRecipients: 156,
          totalHampers: 89,
          totalDeliveries: 203,
          completedDeliveries: 178,
        });

        // Mock data for delivery chart
        setDeliveryData({
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          data: [25, 32, 41, 35, 38, 32],
        });

        // Mock data for status chart
        setStatusData({
          labels: [
            DeliveryStatus.PENDING,
            DeliveryStatus.ASSIGNED,
            DeliveryStatus.IN_TRANSIT,
            DeliveryStatus.DELIVERED,
            DeliveryStatus.FAILED,
          ],
          data: [15, 10, 5, 178, 5],
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Chart options and data - memoized to prevent unnecessary recalculations
  const barChartOptions = useMemo(() => ({
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Deliveries',
      },
    },
    // Disable animations for better performance
    animation: false,
  }), []);

  const barChartData = useMemo(() => ({
    labels: deliveryData.labels,
    datasets: [
      {
        label: 'Deliveries',
        data: deliveryData.data,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }), [deliveryData.labels, deliveryData.data]);

  const doughnutChartData = useMemo(() => ({
    labels: statusData.labels,
    datasets: [
      {
        label: 'Delivery Status',
        data: statusData.data,
        backgroundColor: [
          'rgba(255, 159, 64, 0.7)',  // Pending
          'rgba(54, 162, 235, 0.7)',   // Assigned
          'rgba(255, 206, 86, 0.7)',   // In Transit
          'rgba(75, 192, 192, 0.7)',   // Delivered
          'rgba(255, 99, 132, 0.7)',   // Failed
        ],
        borderColor: [
          'rgba(255, 159, 64, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }), [statusData.labels, statusData.data]);

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
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Recipients Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <UserGroupIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Recipients</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{stats.totalRecipients}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Hampers Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <ArchiveBoxIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Hampers</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{stats.totalHampers}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Deliveries Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                  <TruckIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Deliveries</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{stats.totalDeliveries}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Completed Deliveries Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <CheckCircleIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Completed Deliveries</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{stats.completedDeliveries}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Bar Chart */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Delivery Trends</h2>
              <div className="h-64">
                <Bar options={barChartOptions} data={barChartData} />
              </div>
            </div>
          </div>

          {/* Doughnut Chart */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Delivery Status</h2>
              <div className="h-64 flex items-center justify-center">
                <Doughnut data={doughnutChartData} />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-5 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-5">
            <div className="flow-root">
              <ul className="-mb-8">
                {/* Mock activity items */}
                {[
                  { id: 1, content: 'New hamper created: Food Basics', date: '2 hours ago' },
                  { id: 2, content: 'Delivery completed to John Smith', date: '4 hours ago' },
                  { id: 3, content: 'New recipient added: Jane Doe', date: '1 day ago' },
                  { id: 4, content: 'Hamper assigned to delivery #1234', date: '2 days ago' },
                ].map((item, index) => (
                  <li key={item.id}>
                    <div className="relative pb-8">
                      {index !== 3 ? (
                        <span
                          className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex items-start space-x-3">
                        <div className="relative">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center ring-8 ring-white">
                            <span className="text-sm font-medium text-gray-500">{item.id}</span>
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div>
                            <div className="text-sm text-gray-500">
                              <span className="font-medium text-gray-900">{item.content}</span>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">{item.date}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
