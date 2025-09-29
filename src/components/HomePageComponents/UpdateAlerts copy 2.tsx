'use client';

import { useGetAllNoticesQuery } from '@/store/api-services/noticeApi';
import React from 'react';

const UpdateAlerts: React.FC = () => {
  const { data: allNotices = [], isLoading, isError } = useGetAllNoticesQuery();
  
  const updateNotices = allNotices.filter((notice:any) => notice.type === 'update');
  const dueNotices = allNotices.filter((notice:any) => notice.type === 'dueDate');

  if (isLoading) return <div className="text-center py-10">Loading notices...</div>;
  if (isError) return <div className="text-center py-10 text-red-600">Error loading notices</div>;

  return (
    <section className="w-full update-alert gap-5 max-[385px]:mt-40 max-[430px]:mt-10 md:mt-20 grid grid-cols-1 md:grid-cols-2 pt-40 py-20 px-4 md:px-12">
      {/* Updates & Alerts */}
      <div className="bg-blue rounded-lg shadow p-5">
        <h2 className="flex items-center justify-center md:justify-start text-lg font-semibold mb-4">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Updates & Alerts
        </h2>

        {updateNotices.map((item) => (
          <div key={item._id} className="mb-4 light-blue-bg">
            <a href={`/notices/${item.slug}`} className="font-medium hover:underline block">
              {item.title}
            </a>
            {item.publishedDate && (
              <p className="text-sm text-gray-600 mt-1">
                Published on: <span className="font-medium">{item.publishedDate}</span>
              </p>
            )}
            {item.tag && (
              <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded">
                {item.tag}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Due Dates */}
      <div className="bg-blue rounded-lg shadow p-5">
        <h2 className="flex items-center justify-center md:justify-start text-lg font-semibold mb-4">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8 7V3m8 4V3M3 11h18M5 19h14a2 2 0 002-2v-5H3v5a2 2 0 002 2z" />
          </svg>
          Due Dates
        </h2>

        {dueNotices.map((item) => (
          <div key={item._id} className="mb-4 light-blue-bg">
            <p className="font-medium ">{item.title}</p>
            {item.publishedDate && (
              <p className="text-sm">
                Due Date: <span className="font-medium">{item.publishedDate}</span>
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpdateAlerts;
