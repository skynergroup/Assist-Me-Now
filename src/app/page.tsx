'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Image
                src="/images/assist-me-now-logo.png"
                alt="Assist Me Now Logo"
                width={150}
                height={60}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex items-center space-x-4">
              <Link href="#about" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                About
              </Link>
              <Link href="#services" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Services
              </Link>
              <Link href="#contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Contact
              </Link>
              <button
                onClick={() => router.push('/auth/login')}
                className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Supporting Communities</span>
                <span className="block text-blue-600">Making a Difference</span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-3xl">
                Assist Me Now is dedicated to providing essential support to communities in need through hamper delivery and crime prevention initiatives.
              </p>
              <div className="mt-8 flex space-x-4">
                <button
                  onClick={() => router.push('/auth/login')}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Get Started
                </button>
                <Link href="#contact" className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-blue-600 opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="/images/assist-me-now-logo.png"
                    alt="Assist Me Now"
                    width={300}
                    height={200}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div id="services" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Services
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              We provide essential services to support communities in need.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
            {/* Hamper Delivery */}
            <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                  </div>
                  <h3 className="ml-4 text-xl font-medium text-gray-900">Hamper Delivery</h3>
                </div>
                <div className="mt-4">
                  <p className="text-base text-gray-600">
                    We prepare and deliver essential food and supply hampers to families and individuals in need. Our hampers are customized to meet specific dietary requirements and household needs.
                  </p>
                </div>
              </div>
            </div>

            {/* Crime Prevention */}
            <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="ml-4 text-xl font-medium text-gray-900">Crime Prevention</h3>
                </div>
                <div className="mt-4">
                  <p className="text-base text-gray-600">
                    Our crime prevention initiatives work with local communities to create safer neighborhoods. We provide education, resources, and support to help prevent crime and build stronger communities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              About Assist Me Now
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our mission is to support and strengthen communities through targeted assistance and prevention programs.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-medium text-gray-900">Our Mission</h3>
                <p className="mt-2 text-base text-gray-600">
                  Assist Me Now is committed to providing essential support to vulnerable communities through hamper delivery and crime prevention initiatives. We believe in creating sustainable solutions that empower individuals and build stronger communities.
                </p>
              </div>

              <div className="text-center md:text-left">
                <h3 className="text-xl font-medium text-gray-900">Our Vision</h3>
                <p className="mt-2 text-base text-gray-600">
                  We envision communities where everyone has access to essential resources and lives in a safe environment. Through our work, we aim to create lasting positive change in the lives of those we serve.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Contact Us
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Get in touch with our team to learn more about our services or how you can get involved.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="flex justify-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Phone</h3>
              <p className="mt-2 text-base text-gray-600">+27 61 524 4668</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="flex justify-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Email</h3>
              <p className="mt-2 text-base text-gray-600">assistmenow@skyner.co.za</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="flex justify-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                  </svg>
                </div>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Website</h3>
              <p className="mt-2 text-base text-gray-600">assistmenow.skyner.co.za</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="flex justify-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Address</h3>
              <p className="mt-2 text-base text-gray-600">664 Jan Shoba Street, Hatfield, Pretoria, 0083</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start">
              <Image
                src="/images/assist-me-now-logo.png"
                alt="Assist Me Now Logo"
                width={150}
                height={60}
                className="object-contain bg-white p-2 rounded"
              />
            </div>
            <div className="mt-8 md:mt-0">
              <p className="text-center text-base text-gray-400">
                &copy; {new Date().getFullYear()} Assist Me Now. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
