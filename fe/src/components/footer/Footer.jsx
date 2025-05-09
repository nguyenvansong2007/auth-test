import React from 'react'

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="text-lg font-semibold">BIMCDE</span>
              </div>
              <p className="text-sm text-gray-400 mt-1">Building Information Modeling & Construction Data Exchange</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                About
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Contact
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Terms of Service
              </a>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-4 text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} BIMCDE. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer