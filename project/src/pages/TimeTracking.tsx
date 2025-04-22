import React, { useState } from 'react';
import { Play, Pause, Clock } from 'lucide-react';

export function TimeTracking() {
  const [isTracking, setIsTracking] = useState(false);

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Time Tracking</h1>
          <p className="mt-2 text-sm text-gray-700">
            Track time spent on your projects and tasks.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <label
                htmlFor="project"
                className="block text-sm font-medium text-gray-700"
              >
                Project
              </label>
              <select
                id="project"
                name="project"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option>Website Redesign</option>
                <option>Mobile App Development</option>
                <option>Brand Identity Design</option>
              </select>
            </div>
            <div className="ml-4">
              <label
                htmlFor="task"
                className="block text-sm font-medium text-gray-700"
              >
                Task
              </label>
              <select
                id="task"
                name="task"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option>Frontend Development</option>
                <option>Backend API</option>
                <option>UI Design</option>
              </select>
            </div>
            <div className="ml-4 flex items-end">
              <button
                onClick={() => setIsTracking(!isTracking)}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                  isTracking
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-green-600 hover:bg-green-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                {isTracking ? (
                  <>
                    <Pause className="-ml-1 mr-2 h-5 w-5" />
                    Stop
                  </>
                ) : (
                  <>
                    <Play className="-ml-1 mr-2 h-5 w-5" />
                    Start
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">Recent Time Entries</h2>
        <div className="mt-4 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Project
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Task
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Start Time
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Duration
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        Website Redesign
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        Frontend Development
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        Today 9:00 AM
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        2h 30m
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}