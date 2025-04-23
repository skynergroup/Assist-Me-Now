'use client';

import React, { useState, useEffect } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { api } from '@/lib/api';
import { DeliveryReport, RecipientReport, HamperReport } from '@/types';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const ReportsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deliveryReport, setDeliveryReport] = useState<DeliveryReport | null>(null);
  const [recipientReport, setRecipientReport] = useState<RecipientReport | null>(null);
  const [hamperReport, setHamperReport] = useState<HamperReport | null>(null);

  // Fetch reports
  useEffect(() => {
    const fetchReports = async () => {
      try {
        // Fetch delivery report
        const deliveryResponse = await api.reports.getDeliveryReport();
        if (deliveryResponse.success && deliveryResponse.data) {
          setDeliveryReport(deliveryResponse.data);
        }

        // Fetch recipient report
        const recipientResponse = await api.reports.getRecipientReport();
        if (recipientResponse.success && recipientResponse.data) {
          setRecipientReport(recipientResponse.data);
        }

        // Fetch hamper report
        const hamperResponse = await api.reports.getHamperReport();
        if (hamperResponse.success && hamperResponse.data) {
          setHamperReport(hamperResponse.data);
        }
      } catch (err) {
        console.error('Error fetching reports:', err);
        setError('Failed to load reports');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Prepare chart data
  const prepareDeliveryStatusChart = () => {
    if (!deliveryReport) return null;

    return {
      labels: ['Delivered', 'Pending', 'Failed', 'Other'],
      datasets: [
        {
          label: 'Delivery Status',
          data: [
            deliveryReport.deliveredCount,
            deliveryReport.pendingCount,
            deliveryReport.failedCount,
            deliveryReport.totalDeliveries - deliveryReport.deliveredCount - deliveryReport.pendingCount - deliveryReport.failedCount,
          ],
          backgroundColor: [
            'rgba(75, 192, 192, 0.7)',
            'rgba(255, 159, 64, 0.7)',
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const prepareDeliveryTimelineChart = () => {
    if (!deliveryReport) return null;

    const dates = Object.keys(deliveryReport.deliveriesByDate).sort();
    const counts = dates.map(date => deliveryReport.deliveriesByDate[date]);

    return {
      labels: dates,
      datasets: [
        {
          label: 'Deliveries by Date',
          data: counts,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          tension: 0.1,
        },
      ],
    };
  };

  const prepareRecipientsByLocationChart = () => {
    if (!recipientReport) return null;

    const cities = Object.keys(recipientReport.recipientsByCity);
    const counts = cities.map(city => recipientReport.recipientsByCity[city]);

    return {
      labels: cities,
      datasets: [
        {
          label: 'Recipients by City',
          data: counts,
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const prepareHampersByCategoryChart = () => {
    if (!hamperReport) return null;

    const categories = Object.keys(hamperReport.hampersByCategory);
    const counts = categories.map(category => hamperReport.hampersByCategory[category]);

    return {
      labels: categories,
      datasets: [
        {
          label: 'Hampers by Category',
          data: counts,
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  // Chart options
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Deliveries by Date',
      },
    },
  };

  const doughnutChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
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

  if (error) {
    return (
      <DashboardLayout>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
          <h1 className="text-xl font-semibold text-gray-900 mb-4">Error Loading Reports</h1>
          <p className="text-gray-600 mb-4">{error}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Reports & Analytics</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Total Deliveries Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Deliveries</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{deliveryReport?.totalDeliveries || 0}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Total Recipients Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Recipients</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{recipientReport?.totalRecipients || 0}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Total Hampers Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Hampers</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{hamperReport?.totalHampers || 0}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Delivery Status Chart */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Delivery Status</h2>
              <div className="h-64 flex items-center justify-center">
                {deliveryReport ? (
                  <Doughnut data={prepareDeliveryStatusChart()!} options={doughnutChartOptions} />
                ) : (
                  <p className="text-gray-500">No delivery data available</p>
                )}
              </div>
            </div>
          </div>

          {/* Deliveries by Date Chart */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Deliveries by Date</h2>
              <div className="h-64">
                {deliveryReport && Object.keys(deliveryReport.deliveriesByDate).length > 0 ? (
                  <Line data={prepareDeliveryTimelineChart()!} options={barChartOptions} />
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-gray-500">No timeline data available</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recipients by Location Chart */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Recipients by Location</h2>
              <div className="h-64 flex items-center justify-center">
                {recipientReport && Object.keys(recipientReport.recipientsByCity).length > 0 ? (
                  <Bar 
                    data={prepareRecipientsByLocationChart()!} 
                    options={{
                      ...barChartOptions,
                      plugins: {
                        ...barChartOptions.plugins,
                        title: {
                          display: true,
                          text: 'Recipients by City',
                        },
                      },
                    }} 
                  />
                ) : (
                  <p className="text-gray-500">No recipient location data available</p>
                )}
              </div>
            </div>
          </div>

          {/* Hampers by Category Chart */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Hampers by Category</h2>
              <div className="h-64 flex items-center justify-center">
                {hamperReport && Object.keys(hamperReport.hampersByCategory).length > 0 ? (
                  <Doughnut 
                    data={prepareHampersByCategoryChart()!} 
                    options={doughnutChartOptions} 
                  />
                ) : (
                  <p className="text-gray-500">No hamper category data available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReportsPage;
