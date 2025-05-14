import React from "react";

const Reports = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Content Reports</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          New Report
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-600">No reports found</p>
      </div>
    </div>
  );
};

export default Reports;
