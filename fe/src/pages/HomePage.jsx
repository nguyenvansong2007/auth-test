"use client";

import Sidebar from "../components/Sidebar/SidebarHome";
import StatsOverview from "../components/Home/StatsOverview";
import Tabs from "../components/Home/Tabs";
import QuickActions from "../components/Home/QuickActions";
import ChartsSection from "../components/Home/ChartsSection";
import Notifications from "../components/Home/Notifications";
import UpcomingEvents from "../components/Home/UpcomingEvents";
import MobileNav from "../components/Navbar/MobileNav";
import RecentActivity from "../components/Home/RecentActivity";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Main content */}
      <div className="flex flex-1">
        <Sidebar />
        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {/* Welcome section */}
            <div className="mb-8">
              <h1 className="text-2xl font-medium text-gray-800 mb-2">
                Welcome
              </h1>
              <p className="text-gray-600">
                Here's what's happening with your projects today.
              </p>
            </div>

            {/* Stats overview */}
            <StatsOverview />

            {/* Tabs */}
            <Tabs />

            {/* Quick actions */}
            <QuickActions />

            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent activity */}
              <RecentActivity />

              {/* Right column */}
              <div className="space-y-6">
                {/* Upcoming events */}

                <UpcomingEvents />

                {/* Notifications */}
                <Notifications />
              </div>
            </div>

            {/* Charts section */}

            <ChartsSection />
          </div>
        </main>
      </div>

      {/* Mobile navigation */}
      <MobileNav />
    </div>
  );
}
