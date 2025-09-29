"use client";

import { useGetAllNoticesQuery } from "@/store/api-services/noticeApi";
import React from "react";

const UpdateAlerts: React.FC = () => {
  const { data: allNotices = [], isLoading, isError } = useGetAllNoticesQuery();

  const updateNotices = allNotices.filter(
    (notice: any) => notice.type === "update"
  );
  const dueNotices = allNotices.filter(
    (notice: any) => notice.type === "dueDate"
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );

  if (isError)
    return (
      <div className="text-center py-20 pt-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-xl mx-auto">
          <svg
            className="w-12 h-12 text-red-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-red-600 font-medium">Error loading notices</p>
        </div>
      </div>
    );

  return (
    <section className="w-full py-8 sm:py-12 lg:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Latest <span className="text-blue-700">Updates</span> &{" "}
            <span className="text-blue-700">Deadlines</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Stay informed with important updates and upcoming due dates
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Updates & Alerts Card */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-700 to-blue-800 p-4 sm:p-6">
              <h2 className="flex items-center justify-center lg:justify-start text-lg sm:text-xl font-semibold text-white">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Updates & Alerts
              </h2>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              {updateNotices.length > 0 ? (
                updateNotices.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200 border-l-4 border-blue-700"
                  >
                    <a
                      href={`/notices/${item.slug}`}
                      className="font-semibold text-gray-800 hover:text-blue-700 transition-colors duration-200 block mb-2 line-clamp-2"
                    >
                      {item.title}
                    </a>

                    <div className="flex flex-wrap items-center gap-3 mt-3">
                      {item.publishedDate && (
                        <span className="flex items-center text-xs sm:text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded-full">
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {new Date(item.publishedDate).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                      )}

                      {item.tag && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {item.tag}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <svg
                    className="w-12 h-12 text-gray-300 mx-auto mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="text-gray-500 text-sm">No updates available</p>
                </div>
              )}
            </div>
          </div>

          {/* Due Dates Card */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-100 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 sm:p-6">
              <h2 className="flex items-center justify-center lg:justify-start text-lg sm:text-xl font-semibold text-white">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Due Dates
              </h2>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              {dueNotices.length > 0 ? (
                dueNotices.map((item) => {
                  // ✅ Format publish date
                  const formattedDate = item.publishedDate
                    ? new Date(item.publishedDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : null;

                  return (
                    <div
                      key={item._id}
                      className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200 border-l-4 border-amber-500"
                    >
                      <p className="font-semibold text-gray-800 mb-2 line-clamp-2">
                        {item.title}
                      </p>

                      <div className="flex items-center justify-between mt-3">
                        <span className="flex items-center text-xs sm:text-sm text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full font-medium">
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Due Date
                        </span>

                        {formattedDate && (
                          <span className="text-sm font-semibold text-amber-600 bg-amber-100 px-2 py-1 rounded">
                            {formattedDate}
                          </span>
                        )}
                      </div>

                      {/* ✅ Render HTML safely */}
                      {item.description && (
                        <div
                          className="text-xs text-gray-600 mt-2"
                          dangerouslySetInnerHTML={{
                            __html: item.description
                              // Remove consecutive <br> tags (2+ in a row → 1 <br>)
                              .replace(/(<br\s*\/?>\s*){2,}/gi, "<br>")
                              // Optional: trim leading/trailing <br>
                              .replace(/^(<br\s*\/?>)+|(<br\s*\/?>)+$/gi, ""),
                          }}
                        />
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <svg
                    className="w-12 h-12 text-gray-300 mx-auto mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-gray-500 text-sm">
                    No due dates scheduled
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* View All Button */}
        {(updateNotices.length > 0 || dueNotices.length > 0) && (
          <div className="text-center mt-8 sm:mt-12">
            <a
              href="/notices"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-800 text-white font-semibold rounded-lg hover:from-blue-800 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              View All Notices
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default UpdateAlerts;
