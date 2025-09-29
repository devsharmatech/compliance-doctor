
interface Props {
    title?: string
    message?: string
  }
  
  export const ErrorPage = ({ title = "Something went wrong", message = "Please try again later." }: Props) => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
        <h1 className="text-3xl font-bold text-red-600 mb-4">{title}</h1>
        <p className="mb-6 text-gray-500 dark:text-gray-400">{message}</p>
      </div>
    )
  }
  