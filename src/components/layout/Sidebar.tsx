import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  UserGroupIcon,
  ArchiveBoxIcon,
  TruckIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';

const Sidebar = () => {
  const { user, signOut, hasRole } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAdmin = hasRole(UserRole.ADMIN);

  // Memoize the navigation array to prevent unnecessary recalculations
  const navigation = useMemo(() => [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Recipients', href: '/recipients', icon: UserGroupIcon },
    { name: 'Hampers', href: '/hampers', icon: ArchiveBoxIcon },
    { name: 'Deliveries', href: '/deliveries', icon: TruckIcon },
    { name: 'Reports', href: '/reports', icon: ChartBarIcon },
    ...(isAdmin ? [{ name: 'Settings', href: '/settings', icon: Cog6ToothIcon }] : []),
  ], [isAdmin]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-0 left-0 z-50 p-4">
        <button
          type="button"
          className="text-gray-500 hover:text-gray-600 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-white text-xl font-bold">Assist Me Now</h1>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      group flex items-center px-2 py-2 text-sm font-medium rounded-md
                      ${isActive
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }
                    `}
                  >
                    <item.icon
                      className={`
                        mr-3 flex-shrink-0 h-6 w-6
                        ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}
                      `}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
            <div className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <div>
                  <div className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-gray-500">
                    <span className="text-sm font-medium text-white">
                      {user?.firstName?.[0] || user?.username?.[0] || 'U'}
                    </span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">
                    {user?.firstName ? `${user.firstName} ${user.lastName || ''}` : user?.username}
                  </p>
                  <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">
                    {user?.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
            <button
              onClick={handleSignOut}
              className="flex items-center text-gray-300 hover:text-white w-full"
            >
              <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={toggleMobileMenu}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={toggleMobileMenu}
              >
                <span className="sr-only">Close sidebar</span>
                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <h1 className="text-white text-xl font-bold">Assist Me Now</h1>
              </div>
              <nav className="mt-5 px-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`
                        group flex items-center px-2 py-2 text-base font-medium rounded-md
                        ${isActive
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }
                      `}
                      onClick={toggleMobileMenu}
                    >
                      <item.icon
                        className={`
                          mr-4 flex-shrink-0 h-6 w-6
                          ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}
                        `}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
              <div className="flex-shrink-0 w-full group block">
                <div className="flex items-center">
                  <div>
                    <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-500">
                      <span className="text-sm font-medium text-white">
                        {user?.firstName?.[0] || user?.username?.[0] || 'U'}
                      </span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-base font-medium text-white">
                      {user?.firstName ? `${user.firstName} ${user.lastName || ''}` : user?.username}
                    </p>
                    <p className="text-sm font-medium text-gray-300 group-hover:text-gray-200">
                      {user?.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
              <button
                onClick={handleSignOut}
                className="flex items-center text-gray-300 hover:text-white w-full"
              >
                <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
          <div className="flex-shrink-0 w-14"></div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
