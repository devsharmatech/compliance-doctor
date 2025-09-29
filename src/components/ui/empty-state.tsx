

interface Props {
    message?: string
  }
  
  export const EmptyState = ({ message = "No data found." }: Props) => {
    return (
      <div className="flex justify-center items-center h-40 text-gray-400 dark:text-gray-500 text-sm italic">
        {message}
      </div>
    )
  }
  