import React from "react";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Moderator Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-medium mb-2">Pending Approvals</h3>
          <p className="text-gray-600">No pending approvals</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-medium mb-2">Recent Reports</h3>
          <p className="text-gray-600">No recent reports</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-medium mb-2">User Activity</h3>
          <p className="text-gray-600">No recent activity</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
