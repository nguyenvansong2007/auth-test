import React from "react";

const Header = () => {
  return (
    <div>
      <header className="bg-white border-b border-gray-200 py-2 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <Home className="h-6 w-6 mr-2" />
            <span className="font-semibold text-sm md:text-base">
              AUTODESK Construction Cloud
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <span className="text-xs md:text-sm">
              5 days remaining on your trial - Autodesk Docs
            </span>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-xs md:text-sm rounded">
              View buying options
            </button>
            <div className="bg-gray-100 rounded-full h-8 w-8 flex items-center justify-center">
              <HelpCircle className="h-4 w-4 text-gray-600" />
            </div>
            <div className="bg-red-400 rounded-full h-8 w-8 flex items-center justify-center text-white font-medium">
              SN
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
