import React from 'react';
import { Plus, Search } from 'lucide-react';

export function Projects() {
  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Projects</h1>
          <p className="mt-2 text-sm text-gray-700">
            Track and manage your ongoing projects.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            New Project
          </button>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
          <div className="max-w-lg w-full lg:max-w-xs">
            <label htmlFor="search" className="sr-only">
              Search projects
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="search"
                name="search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search projects"
                type="search"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Project Card */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Website Redesign
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>Complete overhaul of client's e-commerce website</p>
            </div>
            <div className="mt-3 text-sm">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                In Progress
              </span>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Due Date</span>
                <span className="font-medium">Mar 31, 2025</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-gray-500">Client</span>
                <span className="font-medium">Acme Inc</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-blue-600 rounded-full"
                  style={{ width: '45%' }}
                ></div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6 rounded-b-lg">
            <div className="text-sm">
              <button className="font-medium text-blue-600 hover:text-blue-500">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}