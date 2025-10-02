import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import Guest from "../../components/Guest";
import AddNewRecord from "../../components/AddNewRecord";
import RecordChart from "../../components/RecordChart";
import ExpenseStats from "../../components/ExpenseStats";
import AIInsights from "../../components/AIInsights";
import RecordHistory from "../../components/RecordHistory";
//this is the homepage, will be used for the landing page
//async bc itll be in server side
export default async function HomePage() {
  const user = await currentUser();
  if (!user) {
    return <Guest />; //guest view
  }

  return (
    <main className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans min-h-screen transition-colors duration-300">
      {/* Mobile-optimized container with responsive padding */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Mobile-first responsive grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Left Column - Stacked on mobile */}
          <div className="space-y-4 sm:space-y-6">
            {/* Welcome section with improved mobile layout */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-700/50 hover:shadow-2xl flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
              {/* User Image - responsive sizing */}
              <div className="relative flex-shrink-0">
                <img
                  src={user.imageUrl}
                  alt={`${user.firstName}&#39;s profile`}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-white dark:border-gray-600 shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-sky-400 to-sky-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>

              {/* User Details - responsive text and layout */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-2 sm:gap-3 mb-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm sm:text-lg">👋</span>
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Welcome Back, {user.firstName}!
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 max-w-md mx-auto sm:mx-0">
                  Here&#39;s a quick overview of your recent expense activity.
                  Track your spending, analyze patterns, and manage your budget
                  efficiently!
                </p>
                {/* Mobile-optimized badge grid */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center sm:justify-start">
                  <div className="bg-gradient-to-r from-blue-50 to-sky-50 dark:from-blue-900/30 dark:to-sky-900/30 border border-blue-100 dark:border-blue-800 px-3 py-2 rounded-xl flex items-center gap-2 justify-center sm:justify-start">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-blue-500 to-sky-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">📅</span>
                    </div>
                    <div className="text-center sm:text-left">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 block">
                        Joined
                      </span>
                      <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/30 dark:to-blue-900/30 border border-sky-100 dark:border-sky-800 px-3 py-2 rounded-xl flex items-center gap-2 justify-center sm:justify-start">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-sky-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">⚡</span>
                    </div>
                    <div className="text-center sm:text-left">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 block">
                        Last Active
                      </span>
                      <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        {user.lastActiveAt
                          ? new Date(user.lastActiveAt).toLocaleDateString()
                          : "Today"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Add New Expense */}
            <AddNewRecord/>
          </div>

          {/* Right Column - Stacked below on mobile */}
          <div className="space-y-4 sm:space-y-6">
            {/* Expense Analytics */}
            <RecordChart/>
            <ExpenseStats/>
          </div>
        </div>

        {/* Full-width sections below - mobile-friendly spacing */}
        <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
          <AIInsights/>
          <RecordHistory/>
        </div>
      </div>
    </main>
  );
}
