'use client';

import { useEffect, useState } from 'react';
import {
  ChartBarIcon,
  UsersIcon,
  EyeIcon,
  PlayIcon,
  HeartIcon,
  ShoppingCartIcon,
  CalendarIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';
import { useAuthStore } from '@/store/authStore';

interface DashboardStats {
  totalUsers: number;
  totalViews: number;
  totalPlays: number;
  totalLikes: number;
  totalPurchases: number;
  upcomingEvents: number;
  activeStreams: number;
  newUsersToday: number;
}

const defaultStats: DashboardStats = {
  totalUsers: 125000,
  totalViews: 2500000,
  totalPlays: 850000,
  totalLikes: 45000,
  totalPurchases: 12500,
  upcomingEvents: 8,
  activeStreams: 0,
  newUsersToday: 245,
};

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState<DashboardStats>(defaultStats);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // TODO: Fetch real stats from API
    // For now, using mock data
    setStats(defaultStats);
  }, []);

  const statCards = [
    {
      name: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: UsersIcon,
      change: '+12%',
      changeType: 'positive' as const,
    },
    {
      name: 'Total Views',
      value: stats.totalViews.toLocaleString(),
      icon: EyeIcon,
      change: '+8%',
      changeType: 'positive' as const,
    },
    {
      name: 'Music Plays',
      value: stats.totalPlays.toLocaleString(),
      icon: PlayIcon,
      change: '+15%',
      changeType: 'positive' as const,
    },
    {
      name: 'Total Likes',
      value: stats.totalLikes.toLocaleString(),
      icon: HeartIcon,
      change: '+23%',
      changeType: 'positive' as const,
    },
    {
      name: 'Purchases',
      value: stats.totalPurchases.toLocaleString(),
      icon: ShoppingCartIcon,
      change: '+5%',
      changeType: 'positive' as const,
    },
    {
      name: 'Upcoming Events',
      value: stats.upcomingEvents.toString(),
      icon: CalendarIcon,
      change: '+2',
      changeType: 'positive' as const,
    },
    {
      name: 'Active Streams',
      value: stats.activeStreams.toString(),
      icon: VideoCameraIcon,
      change: '0',
      changeType: 'neutral' as const,
    },
    {
      name: 'New Users Today',
      value: stats.newUsersToday.toString(),
      icon: UsersIcon,
      change: '+18%',
      changeType: 'positive' as const,
    },
  ];

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
            Welcome back, {user?.profile?.name}
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Here's what's happening with your fan app today.
          </p>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
          >
            <VideoCameraIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Go Live
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mt-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => (
            <div
              key={stat.name}
              className="relative overflow-hidden rounded-lg bg-gray-800 px-4 py-5 shadow sm:px-6 sm:py-6"
            >
              <dt>
                <div className="absolute rounded-md bg-purple-500 p-3">
                  <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-400">{stat.name}</p>
              </dt>
              <dd className="ml-16 flex items-baseline">
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
                <p
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    stat.changeType === 'positive'
                      ? 'text-green-400'
                      : stat.changeType === 'negative'
                      ? 'text-red-400'
                      : 'text-gray-400'
                  }`}
                >
                  {stat.change}
                </p>
              </dd>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-white">Quick Actions</h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-gray-800 p-6">
            <h4 className="text-base font-medium text-white">Hero Slides</h4>
            <p className="mt-1 text-sm text-gray-400">Manage homepage carousel</p>
            <div className="mt-4">
              <a
                href="/admin/slides"
                className="inline-flex items-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
              >
                Manage Slides
              </a>
            </div>
          </div>

          <div className="rounded-lg bg-gray-800 p-6">
            <h4 className="text-base font-medium text-white">Events</h4>
            <p className="mt-1 text-sm text-gray-400">Add upcoming shows and releases</p>
            <div className="mt-4">
              <a
                href="/admin/events"
                className="inline-flex items-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
              >
                Manage Events
              </a>
            </div>
          </div>

          <div className="rounded-lg bg-gray-800 p-6">
            <h4 className="text-base font-medium text-white">Music Library</h4>
            <p className="mt-1 text-sm text-gray-400">Upload new tracks and albums</p>
            <div className="mt-4">
              <a
                href="/admin/music"
                className="inline-flex items-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
              >
                Manage Music
              </a>
            </div>
          </div>

          <div className="rounded-lg bg-gray-800 p-6">
            <h4 className="text-base font-medium text-white">Merchandise</h4>
            <p className="mt-1 text-sm text-gray-400">Add new products and manage inventory</p>
            <div className="mt-4">
              <a
                href="/admin/merch"
                className="inline-flex items-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
              >
                Manage Merch
              </a>
            </div>
          </div>

          <div className="rounded-lg bg-gray-800 p-6">
            <h4 className="text-base font-medium text-white">Live Streams</h4>
            <p className="mt-1 text-sm text-gray-400">Schedule and manage live streams</p>
            <div className="mt-4">
              <a
                href="/admin/streams"
                className="inline-flex items-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
              >
                Manage Streams
              </a>
            </div>
          </div>

          <div className="rounded-lg bg-gray-800 p-6">
            <h4 className="text-base font-medium text-white">Analytics</h4>
            <p className="mt-1 text-sm text-gray-400">View detailed performance metrics</p>
            <div className="mt-4">
              <a
                href="/admin/analytics"
                className="inline-flex items-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
              >
                View Analytics
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-white">Recent Activity</h3>
        <div className="mt-4 overflow-hidden rounded-lg bg-gray-800">
          <ul className="divide-y divide-gray-700">
            <li className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                      <PlayIcon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-white">New song "Dreaming" uploaded</p>
                    <p className="text-xs text-gray-400">2 hours ago</p>
                  </div>
                </div>
              </div>
            </li>
            <li className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                      <CalendarIcon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-white">Atlanta concert added</p>
                    <p className="text-xs text-gray-400">5 hours ago</p>
                  </div>
                </div>
              </div>
            </li>
            <li className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center">
                      <ShoppingCartIcon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-white">New merch collection launched</p>
                    <p className="text-xs text-gray-400">1 day ago</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
