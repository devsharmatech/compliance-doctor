
import Link from "next/link"

export const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="text-3xl font-bold mb-4">401 - Unauthorized</h1>
      <p className="mb-6 text-gray-500 dark:text-gray-400">
        {"You don't have permission to access this page."}
      </p>
      <Link href="/" className="text-blue-600 hover:underline">
        Go back home
      </Link>
    </div>
  )
}
