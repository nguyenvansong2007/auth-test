import React from "react";
import { BarChart2, PieChart, MoreHorizontal } from "lucide-react";

const ChartsSection = () => {
  return (
    <>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-800">
              Project Progress
            </h2>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <BarChart2 className="h-16 w-16 text-gray-300 mx-auto" />
              <p className="mt-2 text-gray-500 text-sm">
                Project progress chart will appear here
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-800">
              Task Distribution
            </h2>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <PieChart className="h-16 w-16 text-gray-300 mx-auto" />
              <p className="mt-2 text-gray-500 text-sm">
                Task distribution chart will appear here
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChartsSection;
