import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#182128] text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <Image 
              src="/logo.svg" 
              alt="Ocean Watch Logo" 
              width={120} 
              height={30} 
              className="h-8 w-auto" 
            />
            <p className="mt-4 text-sm text-gray-300">
              Protecting our coastal communities through early warning systems and hazard reporting.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/" className="text-base text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/upload" className="text-base text-gray-300 hover:text-white">
                  Report Hazard
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-base text-gray-300 hover:text-white">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="#" className="text-base text-gray-300 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-gray-300 hover:text-white">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-gray-300 hover:text-white">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Government Partners */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Government Partners
            </h3>
            <div className="mt-4 flex space-x-6">
              <div className="bg-white p-2 rounded-md">
                <Image 
                  src="/globe.svg" 
                  alt="Government Logo 1" 
                  width={40} 
                  height={40} 
                  className="h-10 w-10" 
                />
              </div>
              <div className="bg-white p-2 rounded-md">
                <Image 
                  src="/window.svg" 
                  alt="Government Logo 2" 
                  width={40} 
                  height={40} 
                  className="h-10 w-10" 
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Disclaimer and Copyright */}
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-xs text-gray-400 text-center">
            Disclaimer: This platform is for informational purposes only. While we strive to provide accurate and timely information, 
            we cannot guarantee the accuracy or reliability of the data presented. Always follow official government advisories during emergencies.
          </p>
          <p className="mt-4 text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Ocean Watch. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;