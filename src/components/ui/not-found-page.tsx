import Link from "next/link"

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 transition-all duration-300 hover:shadow-2xl">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-9xl font-bold text-blue-700 opacity-10 absolute -top-8 -left-4">404</div>
          <div className="relative">
            <h1 className="text-7xl md:text-8xl font-black text-blue-700 mb-4 tracking-tight">
              4
              <span className="inline-block animate-bounce">0</span>
              4
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            Page Not Found
          </h3>
          
          <span className="text-gray-600 dark:text-gray-100 text-lg leading-relaxed">
            Oops! The page you're looking for seems to have wandered off into the digital void.
          </span>

          <div className="w-24 h-1 bg-gradient-to-r from-blue-700 to-blue-500 mx-auto rounded-full"></div>

          {/* Home Button */}
          <Link 
            href="/" 
            className="inline-flex items-center justify-center px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
          >
            <span>Return Home</span>
            <svg 
              className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-blue-200 dark:bg-blue-600 rounded-full blur-xl opacity-60"></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-blue-300 dark:bg-blue-500 rounded-full blur-xl opacity-40"></div>
      </div>
    </div>
  )
}